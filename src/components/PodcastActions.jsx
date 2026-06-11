import { useNavigate } from "react-router-dom";

export default function PodcastActions({
  liked,
  likes,
  toggleLike,
  setChatOpen,
  setRewardsOpen,
}) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-4 bottom-28 flex flex-col gap-6 z-20">

      <button
        onClick={toggleLike}
        className="flex flex-col items-center"
      >
        <span className="text-3xl">
          {liked ? "❤️" : "🤍"}
        </span>

        <span className="text-xs">
          {likes}
        </span>
      </button>

      <button
        onClick={() => setChatOpen(true)}
        className="flex flex-col items-center"
      >
        <span className="text-4xl">💬</span>

        <span className="text-xs">
          115
        </span>
      </button>

      <button
        onClick={() => setRewardsOpen(true)}
        className="flex flex-col items-center"
        >
        <span className="text-3xl">🏆</span>

        <span className="text-xs">
            Rewards
        </span>
        </button>

      <button className="flex flex-col items-center">
        <span className="text-3xl">🔗</span>

        <span className="text-xs">
          477
        </span>
      </button>

    </div>
  );
}