import {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { PlayerContext } from "./player-context";

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 - 1
  const [duration, setDuration] = useState(0);

  const playTrack = useCallback(
    async (track, list, index) => {
      try {
        if (!audioRef.current) return;

        if (list) setQueue(list);
        if (typeof index === "number") setCurrentIndex(index);

        if (currentTrack?.audio !== track.audio) {
          audioRef.current.src = track.audio;
          await audioRef.current.play();
          setCurrentTrack(track);
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
      } catch (err) {
        console.error(err);
      }
    },
    [currentTrack, playing]
  );

  const togglePlay = useCallback(() => {
    if (!currentTrack) return;
    playTrack(currentTrack);
  }, [currentTrack, playTrack]);

  const seekTo = useCallback((ratio) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    audioRef.current.currentTime = ratio * audioRef.current.duration;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
        setDuration(audio.duration);
      }
    };

    const onEnded = () => {
      setPlaying(false);
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        queue,
        currentIndex,
        setCurrentIndex,
        currentTrack,
        playing,
        progress,
        duration,
        playTrack,
        togglePlay,
        seekTo,
      }}
    >
      <audio ref={audioRef} />
      {children}
    </PlayerContext.Provider>
  );
}
