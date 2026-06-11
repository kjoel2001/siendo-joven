export default function AudioPlayer({
  playing,
  currentIndex,
  index,
  podcast,
  playPodcast,
}) {
  return (
    <button
      onClick={() =>
        playPodcast(podcast.audio)
      }
      className="mt-8 w-20 h-20 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center shadow-xl transition"
    >
      <span className="text-3xl">
        {playing &&
        currentIndex === index
          ? "⏸"
          : "▶"}
      </span>
    </button>
  );
}