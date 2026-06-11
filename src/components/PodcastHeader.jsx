export default function PodcastHeader() {
  return (
    <div className="absolute top-4 left-0 right-0 z-20 px-4 md:px-8">

      <div className="flex items-center justify-between max-w-5xl mx-auto">

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-lg">
            🎧
          </div>

          <div>
            <h1 className="font-bold text-lg md:text-xl leading-none">
              Siendo Joven
            </h1>

            <p className="text-xs text-slate-400">
              Podcast para jóvenes
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
            🔴 EN VIVO
          </div>

          <div className="text-sm text-slate-300">
            👥 128
          </div>

        </div>

      </div>

    </div>
  );
}