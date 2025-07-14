import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setAuth }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setAuth({ logged: true, ...data.user, token: data.token });
        if (data.user.role === "admin") navigate("/admin");
        else navigate("/home");
      } else {
        setError(data.message || "Error en login");
      }
    } catch {
      setError("Error de conexión");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <label className="block mb-2">Usuario</label>
        <input type="text" name="username" className="w-full px-3 py-2 mb-4 border rounded" value={form.username} onChange={handleChange} required />
        <label className="block mb-2">Contraseña</label>
        <input type="password" name="password" className="w-full px-3 py-2 mb-4 border rounded" value={form.password} onChange={handleChange} required />
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type="submit" className="w-full bg-[#6FAD46] text-white py-2 rounded hover:bg-[#5a9639]">Entrar</button>
      </form>
    </div>
  );
}