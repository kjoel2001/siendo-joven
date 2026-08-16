import { Bell, Play, Pause, Users, TrendingUp, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { usePlayer } from "../context/usePlayer";
import { podcasts, topicGradients } from "../data/podcasts";

const comunidad = [
  {
    nombre: "Awma Y.",
    inicial: "A",
    color: "bg-purple-600",
    texto:
      "El episodio de presión académica me ayudó a organizar mejor mis tiempos de estudio 🙌",
  },
  {
    nombre: "Sana T.",
    inicial: "S",
    color: "bg-pink-600",
    texto:
      "¿Alguien más siente que le cuesta soltar amistades que ya no suman? El episodio 2 me hizo pensar.",
  },
  {
    nombre: "Elnia L.",
    inicial: "E",
    color: "bg-emerald-600",
    texto: "¿Van a sacar más episodios sobre elegir carrera? Los necesito 😅",
  },
];

export default function Explore() {
  const navigate = useNavigate();
  const { currentTrack, playing, playTrack } = usePlayer();

  const destacado = podcasts[0];
  const esDestacadoActual = currentTrack?.id === destacado.id;

  const trending = podcasts.map((p, i) => ({
    categoria: p.categoria,
    // número de mentira solo para dar contexto visual, no es un dato real
    episodios: podcasts.filter((x) => x.categoria === p.categoria).length,
    orden: i,
  }));

  const uniqueTrending = Array.from(
    new Map(trending.map((t) => [t.categoria, t])).values()
  );

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      {/* encabezado */}
      <div className="flex items-center justify-between px-4 md:px-8 pt-6">
        <div>
          <p className="text-slate-400 text-sm">Hola,</p>
          <h1 className="text-xl font-bold">Bienvenido de nuevo</h1>
        </div>

        <button
          aria-label="Notificaciones"
          className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center"
        >
          <Bell className="w-4 h-4" />
        </button>
      </div>

      <div className="px-4 md:px-8 mt-6 max-w-5xl mx-auto">
        {/* episodio destacado */}
        <section>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-700 via-indigo-800 to-slate-900 p-6 md:p-8">
            <p className="text-xs uppercase tracking-wide text-purple-200 font-semibold">
              Episodio destacado
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2 max-w-md">
              {destacado.titulo}
            </h2>

            <p className="text-slate-200/80 text-sm mt-2 max-w-md">
              {destacado.descripcion}
            </p>

            <button
              onClick={() => playTrack(destacado, podcasts, 0)}
              className="mt-5 inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:scale-105 transition"
            >
              {esDestacadoActual && playing ? (
                <Pause className="w-4 h-4 fill-black" />
              ) : (
                <Play className="w-4 h-4 fill-black" />
              )}
              {esDestacadoActual && playing ? "Pausar" : "Escuchar ahora"}
            </button>
          </div>
        </section>

        {/* últimos episodios */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-lg">Últimos episodios</h3>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {podcasts.map((podcast, index) => {
              const isCurrent = currentTrack?.id === podcast.id;

              return (
                <button
                  key={podcast.id}
                  onClick={() => playTrack(podcast, podcasts, index)}
                  className="shrink-0 w-40 text-left group"
                >
                  <div
                    className={`relative w-40 h-40 rounded-xl bg-gradient-to-br ${
                      topicGradients[podcast.categoria] ??
                      "from-slate-700 to-slate-900"
                    } flex items-center justify-center`}
                  >
                    <div className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center group-hover:scale-110 transition">
                      {isCurrent && playing ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </div>
                  </div>

                  <p className="text-sm font-semibold mt-2 line-clamp-2">
                    {podcast.titulo}
                  </p>

                  <p className="text-xs text-slate-400 mt-0.5">
                    {podcast.categoria} · {podcast.duracion}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* comunidad */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-slate-400" />
            <h3 className="font-semibold text-lg">Comunidad</h3>
          </div>

          <div className="space-y-3">
            {comunidad.map((c) => (
              <div
                key={c.nombre}
                className="flex items-start gap-3 bg-slate-900/60 border border-white/5 rounded-xl p-3"
              >
                <div
                  className={`w-8 h-8 shrink-0 rounded-full ${c.color} flex items-center justify-center text-xs font-bold`}
                >
                  {c.inicial}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">{c.nombre}</p>
                  <p className="text-sm text-slate-300 mt-0.5">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* temas en tendencia */}
        <section className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <h3 className="font-semibold text-lg">Temas en tendencia</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {uniqueTrending.map((t) => (
              <span
                key={t.categoria}
                className="px-3 py-1.5 rounded-full text-sm bg-white/5 border border-white/10 text-slate-200"
              >
                {t.categoria}{" "}
                <span className="text-slate-500">· {t.episodios}</span>
              </span>
            ))}
          </div>
        </section>

        {/* crear podcast */}
        <section className="mt-8">
          <button
            onClick={() => navigate("/grabar")}
            className="w-full flex items-center justify-center gap-2 border border-dashed border-white/20 rounded-2xl py-4 text-sm font-semibold text-slate-200 hover:border-purple-400 hover:text-white transition"
          >
            <Mic className="w-4 h-4" />
            Crea tu propio podcast
          </button>
        </section>
      </div>
    </div>
  );
}
