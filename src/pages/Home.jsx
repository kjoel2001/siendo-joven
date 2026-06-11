import { useState, useRef, useEffect } from "react";

import PodcastCard from "../components/PodcastCard";
import ChatBox from "../components/ChatBox";
import MobileChat from "../components/MobileChat";
import RewardsPanel from "../components/RewardsPanel";

export default function Home() {
  const [likes, setLikes] = useState(380);
  const [liked, setLiked] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentAudio, setCurrentAudio] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const audioRef = useRef(null);
  const sectionRefs = useRef([]);
  const base = import.meta.env.BASE_URL;
  const podcasts = [
    {
      id: 1,
      titulo: "Cómo afrontar la presión académica",
      descripcion: "Aprende técnicas para controlar el estrés y mejorar tu rendimiento académico.",
      audio: base + "audio/alex-morgan-neon-synthwave-drive-537447.mp3",
    },
    {
      id: 2,
      titulo: "Amistades que sí valen la pena",
      descripcion: "Cómo identificar amistades saludables y fortalecer tus relaciones.",
      audio: base + "audio/aries-beats-synth-rock.mp3",
    },
    {
      id: 3,
      titulo: "¿Qué carrera debería elegir?",
      descripcion: "Consejos prácticos para tomar una de las decisiones más importantes de tu vida.",
      audio: base + "audio/fsm-team-escp-neonscapes.mp3",
    },
  ];

  const toggleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked(!liked);
  };

  const playPodcast = async (audio) => {
    try {
      if (!audioRef.current) return;

      if (currentAudio !== audio) {
        audioRef.current.src = audio;

        await audioRef.current.play();

        setCurrentAudio(audio);
        setPlaying(true);
        return;
      }

      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        await audioRef.current.play();
        setPlaying(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting
        );

        if (!visible) return;

        const index = Number(
          visible.target.dataset.index
        );

        setCurrentIndex(index);

        if (
          audioRef.current &&
          podcasts[index]?.audio
        ) {
          try {
            audioRef.current.pause();

            audioRef.current.src =
              podcasts[index].audio;

            await audioRef.current.play();

            setCurrentAudio(
              podcasts[index].audio
            );

            setPlaying(true);
          } catch (err) {
            console.log(err);
          }
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
  }, []);

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

      <audio
        ref={audioRef}
        onEnded={() => setPlaying(false)}
      />

      <div className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white">
        {podcasts.map((podcast, index) => (
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
            sectionRefs={sectionRefs}
          />
        ))}
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
    </>
  );
}