import { useState, useRef, useEffect, useMemo } from "react";

import PodcastCard from "../components/PodcastCard";
import TopicChips from "../components/TopicChips";
import ChatBox from "../components/ChatBox";
import MobileChat from "../components/MobileChat";
import RewardsPanel from "../components/RewardsPanel";
import SharePanel from "../components/SharePanel";
import { usePlayer } from "../context/usePlayer";
import { podcasts, getTopics } from "../data/podcasts";

export default function Home() {
  const [likes, setLikes] = useState(380);
  const [liked, setLiked] = useState(false);

  const [chatOpen, setChatOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] =
    useState(false);
  const [shareOpen, setShareOpen] =
    useState(false);

  const [selectedTopic, setSelectedTopic] =
    useState("Todos");

  const { playing, currentIndex, playTrack } = usePlayer();

  const sectionRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  const topics = useMemo(() => ["Todos", ...getTopics()], []);

  const filteredPodcasts = useMemo(() => {
    if (selectedTopic === "Todos") return podcasts;

    return podcasts.filter(
      (p) => p.categoria === selectedTopic
    );
  }, [selectedTopic]);

  const toggleLike = () => {
    setLikes((prev) =>
      liked ? prev - 1 : prev + 1
    );

    setLiked(!liked);
  };

  // Puente: PodcastCard/AudioPlayer llaman playPodcast(audioUrl);
  // aquí lo traducimos al reproductor global, que trabaja con el
  // objeto podcast completo (para mostrar título, etc. en la MiniPlayer).
  const playPodcast = (audio) => {
    const index = filteredPodcasts.findIndex(
      (p) => p.audio === audio
    );

    if (index === -1) return;

    playTrack(filteredPodcasts[index], filteredPodcasts, index);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);

    // vuelve al inicio del feed filtrado
    scrollContainerRef.current?.scrollTo({ top: 0 });
  };

  useEffect(() => {
    sectionRefs.current = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting
        );

        if (!visible) return;

        const index = Number(
          visible.target.dataset.index
        );

        if (filteredPodcasts[index]) {
          playTrack(
            filteredPodcasts[index],
            filteredPodcasts,
            index
          );
        }
      },
      {
        threshold: 0.7,
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredPodcasts]);

  return (
    <>
      <style>{`
        .spin {
          animation: spin 6s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      <div className="relative h-screen bg-black text-white">
        <TopicChips
          topics={topics}
          selected={selectedTopic}
          onSelect={handleSelectTopic}
        />

        <div
          ref={scrollContainerRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory"
        >
          {filteredPodcasts.map((podcast, index) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              index={index}
              currentIndex={currentIndex}
              playing={playing}
              playPodcast={playPodcast}
              toggleLike={toggleLike}
              liked={liked}
              likes={likes}
              setChatOpen={setChatOpen}
              setRewardsOpen={setRewardsOpen}
              setShareOpen={setShareOpen}
              sectionRefs={sectionRefs}
            />
          ))}

          {filteredPodcasts.length === 0 && (
            <div className="h-screen flex flex-col items-center justify-center text-center px-6">
              <p className="text-lg font-semibold">
                Todavía no hay episodios en “{selectedTopic}”
              </p>

              <p className="text-slate-400 text-sm mt-2">
                Prueba con otro tema o vuelve a “Todos”.
              </p>
            </div>
          )}
        </div>
      </div>

      <ChatBox
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />

      <MobileChat
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />

      <RewardsPanel
        rewardsOpen={rewardsOpen}
        setRewardsOpen={setRewardsOpen}
      />

      <SharePanel
        shareOpen={shareOpen}
        setShareOpen={setShareOpen}
      />
    </>
  );
}
