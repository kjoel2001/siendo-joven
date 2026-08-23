import { useMemo, useState } from "react";

import PodcastListItem from "../components/PodcastListItem";
import ChatBox from "../components/ChatBox";
import MobileChat from "../components/MobileChat";
import RewardsPanel from "../components/RewardsPanel";
import SharePanel from "../components/SharePanel";
import { usePlayer } from "../context/usePlayer";
import { podcasts, getTopics, topicGradients } from "../data/podcasts";

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const [selectedTopic, setSelectedTopic] = useState("Todos");

  // likes por episodio (antes era un solo contador compartido por error)
  const [likesState, setLikesState] = useState(() =>
    Object.fromEntries(
      podcasts.map((p) => [p.id, { liked: false, likes: p.likesIniciales }])
    )
  );

  const { currentTrack, playing, playTrack } = usePlayer();

  const topics = useMemo(() => ["Todos", ...getTopics()], []);

  const filteredPodcasts = useMemo(() => {
    if (selectedTopic === "Todos") return podcasts;
    return podcasts.filter((p) => p.categoria === selectedTopic);
  }, [selectedTopic]);

  const toggleLike = (id) => {
    setLikesState((prev) => {
      const actual = prev[id];
      const liked = !actual.liked;

      return {
        ...prev,
        [id]: {
          liked,
          likes: actual.likes + (liked ? 1 : -1),
        },
      };
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-28">
      {/* encabezado */}
      <div className="flex items-center gap-3 px-4 md:px-8 pt-6">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-lg shrink-0">
          🎧
        </div>

        <div>
          <h1 className="font-bold text-lg leading-none">Siendo Joven</h1>
          <p className="text-xs text-slate-400">Podcast para jóvenes</p>
        </div>
      </div>

      {/* chips de temas */}
      <div className="mt-4 px-4 md:px-8">
        <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 w-max">
            {topics.map((topic) => {
              const isActive = topic === selectedTopic;

              return (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium border transition ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-slate-200 border-white/15 hover:bg-white/10"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* lista de episodios */}
      <div className="px-4 md:px-8 mt-4 max-w-5xl mx-auto">
        {filteredPodcasts.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-semibold">
              Todavía no hay episodios en “{selectedTopic}”
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Prueba con otro tema o vuelve a “Todos”.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredPodcasts.map((podcast, index) => {
              const isCurrent = currentTrack?.id === podcast.id;
              const { liked, likes } = likesState[podcast.id];

              return (
                <PodcastListItem
                  key={podcast.id}
                  podcast={podcast}
                  isCurrent={isCurrent}
                  playing={playing}
                  onPlay={() =>
                    playTrack(podcast, filteredPodcasts, index)
                  }
                  liked={liked}
                  likes={likes}
                  onToggleLike={() => toggleLike(podcast.id)}
                  onOpenChat={() => setChatOpen(true)}
                  onOpenShare={() => setShareOpen(true)}
                  gradient={
                    topicGradients[podcast.categoria] ??
                    "from-slate-700 to-slate-900"
                  }
                />
              );
            })}
          </div>
        )}
      </div>

      <ChatBox chatOpen={chatOpen} setChatOpen={setChatOpen} />
      <MobileChat chatOpen={chatOpen} setChatOpen={setChatOpen} />
      <RewardsPanel rewardsOpen={rewardsOpen} setRewardsOpen={setRewardsOpen} />
      <SharePanel shareOpen={shareOpen} setShareOpen={setShareOpen} />
    </div>
  );
}
