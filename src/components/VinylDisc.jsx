export default function VinylDisc({
  playing,
  currentIndex,
  index,
}) {
  return (
    <div className="relative mb-6 md:mb-10">
      <div
        className={`
          ${
            playing && currentIndex === index
              ? "spin"
              : ""
          }
          w-56 h-56
          sm:w-64 sm:h-64
          md:w-96 md:h-96
          rounded-full
          bg-gradient-to-br
          from-purple-500
          to-indigo-900
          shadow-2xl
          flex
          items-center
          justify-center
          border
          border-white/10
        `}
      >
        <div className="absolute inset-4 md:inset-6 rounded-full border border-white/10" />

        <div className="absolute inset-8 md:inset-12 rounded-full border border-white/10" />

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border-4 border-white flex flex-col items-center justify-center">
          <span className="text-[8px] md:text-[10px] font-bold">
            SIENDO
          </span>

          <span className="text-[8px] md:text-[10px] font-bold">
            JOVEN
          </span>
        </div>
      </div>

      <div className="absolute -right-4 md:-right-10 top-8 md:top-10 w-20 md:w-32 h-1 bg-gray-300 rotate-[-20deg]" />
    </div>
  );
}