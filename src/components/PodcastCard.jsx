import PodcastHeader from "./PodcastHeader";
import VinylDisc from "./VinylDisc";
import AudioPlayer from "./AudioPlayer";
import PodcastActions from "./PodcastActions";

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
  sectionRefs,
}) {
  return (
    <section
      data-index={index}
      ref={(el) =>
        (sectionRefs.current[index] = el)
      }
      className="h-screen snap-start relative flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-slate-900 to-black" />

      <PodcastHeader />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 md:px-6 pt-8 md:pt-0">

        <VinylDisc
          playing={playing}
          currentIndex={currentIndex}
          index={index}
        />

        <div className="text-center max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 px-2">
            {podcast.titulo}
          </h2>

          <p className="text-slate-300 text-sm md:text-base px-4 md:px-0">
            {podcast.descripcion}
          </p>
        </div>

        <AudioPlayer
          playing={playing}
          currentIndex={currentIndex}
          index={index}
          podcast={podcast}
          playPodcast={playPodcast}
        />
      </div>

      <div className="absolute right-3 md:right-4 bottom-16 md:bottom-28 z-20">
        <PodcastActions
            liked={liked}
            likes={likes}
            toggleLike={toggleLike}
            setChatOpen={setChatOpen}
            setRewardsOpen={setRewardsOpen}
        />
      </div>
    </section>
  );
}