import { useState } from "react";

export default function RewardsPanel({
  rewardsOpen,
  setRewardsOpen,
}) {
  const [claimedRewards, setClaimedRewards] =
    useState([]);

  if (!rewardsOpen) return null;

  const userPoints = 350;

  const rewards = [
    {
      id: 1,
      icon: "🥉",
      title: "Principiante",
      points: 100,
    },
    {
      id: 2,
      icon: "🥈",
      title: "Explorador",
      points: 250,
    },
    {
      id: 3,
      icon: "🎨",
      title: "Tema Premium",
      points: 500,
    },
    {
      id: 4,
      icon: "⭐",
      title: "Perfil Destacado",
      points: 1000,
    },
  ];

  const claimReward = (rewardId) => {
    if (!claimedRewards.includes(rewardId)) {
      setClaimedRewards([
        ...claimedRewards,
        rewardId,
      ]);
    }
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden lg:flex fixed right-0 top-0 h-screen w-96 bg-slate-900 border-l border-slate-800 z-50 flex-col text-white">

        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="font-bold text-xl">
            🏆 Recompensas
          </h2>

          <button
            onClick={() =>
              setRewardsOpen(false)
            }
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <RewardsContent
            rewards={rewards}
            userPoints={userPoints}
            claimedRewards={claimedRewards}
            claimReward={claimReward}
          />
        </div>

      </div>

      {/* MOBILE */}
      <div className="lg:hidden fixed inset-0 z-50">

        <div
          onClick={() =>
            setRewardsOpen(false)
          }
          className="absolute inset-0 bg-black/60"
        />

        <div className="absolute bottom-0 left-0 right-0 h-[80vh] bg-slate-900 rounded-t-3xl flex flex-col animate-slideUp">

          <div className="p-4 border-b border-slate-700 flex justify-between items-center">

            <h2 className="font-bold text-xl text-white">
              🏆 Recompensas
            </h2>

            <button
              onClick={() =>
                setRewardsOpen(false)
              }
              className="text-white text-xl"
            >
              ✕
            </button>

          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <RewardsContent
              rewards={rewards}
              userPoints={userPoints}
              claimedRewards={claimedRewards}
              claimReward={claimReward}
            />
          </div>

        </div>

      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }

          to {
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp .25s ease-out;
        }
      `}</style>
    </>
  );
}

function RewardsContent({
  rewards,
  userPoints,
  claimedRewards,
  claimReward,
}) {
  return (
    <>
      <div className="bg-purple-600 rounded-xl p-4 mb-5">
        <p className="text-white">
          Tus puntos
        </p>

        <h3 className="text-4xl font-bold text-white">
          {userPoints}
        </h3>
      </div>

      <div className="space-y-4">

        {rewards.map((reward) => {
          const unlocked =
            userPoints >= reward.points;

          const claimed =
            claimedRewards.includes(
              reward.id
            );

          return (
            <div
              key={reward.id}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700"
            >
              <div className="text-4xl mb-2">
                {reward.icon}
              </div>

              <h4 className="font-bold text-white">
                {reward.title}
              </h4>

              <p className="text-slate-300 mb-3">
                {reward.points} puntos
              </p>

              {claimed ? (
                <button
                  disabled
                  className="w-full py-2 rounded-lg bg-green-600 text-white"
                >
                  ✓ Reclamada
                </button>
              ) : unlocked ? (
                <button
                  onClick={() =>
                    claimReward(reward.id)
                  }
                  className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Reclamar
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2 rounded-lg bg-slate-700 text-slate-400"
                >
                  Bloqueada
                </button>
              )}
            </div>
          );
        })}

      </div>
    </>
  );
}