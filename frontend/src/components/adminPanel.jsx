import React, { useState } from "react";

export default function AdminPanel({ auth }) {
  const [form, setForm] = useState({ username: "", password: "", role: "empleado" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Usuario creado exitosamente");
        setForm({ username: "", password: "", role: "empleado" });
      } else {
        setMessage(data.message || "Error al crear usuario");
      }
    } catch {
      setMessage("Error de conexión");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Crear Usuario Nuevo</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} className="border px-2 py-1 mr-2" required />
        <input name="password" placeholder="Contraseña" type="password" value={form.password} onChange={handleChange} className="border px-2 py-1 mr-2" required />
        <select name="role" value={form.role} onChange={handleChange} className="border px-2 py-1 mr-2">
          <option value="empleado">Empleado</option>
          <option value="cliente">Cliente</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" className="bg-[#6FAD46] text-white px-4 py-1 rounded">Crear</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}