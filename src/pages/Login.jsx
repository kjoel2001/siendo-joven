import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setMensaje("✅ Inicio de sesión exitoso");

    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl p-8 border border-slate-800">
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Siendo Joven
          </h1>

          <p className="text-slate-400 mt-2">
            Lo que nadie dice, aquí se escucha
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-slate-300 mb-2">
              Correo electrónico
            </label>

            <input
              type="email"
              placeholder="correo@ejemplo.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Contraseña
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Iniciar Sesión
          </button>

          {mensaje && (
            <p className="text-green-400 text-center font-medium">
              {mensaje}
            </p>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-slate-400">
            ¿No tienes cuenta?
          </p>

          <Link
            to="/register"
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}