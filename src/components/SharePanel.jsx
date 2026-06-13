import { Share2, Copy } from "lucide-react";

export default function SharePanel({
  shareOpen,
  setShareOpen,
}) {
  if (!shareOpen) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(
      window.location.href
    );

    alert("Enlace copiado");
  };

  const shareContent = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Siendo Joven",
          text: "Escucha este podcast",
          url: window.location.href,
        });
      } else {
        copyLink();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="hidden lg:flex fixed right-0 top-0 h-screen w-96 bg-slate-900 border-l border-slate-800 z-50 flex-col">

        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 className="font-bold text-xl text-white">
            Compartir
          </h2>

          <button
            onClick={() => setShareOpen(false)}
            className="text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-4">

          <button
            onClick={shareContent}
            className="w-full bg-slate-800 rounded-xl p-4 flex items-center gap-4 text-white"
          >
            <Share2 size={24} />
            Compartir
          </button>

          <button
            onClick={copyLink}
            className="w-full bg-purple-600 rounded-xl p-4 flex items-center gap-4 text-white"
          >
            <Copy size={24} />
            Copiar enlace
          </button>

        </div>

      </div>

      <div className="lg:hidden fixed inset-0 z-50">

        <div
          onClick={() => setShareOpen(false)}
          className="absolute inset-0 bg-black/60"
        />

        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-slate-900 rounded-t-3xl">

          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h2 className="font-bold text-xl text-white">
              Compartir
            </h2>

            <button
              onClick={() => setShareOpen(false)}
              className="text-white text-xl"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-4">

            <button
              onClick={shareContent}
              className="w-full bg-slate-800 rounded-xl p-4 text-white"
            >
              Compartir con aplicaciones
            </button>

            <button
              onClick={copyLink}
              className="w-full bg-purple-600 rounded-xl p-4 text-white"
            >
              Copiar enlace
            </button>

          </div>

        </div>

      </div>
    </>
  );
}