import { Editor } from '@hugerte/hugerte-react';
import { useRef, useState, useEffect } from 'react';

// util sederhana untuk id unik
const uid = () => Math.random().toString(36).slice(2, 10);

const HugeRte = ({ content, setContent, docId }) => {
  const editorRef = useRef(null);
  const [annotations, setAnnotations] = useState([]); // {id, text, createdAt}

  // Ambil anotasi dari content saat pertama kali mount / berubah drastis
  useEffect(() => {
    if (!content) return;
    const div = document.createElement('div');
    div.innerHTML = content;
    const nodes = div.querySelectorAll('span[data-anno-id][data-anno-text]');
    const parsed = Array.from(nodes).map(n => ({
      id: n.getAttribute('data-anno-id'),
      text: decodeURIComponent(n.getAttribute('data-anno-text') || ''),
      createdAt: n.getAttribute('data-anno-at') || new Date().toISOString(),
    }));
    // unik by id
    const uniq = Object.values(parsed.reduce((acc, a) => {
      acc[a.id] = a;
      return acc;
    }, {}));
    setAnnotations(uniq);
  }, [content]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const addAnnotation = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const selHtml = editor.selection.getContent({ format: 'html' });
    const selText = editor.selection.getContent({ format: 'text' });
    if (!selText.trim()) {
      alert('Pilih teks yang ingin dianotasi dulu.');
      return;
    }

    const note = window.prompt('Tulis catatan anotasi:');
    if (!note?.trim()) return;

    const id = uid();
    const createdAt = new Date().toISOString();

    const wrapped = `
      <span class="anno" 
        data-anno-id="${id}" 
        data-anno-text="${encodeURIComponent(note)}" 
        data-anno-at="${createdAt}">
        ${selHtml || selText}
      </span>
    `;

    editor.undoManager.transact(() => {
      editor.selection.setContent(wrapped, { format: 'html' });
    });

    setAnnotations(prev => [...prev, { id, text: note, createdAt }]);
    setContent(editor.getContent());
  };

  const removeAnnotation = (id) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.undoManager.transact(() => {
      const body = editor.getBody();
      const targets = body.querySelectorAll(`span[data-anno-id="${id}"]`);
      targets.forEach(node => {
        const frag = editor.getDoc().createDocumentFragment();
        while (node.firstChild) frag.appendChild(node.firstChild);
        node.replaceWith(frag);
      });
    });

    setAnnotations(prev => prev.filter(a => a.id !== id));
    setContent(editor.getContent());
  };

  const scrollToAnnotation = (id) => {
    const editor = editorRef.current;
    if (!editor) return;
    const node = editor.getBody().querySelector(`span[data-anno-id="${id}"]`);
    if (node) {
      editor.selection.scrollIntoView(node, true);
      editor.selection.select(node);
    }
  };

  const saveToDB = async () => {
    const payload = {
      docId,
      contentHtml: content,
      annotations,
    };

    try {
      const res = await fetch('/api/docs/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      alert('Tersimpan!');
    } catch (err) {
      alert('Gagal menyimpan: ' + err.message);
    }
  };

  return (
    <div>
    {/* // <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}> */}
      <div>
        {/* <div style={{ marginBottom: 8, display: 'flex', gap: 8 }}>
          <button onClick={addAnnotation}>+ Anotasi</button>
          <button onClick={saveToDB}>💾 Simpan ke DB</button>
        </div> */}

        <Editor
          onInit={(_, editor) => (editorRef.current = editor)}
          value={content}
          onEditorChange={handleEditorChange}
          init={{
            height: 520,
            menubar: true,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'preview', 'anchor', 'searchreplace', 'visualblocks',
              'code', 'fullscreen', 'insertdatetime', 'media', 'table',
              'help', 'wordcount'
            ],
 paste_data_images: true,
automatic_uploads: true,

images_upload_handler: (blobInfo, progress) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // hasil base64
    };
    reader.onerror = () => reject("Gagal convert ke base64");
    reader.readAsDataURL(blobInfo.blob());
  });
},

            toolbar:
              'undo redo | blocks fontfamily fontsize | ' +
              'bold italic underline strikethrough forecolor backcolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image media table | ' +
              'code preview fullscreen | ' +
              'removeformat | help',
            content_style: `
              body { font-family: Helvetica, Arial, sans-serif; font-size:14px; }
              ol, ul { margin-left: 1.5rem; padding-left: 1.2rem; list-style-position: inside; }
              ol { list-style-type: decimal; } ul { list-style-type: disc; }

              .anno {
                background: linear-gradient(transparent 60%, rgba(255, 235, 0, .9) 60%);
                padding: 0 .08em;
                border-radius: .2em;
                cursor: pointer;
                position: relative;
              }
              .anno:hover::after {
                content: attr(data-anno-text);
                white-space: pre-wrap;
                position: absolute;
                left: 0; top: 100%;
                background: #111; color: #fff;
                font-size: 12px; line-height: 1.2;
                padding: .4em .6em; border-radius: .35em;
                transform: translateY(4px);
                max-width: 280px; z-index: 9999;
              }
            `
          }}
        />
      </div>

      {/* Panel anotasi */}
      {/* <aside style={{ borderLeft: '1px solid #eee', paddingLeft: 12 }}>
        <h4 style={{ marginTop: 0 }}>Anotasi</h4>
        {annotations.length === 0 ? (
          <p style={{ color: '#666' }}>Belum ada anotasi. Seleksi teks lalu klik “+ Anotasi”.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
            {annotations.map(a => (
              <li key={a.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  {new Date(a.createdAt).toLocaleString()}
                </div>
                <div style={{ fontWeight: 600, margin: '4px 0' }}>
                  {a.text}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => scrollToAnnotation(a.id)}>Lihat</button>
                  <button onClick={() => removeAnnotation(a.id)} style={{ color: '#b91c1c' }}>
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </aside> */}
    </div>
  );
};

export default HugeRte;
