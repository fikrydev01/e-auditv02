import { useEffect, useRef, useState } from "react";
import { api } from "../../utils/api";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function LoginGoogle() {
  const [animate, setAnimate] = useState(false);
  const [err, setErr] = useState("");
  const [user, setUser] = useState(null);
  const divRef = useRef(null);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(divRef.current, {
        theme: "outline",
        size: "large",
        type: "standard", // tampilkan tombol standar Google
        shape: "pill", // lebih modern
        text: "signin_with", // menampilkan "Sign in with Google"
        logo_alignment: "left",
      });

      window.google.accounts.id.prompt();
    }
  }, []);

  const handleCredentialResponse = (response) => {
    if (!response || !response.credential) return;
    try {
      const userObject = parseJwt(response.credential);
      setUser(userObject);
    } catch (e) {
      console.error("Failed to parse JWT:", e);
    }
  };

  const parseJwt = (token) => {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(
          (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  const handleLogout = () => {
    google.accounts.id.disableAutoSelect();
    setUser(null);
  };

  const handleLogin = async () => {
    setAnimate(true);
    setErr("");
    let input = {
      email: user?.email,
      name: user?.name,
    };
    await api
      .post(`/auth/login_google`, input)
      .then((res) => {
        let stt = res.data.status;
        if (stt == 404) {
          setErr(res.data.message);
          setAnimate(false);
          return;
        }
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("data", res.data.data_enc || null);
        localStorage.setItem("theme", "light");

        window.location.href = "/u/d";
        setAnimate(false);
      })
      .catch((err) => {
        setAnimate(false);
        console.log("eerr", err.response.data.detail);
        setErr(err.response.data.detail);
      });
  };

  useEffect(() => {
    if (user) {
      handleLogin();
    }
  }, [user]);

  return (
  <div className="flex flex-col w-full max-w-md mx-auto">
  {/* Google Button Full Width */}
  <div
    ref={divRef}
    className="w-full mb-3"
    style={{ width: "100%" }}
  ></div>

  {/* Error Message */}
  {err && (
    <div className="bg-red-500/90 px-4 py-2 rounded-lg text-sm shadow-md text-white text-center flex items-center justify-center animate-fade-in">
      {err}
    </div>
  )}
</div>

  );
}

export default LoginGoogle;
