import { Mic } from "lucide-react";

export default function Grabar() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center pb-24">
      <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mb-4">
        <Mic className="w-7 h-7" />
      </div>

      <h1 className="text-xl font-bold">
        La grabación llega pronto
      </h1>

      <p className="text-slate-400 text-sm mt-2 max-w-xs">
        Aquí vas a poder grabar tu propio podcast, en grupo o en
        vivo. Todavía la estamos construyendo.
      </p>
    </div>
  );
}
