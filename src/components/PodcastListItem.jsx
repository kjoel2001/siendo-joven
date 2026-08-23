import { Heart, MessageCircle, Pause, Play, Share2 } from "lucide-react";

export default function PodcastListItem({
  podcast,
  isCurrent,
  playing,
  onPlay,
  liked,
  likes,
  onToggleLike,
  onOpenChat,
  onOpenShare,
  gradient,
}) {
  return (
    <div className="flex gap-3 p-3 rounded-xl hover:bg-white/5 transition">
      {/* miniatura + play */}
      <button
        onClick={onPlay}
        aria-label={playing && isCurrent ? "Pausar" : "Reproducir"}
        className={`relative shrink-0 w-20 h-20 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center group`}
      >
        <div className="w-9 h-9 rounded-full bg-black/40 flex items-center justify-center group-hover:scale-110 transition">
          {isCurrent && playing ? (
            <Pause className="w-4 h-4 fill-white" />
          ) : (
            <Play className="w-4 h-4 fill-white ml-0.5" />
          )}
        </div>
      </button>

      {/* info */}
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-sm md:text-base truncate">
          {podcast.titulo}
        </h3>

        <p className="text-xs text-slate-400 mt-0.5">
          {podcast.categoria} · {podcast.duracion}
        </p>

        <p className="text-xs md:text-sm text-slate-300 mt-1 line-clamp-2">
          {podcast.descripcion}
        </p>

        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={onToggleLike}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <Heart
              className={`w-3.5 h-3.5 ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
            <span className="text-xs">{likes}</span>
          </button>

          <button
            onClick={onOpenChat}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-xs">{podcast.comentarios}</span>
          </button>

          <button
            onClick={onOpenShare}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
