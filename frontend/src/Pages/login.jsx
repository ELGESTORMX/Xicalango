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
    <div className="flex items-center justify-center min-h-screen bg-[#111827]">
      <div className="text-center">
        {/* Logo de Xicalango */}
        <div className="mb-8">
          <img 
            src="https://nauibxcauucvnmcvubuu.supabase.co/storage/v1/object/public/xicalango//favicon.png"
            alt="Xicalango Logo"
            className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg border-4 border-white"
          />
        </div>

        {/* Formulario de Login */}
        <form className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Iniciar Sesión</h2>
            <p className="text-sm text-gray-600">Solo para personal autorizado</p>
          </div>
          
          <div className="text-left">
            <label className="block mb-2 text-gray-700 font-medium">Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent" 
              ref={inputEmail} 
              onChange={captureEmail} 
              placeholder="tu-email@xicalango.com"
              required 
            />
            
            <label className="block mb-2 text-gray-700 font-medium">Contraseña</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6FAD46] focus:border-transparent pr-10" 
                ref={inputPassword} 
                onChange={capturePassword} 
                placeholder="Tu contraseña"
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
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-[#6FAD46] text-white py-3 rounded-lg hover:bg-[#5a9639] transition-colors font-medium shadow-lg"
          >
            Acceder al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}