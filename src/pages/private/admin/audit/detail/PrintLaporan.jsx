import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import KopSuratSpi from '../../../../../components/KopSuratSpi';

const PrintLaporan = ({ audit, laporan }) => {
  
    
  const contentRef = useRef(null);
  const [processedContent, setProcessedContent] = useState([]);
const[loading, setLoading] = useState(false)
  // Process laporan content into pages
  useEffect(() => {
    if (laporan) {
      const pages = splitContentIntoPages(laporan);
      setProcessedContent(pages);
    }
  }, [laporan]);

  const splitContentIntoPages = (content) => {
    if (!content) return [];
    
    if (typeof content === 'string') {
      const sections = content.split(/(?=<h1|<h2|<h3|<div class="page-break"|<p class="MsoNormal" align="center"|<p class="MsoNormal" style="page-break-after:)/i);
      
      const pages = [];
      let currentPage = [];
      let currentPageSize = 0;
      const MAX_PAGE_SIZE = 1500;

      sections.forEach(section => {
        const sectionSize = section.length;
        
        if (currentPageSize + sectionSize > MAX_PAGE_SIZE && currentPage.length > 0) {
          pages.push(currentPage.join(''));
          currentPage = [section];
          currentPageSize = sectionSize;
        } else {
          currentPage.push(section);
          currentPageSize += sectionSize;
        }
      });

      if (currentPage.length > 0) {
        pages.push(currentPage.join(''));
      }

      return pages;
    }
    
    return [content];
  };

  const generatePDF = async () => {
    if (!contentRef.current) return;

    const pdf = new jsPDF('p', 'mm', 'a4');
    // const elements = contentRef.current.getElementsByClassName('pdf-page');

    const elements = contentRef.current.querySelectorAll('.pdf-page, .pdf-page-audit');
    setLoading(true)
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      
      const canvas = await html2canvas(element, {
        scale: 1.2, // Reduced from 2 to 1.2 (medium quality)
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', // Tetap white background
        width: element.scrollWidth,
        height: element.scrollHeight,
        // Optimasi tambahan
        allowTaint: true,
        useCORS: true,
        onclone: (clonedDoc) => {
          // Pastikan background tetap putih
          clonedDoc.body.style.backgroundColor = '#ffffff';
          const pages = clonedDoc.querySelectorAll('.pdf-page, .pdf-page-audit');
          pages.forEach(page => {
            page.style.backgroundColor = '#ffffff';
          });
        }
      });

      // Gunakan JPEG dengan quality 0.8 instead of PNG
      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate dimensions to fit page with margins
      const margin = 15;
      const imgWidth = pageWidth - (margin * 2);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) {
        pdf.addPage();
      }

      // Center the content on page
      const xPos = margin;
      const yPos = margin;

      pdf.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, imgHeight);
      
      // Clean up memory
      canvas.width = 0;
      canvas.height = 0;
    }

    const filename = `Laporan-Audit-${audit?.periode_audit || 'Unknown'}-${new Date().getTime()}.pdf`;
    
    // Optional: Check PDF size
    const pdfBlob = pdf.output('blob');
    console.log('PDF Size:', (pdfBlob.size / 1024 / 1024).toFixed(2), 'MB');
    
    pdf.save(filename);
    setLoading(false)
  };

  // CSS untuk styling laporan - pastikan background putih
  const reportStyles = `
    .pdf-page, .pdf-page-audit {
    width: 210mm;
    min-height: 297mm;
    background: #ffffff !important;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    margin-bottom: 10mm;
    box-sizing: border-box;
    font-family: 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000000;
    page-break-inside: avoid;
  }
  
  .pdf-page {
    padding: 20mm;
  }
  
  .pdf-page-audit {
    padding: 5mm 10mm !important; /* Reduced top padding from 10mm to 5mm */
    display: flex;
    flex-direction: column;
  }
  
  .kop-surat-container {
    margin-top: 0 !important;
    padding-top: 0 !important;
    margin-bottom: 10mm;
  }
  
  .content-audit {
    margin-top: 5mm;
    flex: 1;
  }
  
  .pdf-page *, .pdf-page-audit * {
    background: transparent !important;
  }
  
  /* Rest of your CSS remains the same */
  .laporan-content {
    font-family: 'Times New Roman', serif;
    font-size: 12pt;
    line-height: 1.5;
    background: #ffffff !important;
  }
  
  .laporan-content h1, 
  .laporan-content h2, 
  .laporan-content h3 {
    text-align: center;
    margin: 20px 0;
    font-weight: bold;
    background: transparent !important;
  }
  
  .laporan-content h1 {
    font-size: 14pt;
  }
  
  .laporan-content h2 {
    font-size: 13pt;
  }
  
  .laporan-content h3 {
    font-size: 12pt;
    text-align: left;
  }
  
  .laporan-content p {
    margin: 10px 0;
    text-align: justify;
    background: transparent !important;
  }
  
  .laporan-content .MsoNormal {
    margin: 10px 0;
    background: transparent !important;
  }
  
  .cover-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    background: #ffffff !important;
  }
  
  @media print {
    .pdf-page, .pdf-page-audit {
      box-shadow: none;
      margin: 0;
      background: #ffffff !important;
    }
    .pdf-page {
      padding: 20mm;
    }
    .pdf-page-audit {
      padding: 5mm 10mm !important;
    }
  }
  `;
  return (
    <div className="p-4">
      <style>{reportStyles}</style>
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Preview Laporan Audit</h2>
        <button 
          onClick={generatePDF}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
        >
            {loading ? `Loading,....` : 
          'Download PDF'
            }
        </button>
      </div>

      <div ref={contentRef} className="print-content">
        {/* Cover Page */}
        <div className="pdf-page cover-page">
          <div className="flex flex-col justify-center items-center h-full">
            <div className="mb-8">
              <img src="/assets/images/logo-uinjkt.png" alt="Logo UIN" className="h-20 mx-auto mb-4" />
            </div>
            <h1 className="text-2xl font-bold mb-4">LAPORAN HASIL AUDIT</h1>
            <h2 className="text-xl font-semibold mb-2 uppercase">AUDIT {audit?.tipe_audit || 'AUDIT INTERNAL'}</h2>
            <p className="text-lg mb-2 uppercase">Periode: {audit?.periode_audit || '-'}</p>
            {/* <p className="text-lg mb-2">Unit: {audit?.kode_unit || '-'}</p> */}
            <div className="mt-16 pt-8 border-t border-gray-300 w-full">
              <p className="text-sm">SATUAN PENGAWASAN INTERNAL</p>
              <p className="text-sm">UIN SYARIF HIDAYATULLAH JAKARTA</p>
              <p className="text-sm mt-4">{new Date().toLocaleDateString('id-ID', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
        </div>

  

        {/* Konten Laporan yang Diproses */}
        {processedContent.map((pageContent, index) => (
          <div key={index} className="pdf-page laporan-content">
            <div 
              dangerouslySetInnerHTML={{ __html: pageContent }} 
            />
          </div>
        ))}
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>
          <div  className="pdf-page-audit">
            <KopSuratSpi />
            <div>lAPORINA1</div>
          </div>

        {/* Halaman Penutup/Tanda Tangan */}
        <div className="pdf-page">
          <div className="flex flex-col justify-center h-full">
            <div className="text-center mb-16">
              <p>Jakarta, {new Date().toLocaleDateString('id-ID')}</p>
            </div>
            
            <div className="flex justify-between">
              <div className="text-center">
                <p className="font-bold">Diperiksa oleh:</p>
                <p className="font-bold">Tim Auditor</p>
                <div className="mt-16">
                  <p className="font-bold">_________________________</p>
                  <p>NIP.</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="font-bold">Mengetahui:</p>
                <p className="font-bold">Kepala SPI</p>
                <div className="mt-16">
                  <p className="font-bold">_________________________</p>
                  <p>NIP.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <strong>Info:</strong> Dokumen akan di-generate dalam format PDF dengan layout A4. 
          Total halaman: {processedContent.length + 3} (Cover, Daftar Isi, {processedContent.length} halaman konten, Penutup)
        </p>
      </div>
    </div>
  );
};

export default PrintLaporan;