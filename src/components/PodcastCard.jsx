import PodcastHeader from "./PodcastHeader";
import VinylDisc from "./VinylDisc";
import AudioPlayer from "./AudioPlayer";

export default function PodcastCard({
  podcast,
  index,
  currentIndex,
  playing,
  playPodcast,
  toggleLike,
  liked,
  likes,
  setChatOpen,
  setRewardsOpen,
  setShareOpen,
  sectionRefs,
}) {
  return (
    <section
      data-index={index}
      ref={(el) => (sectionRefs.current[index] = el)}
      className="h-screen snap-start relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-black" />

      <PodcastHeader />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 md:px-6 pb-32">

        <VinylDisc
          playing={playing}
          currentIndex={currentIndex}
          index={index}
        />

        <div className="text-center max-w-xl mt-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 px-2">
            {podcast.titulo}
          </h2>

          <p className="text-slate-300 text-sm md:text-base px-4 md:px-0">
            {podcast.descripcion}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 sm:gap-3">

          {/* Like */}
          <button
            onClick={toggleLike}
            className="w-12 sm:w-14 flex flex-col items-center justify-center transition hover:scale-105"
          >
            <span className="text-2xl sm:text-3xl">
              {liked ? "❤️" : "🤍"}
            </span>

            <span className="text-[10px] sm:text-xs text-slate-300 mt-1">
              {likes}
            </span>
          </button>

          {/* Rewards */}
          <button
            onClick={() => setRewardsOpen(true)}
            className="w-12 sm:w-14 flex flex-col items-center justify-center transition hover:scale-105"
          >
            <span className="text-2xl sm:text-3xl">
              🏆
            </span>

            <span className="text-[10px] sm:text-xs text-slate-300 mt-1">
              Rewards
            </span>
          </button>

          {/* Play */}
          <div className="mx-1 sm:mx-3">
            <AudioPlayer
              playing={playing}
              currentIndex={currentIndex}
              index={index}
              podcast={podcast}
              playPodcast={playPodcast}
            />
          </div>

          {/* Chat */}
          <button
            onClick={() => setChatOpen(true)}
            className="w-12 sm:w-14 flex flex-col items-center justify-center transition hover:scale-105"
          >
            <span className="text-2xl sm:text-3xl">
              💬
            </span>

            <span className="text-[10px] sm:text-xs text-slate-300 mt-1">
              115
            </span>
          </button>

          {/* Share */}
          <button
            onClick={() => setShareOpen(true)}
            className="w-12 sm:w-14 flex flex-col items-center justify-center transition hover:scale-105"
          >
            <span className="text-2xl sm:text-3xl">
              🔗
            </span>

            <span className="text-[10px] sm:text-xs text-slate-300 mt-1">
              Share
            </span>
          </button>

        </div>

      </div>
    </section>
  );
}