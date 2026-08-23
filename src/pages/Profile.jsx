import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  ChevronRight,
  HelpCircle,
  LogOut,
  Pencil,
  Shield,
  Trophy,
  X,
} from "lucide-react";

import RewardsPanel from "../components/RewardsPanel";
import { getTopics } from "../data/podcasts";

const usuarioInicial = {
  nombre: "Cody Fisher",
  correo: "cody.fisher@correo.com",
  puntos: 350,
};

const estadisticas = [
  { label: "Episodios escuchados", valor: 12 },
  { label: "Racha", valor: "5 días" },
  { label: "Temas seguidos", valor: getTopics().length },
];

export default function Profile() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(usuarioInicial);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [notificaciones, setNotificaciones] = useState(true);

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(usuarioInicial);
  const [error, setError] = useState("");

  const iniciales = usuario.nombre
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const cerrarSesion = () => {
    navigate("/");
  };

  const empezarEdicion = () => {
    setForm({ nombre: usuario.nombre, correo: usuario.correo });
    setError("");
    setEditando(true);
  };

  const cancelarEdicion = () => {
    setEditando(false);
    setError("");
  };

  const guardarPerfil = (e) => {
    e.preventDefault();

    const nombre = form.nombre.trim();
    const correo = form.correo.trim();

    if (!nombre || !correo) {
      setError("Nombre y correo no pueden quedar vacíos.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(correo)) {
      setError("Ingresa un correo válido.");
      return;
    }

    setUsuario((prev) => ({ ...prev, nombre, correo }));
    setEditando(false);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      {/* encabezado */}
      <div className="px-4 md:px-8 pt-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center text-lg font-bold shrink-0">
            {iniciales}
          </div>

          {editando ? (
            <div className="min-w-0 flex-1" />
          ) : (
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold truncate">
                {usuario.nombre}
              </h1>

              <p className="text-slate-400 text-sm truncate">
                {usuario.correo}
              </p>
            </div>
          )}

          {!editando && (
            <button
              onClick={empezarEdicion}
              aria-label="Editar perfil"
              className="w-9 h-9 shrink-0 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center hover:border-purple-400 transition"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>

        {editando && (
          <form
            onSubmit={guardarPerfil}
            className="mt-4 bg-slate-900/60 border border-white/5 rounded-xl p-4 space-y-3"
          >
            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Nombre
              </label>

              <input
                type="text"
                value={form.nombre}
                onChange={(e) =>
                  setForm((f) => ({ ...f, nombre: e.target.value }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">
                Correo electrónico
              </label>

              <input
                type="email"
                value={form.correo}
                onChange={(e) =>
                  setForm((f) => ({ ...f, correo: e.target.value }))
                }
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 transition rounded-lg py-2 text-sm font-semibold"
              >
                <Check className="w-4 h-4" />
                Guardar
              </button>

              <button
                type="button"
                onClick={cancelarEdicion}
                className="flex-1 flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 transition rounded-lg py-2 text-sm font-semibold"
              >
                <X className="w-4 h-4" />
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* estadísticas */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {estadisticas.map((stat) => (
            <div
              key={stat.label}
              className="bg-slate-900/60 border border-white/5 rounded-xl p-3 text-center"
            >
              <p className="text-lg font-bold">{stat.valor}</p>
              <p className="text-xs text-slate-400 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* recompensas */}
        <button
          onClick={() => setRewardsOpen(true)}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 transition rounded-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5" />

            <div className="text-left">
              <p className="font-semibold">Tus puntos</p>
              <p className="text-2xl font-bold">{usuario.puntos}</p>
            </div>
          </div>

          <ChevronRight className="w-5 h-5" />
        </button>

        {/* temas favoritos */}
        <section className="mt-8">
          <h2 className="font-semibold text-lg mb-3">
            Temas favoritos
          </h2>

          <div className="flex flex-wrap gap-2">
            {getTopics().map((tema) => (
              <span
                key={tema}
                className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-slate-200"
              >
                {tema}
              </span>
            ))}
          </div>
        </section>

        {/* ajustes */}
        <section className="mt-8">
          <h2 className="font-semibold text-lg mb-3">Ajustes</h2>

          <div className="rounded-xl border border-white/5 divide-y divide-white/5 overflow-hidden">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Bell className="w-4 h-4 text-slate-400" />
                <span className="text-sm">Notificaciones</span>
              </div>

              <button
                onClick={() => setNotificaciones((v) => !v)}
                aria-label="Activar o desactivar notificaciones"
                className={`w-11 h-6 rounded-full transition relative shrink-0 ${
                  notificaciones ? "bg-purple-600" : "bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition ${
                    notificaciones ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-slate-400" />
                <span className="text-sm">Privacidad</span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span className="text-sm">Ayuda y soporte</span>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </section>

        {/* cerrar sesión */}
        <button
          onClick={cerrarSesion}
          className="w-full mt-8 flex items-center justify-center gap-2 text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 rounded-xl py-3 text-sm font-semibold transition"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </div>

      <RewardsPanel
        rewardsOpen={rewardsOpen}
        setRewardsOpen={setRewardsOpen}
      />
    </div>
  );
}
