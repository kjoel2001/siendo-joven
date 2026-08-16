import { Play, Pause } from "lucide-react";
import { usePlayer } from "../context/usePlayer";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";

  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${m}:${s}`;
}

export default function MiniPlayer({ offsetForNavbar = false }) {
  const { currentTrack, playing, progress, duration, togglePlay, seekTo } =
    usePlayer();

  if (!currentTrack) return null;

  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    seekTo(Math.min(Math.max(ratio, 0), 1));
  };

  return (
    <div
      className={`fixed left-0 right-0 z-40 bg-slate-900/95 backdrop-blur border-t border-white/10 ${
        offsetForNavbar ? "bottom-16" : "bottom-0"
      }`}
    >
      {/* barra de progreso, tocable para buscar */}
      <div
        onClick={handleSeek}
        className="h-1.5 w-full bg-white/10 cursor-pointer group"
      >
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 group-hover:from-purple-400 group-hover:to-indigo-400 transition-colors"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-3 px-3 sm:px-4 h-16">
        {/* mini disco */}
        <div
          className={`${
            playing ? "spin" : ""
          } w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-900 border border-white/10 flex items-center justify-center`}
        >
          <div className="w-3.5 h-3.5 rounded-full bg-black border-2 border-white" />
        </div>

        {/* info */}
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-semibold truncate">
            {currentTrack.titulo}
          </p>

          <p className="text-slate-400 text-xs truncate">
            Siendo Joven ·{" "}
            {formatTime(progress * duration)} / {formatTime(duration)}
          </p>
        </div>

        {/* play / pausa */}
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pausar" : "Reproducir"}
          className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          {playing ? (
            <Pause className="w-4 h-4 text-white fill-white" />
          ) : (
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
