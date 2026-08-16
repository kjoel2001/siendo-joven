export default function TopicChips({ topics, selected, onSelect }) {
  return (
    <div className="absolute top-20 md:top-24 left-0 right-0 z-20 px-4 md:px-8">
      <div className="max-w-5xl mx-auto overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 w-max">
          {topics.map((topic) => {
            const isActive = topic === selected;

            return (
              <button
                key={topic}
                onClick={() => onSelect(topic)}
                className={`
                  shrink-0 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium
                  border transition
                  ${
                    isActive
                      ? "bg-white text-black border-white"
                      : "bg-white/5 text-slate-200 border-white/15 hover:bg-white/10"
                  }
                `}
              >
                {topic}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
