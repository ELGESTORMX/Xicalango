import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login({ setAuth }) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const navigate = useNavigate();

  function captureEmail() {
    setEmail(inputEmail.current.value);
  }
  function capturePassword() {
    setPassword(inputPassword.current.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const datos = {
        email: email, 
        password: password
      };
      const res = await axios.post("http://localhost:5000/api/auth/login", datos);
      console.log(res.data);
      if (res.status === 200) {
        // Por ahora navegar siempre a home, luego puedes agregar lógica de roles
        navigate("/");
      } else {
        setError(res.data.message || "Error en login");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Error de conexión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <label className="block mb-2">Correo Electrónico</label>
        <input type="email" name="email" className="w-full px-3 py-2 mb-4 border rounded" ref={inputEmail} onChange={captureEmail} required />
        <label className="block mb-2">Contraseña</label>
        <input type="password" name="password" className="w-full px-3 py-2 mb-4 border rounded" ref={inputPassword} onChange={capturePassword} required />
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type="submit" className="w-full bg-[#6FAD46] text-white py-2 rounded hover:bg-[#5a9639]">Entrar</button>
      </form>
    </div>
  );
}