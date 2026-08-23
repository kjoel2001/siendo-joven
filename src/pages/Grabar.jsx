import { useEffect, useRef, useState } from "react";
import {
  Check,
  Mic,
  Play,
  Radio,
  Square,
  Trash2,
  Users,
  X,
} from "lucide-react";

const STORAGE_KEY = "siendo-joven:grabaciones";
const DURACION_MAXIMA = 90 * 60; // 90 minutos, igual que en el mockup

function formatTiempo(segundos) {
  const m = Math.floor(segundos / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(segundos % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function cargarGrabaciones() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function guardarEnStorage(grabaciones) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grabaciones));
  } catch {
    // si se llena el almacenamiento local, seguimos sin romper la UI
  }
}

export default function Grabar() {
  // 'menu' | 'grabando' | 'revisar'
  const [vista, setVista] = useState("menu");
  const [grabaciones, setGrabaciones] = useState(() => cargarGrabaciones());

  const [titulo, setTitulo] = useState("");
  const [segundos, setSegundos] = useState(0);
  const [barras, setBarras] = useState(Array(12).fill(4));
  const [error, setError] = useState("");

  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewBlob, setPreviewBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const nivelesIntervalRef = useRef(null);

  function limpiarRecursos() {
    clearInterval(timerRef.current);
    clearInterval(nivelesIntervalRef.current);

    streamRef.current?.getTracks().forEach((t) => t.stop());
    audioCtxRef.current?.close?.();

    streamRef.current = null;
    audioCtxRef.current = null;
    analyserRef.current = null;
  }

  useEffect(() => {
    return () => limpiarRecursos();
  }, []);

  const iniciarGrabacion = async () => {
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });

        setPreviewBlob(blob);
        setPreviewUrl(URL.createObjectURL(blob));
        setVista("revisar");
      };

      recorder.start();

      setSegundos(0);
      setVista("grabando");

      timerRef.current = setInterval(() => {
        setSegundos((prev) => {
          if (prev + 1 >= DURACION_MAXIMA) {
            detenerGrabacion();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      // análisis de audio para las barras estilo ecualizador
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      const datos = new Uint8Array(analyser.frequencyBinCount);

      nivelesIntervalRef.current = setInterval(() => {
        analyser.getByteFrequencyData(datos);

        const grupos = 12;
        const tamanoGrupo = Math.floor(datos.length / grupos);

        const nuevasBarras = Array.from({ length: grupos }, (_, i) => {
          const inicio = i * tamanoGrupo;
          const slice = datos.slice(inicio, inicio + tamanoGrupo);
          const promedio =
            slice.reduce((a, b) => a + b, 0) / (slice.length || 1);

          return Math.max(4, Math.round((promedio / 255) * 40));
        });

        setBarras(nuevasBarras);
      }, 100);
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo acceder al micrófono. Revisa los permisos del navegador."
      );
    }
  };

  const detenerGrabacion = () => {
    mediaRecorderRef.current?.stop();
    limpiarRecursos();
  };

  const descartarYRegrabar = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewBlob(null);
    iniciarGrabacion();
  };

  const cancelarTodo = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setPreviewBlob(null);
    setTitulo("");
    setSegundos(0);
    setVista("menu");
  };

  const guardarGrabacion = () => {
    if (!previewBlob) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const nueva = {
        id: Date.now(),
        titulo: titulo.trim() || "Grabación sin título",
        duracion: segundos,
        fecha: new Date().toISOString(),
        dataUrl: reader.result,
      };

      const actualizadas = [nueva, ...grabaciones];
      setGrabaciones(actualizadas);
      guardarEnStorage(actualizadas);

      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
      setPreviewBlob(null);
      setTitulo("");
      setSegundos(0);
      setVista("menu");
    };

    reader.readAsDataURL(previewBlob);
  };

  const eliminarGrabacion = (id) => {
    const actualizadas = grabaciones.filter((g) => g.id !== id);
    setGrabaciones(actualizadas);
    guardarEnStorage(actualizadas);
  };

  // ---------- vista: menú ----------
  if (vista === "menu") {
    return (
      <div className="min-h-screen bg-black text-white pb-28 px-4 md:px-8 pt-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-xl font-bold mb-1">Crear contenido</h1>
          <p className="text-slate-400 text-sm mb-6">
            Graba tu propio episodio y compártelo con la comunidad.
          </p>

          <div className="space-y-3">
            <button
              onClick={iniciarGrabacion}
              className="w-full flex items-center gap-4 bg-purple-600 hover:bg-purple-700 transition rounded-2xl p-4 text-left"
            >
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Mic className="w-5 h-5" />
              </div>

              <div>
                <p className="font-semibold">Grabación individual</p>
                <p className="text-xs text-white/70">
                  Graba tu voz directamente desde el navegador
                </p>
              </div>
            </button>

            <div className="w-full flex items-center gap-4 bg-slate-900/60 border border-white/5 rounded-2xl p-4 opacity-60">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>

              <div>
                <p className="font-semibold">Grabación en grupo</p>
                <p className="text-xs text-slate-400">Próximamente</p>
              </div>
            </div>

            <div className="w-full flex items-center gap-4 bg-slate-900/60 border border-white/5 rounded-2xl p-4 opacity-60">
              <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <Radio className="w-5 h-5" />
              </div>

              <div>
                <p className="font-semibold">Transmisión en vivo</p>
                <p className="text-xs text-slate-400">Próximamente</p>
              </div>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm mt-4">{error}</p>
          )}

          {grabaciones.length > 0 && (
            <section className="mt-10">
              <h2 className="font-semibold text-lg mb-3">
                Mis grabaciones
              </h2>

              <div className="space-y-3">
                {grabaciones.map((g) => (
                  <div
                    key={g.id}
                    className="bg-slate-900/60 border border-white/5 rounded-xl p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">
                          {g.titulo}
                        </p>
                        <p className="text-xs text-slate-400">
                          {formatTiempo(g.duracion)} ·{" "}
                          {new Date(g.fecha).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => eliminarGrabacion(g.id)}
                        aria-label="Eliminar grabación"
                        className="w-8 h-8 shrink-0 rounded-full bg-slate-800 hover:bg-red-600/80 flex items-center justify-center transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <audio
                      controls
                      src={g.dataUrl}
                      className="w-full mt-2 h-8"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  }

  // ---------- vista: grabando ----------
  if (vista === "grabando") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col px-4 md:px-8 pt-8 pb-28">
        <div className="max-w-md w-full mx-auto flex flex-col items-center text-center flex-1">
          <button
            onClick={cancelarTodo}
            aria-label="Cancelar"
            className="self-start w-9 h-9 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center mb-6"
          >
            <X className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Nombra tu grabación"
            className="w-full bg-transparent text-center text-lg font-semibold placeholder:text-slate-500 outline-none border-b border-white/10 pb-2 mb-8"
          />

          <p className="text-4xl font-bold tabular-nums">
            {formatTiempo(segundos)}
          </p>

          <p className="text-slate-500 text-xs mt-1">
            Máximo 90 minutos
          </p>

          <div className="flex items-end gap-1.5 h-16 my-10">
            {barras.map((altura, i) => (
              <div
                key={i}
                style={{ height: `${altura}px` }}
                className="w-2 rounded-full bg-purple-500 transition-all duration-100"
              />
            ))}
          </div>

          <button
            onClick={detenerGrabacion}
            aria-label="Detener grabación"
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center shadow-lg transition"
          >
            <Square className="w-6 h-6 fill-white" />
          </button>

          <p className="text-slate-500 text-xs mt-6 max-w-xs">
            Usa audífonos con micrófono para una mejor calidad de audio
          </p>
        </div>
      </div>
    );
  }

  // ---------- vista: revisar ----------
  return (
    <div className="min-h-screen bg-black text-white flex flex-col px-4 md:px-8 pt-8 pb-28">
      <div className="max-w-md w-full mx-auto flex flex-col flex-1">
        <h1 className="text-xl font-bold mb-1">Revisa tu grabación</h1>
        <p className="text-slate-400 text-sm mb-6">
          Duración: {formatTiempo(segundos)}
        </p>

        <label className="block text-xs text-slate-400 mb-1">
          Título del episodio
        </label>

        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ej. Cómo manejar el estrés antes de un examen"
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500 mb-6"
        />

        {previewUrl && (
          <audio controls src={previewUrl} className="w-full mb-8" />
        )}

        <div className="mt-auto space-y-3">
          <button
            onClick={guardarGrabacion}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition rounded-xl py-3 font-semibold"
          >
            <Check className="w-4 h-4" />
            Guardar grabación
          </button>

          <button
            onClick={descartarYRegrabar}
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 transition rounded-xl py-3 text-sm font-semibold"
          >
            <Mic className="w-4 h-4" />
            Descartar y grabar de nuevo
          </button>

          <button
            onClick={cancelarTodo}
            className="w-full flex items-center justify-center gap-1 text-slate-400 hover:text-slate-200 text-sm py-2"
          >
            <Play className="w-3.5 h-3.5 rotate-180" />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
