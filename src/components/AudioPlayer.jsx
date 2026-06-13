export default function AudioPlayer({
  playing,
  currentIndex,
  index,
  podcast,
  playPodcast,
}) {
  return (
    <button
      onClick={() => playPodcast(podcast.audio)}
      className="
        w-16 h-16
        md:w-20 md:h-20
        rounded-full
        bg-gradient-to-br
        from-purple-500
        to-purple-700
        flex
        items-center
        justify-center
        shadow-xl
        hover:scale-105
        transition
      "
    >
      <span className="text-2xl md:text-3xl text-white">
        {playing && currentIndex === index
          ? "⏸"
          : "▶"}
      </span>
    </button>
  );
}