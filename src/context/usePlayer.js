import { useContext } from "react";
import { PlayerContext } from "./player-context";

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) {
    throw new Error("usePlayer debe usarse dentro de <PlayerProvider>");
  }
  return ctx;
}
