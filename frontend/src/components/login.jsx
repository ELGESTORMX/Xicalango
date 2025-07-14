import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import authUtils from "../utils/auth";
export default function Login({ setAuth }) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const navigate = useNavigate();

  function captureEmail() {
    setEmail(inputEmail.current.value);
  }
  function capturePassword() {
    setPassword(inputPassword.current.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        // Guardar sesión en localStorage
        authUtils.setSession(res.data.user, res.data.token);
        
        // Actualizar estado global si setAuth está disponible
        if (setAuth) {
          setAuth({ 
            logged: true, 
            user: res.data.user, 
            token: res.data.token 
          });
        }
        
        // Navegar a la página principal
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
        <div className="relative">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            className="w-full px-3 py-2 mb-4 border rounded pr-10" 
            ref={inputPassword} 
            onChange={capturePassword} 
            required 
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              // Ícono de ojo cerrado (ocultar)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              // Ícono de ojo abierto (mostrar)
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <button type="submit" className="w-full bg-[#6FAD46] text-white py-2 rounded hover:bg-[#5a9639]">Entrar</button>
        
        {/* Enlace para recuperar contraseña */}
        <div className="text-center mt-4">
          <a 
            href="#" 
            className="text-sm text-gray-600 hover:text-[#6FAD46] transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            ¿Olvidaste tu usuario o contraseña?
          </a>
        </div>
      </form>
    </div>
  );
}