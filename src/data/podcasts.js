const base = import.meta.env.BASE_URL;

export const podcasts = [
  {
    id: 1,
    titulo: "Cómo afrontar la presión académica",
    descripcion:
      "Aprende técnicas para controlar el estrés y mejorar tu rendimiento académico.",
    categoria: "Educación",
    duracion: "18 min",
    likesIniciales: 380,
    comentarios: 115,
    audio:
      base + "audio/alex-morgan-neon-synthwave-drive-537447.mp3",
  },
  {
    id: 2,
    titulo: "Amistades que sí valen la pena",
    descripcion:
      "Cómo identificar amistades saludables y fortalecer tus relaciones.",
    categoria: "Amistad",
    duracion: "22 min",
    likesIniciales: 210,
    comentarios: 48,
    audio: base + "audio/aries-beats-synth-rock.mp3",
  },
  {
    id: 3,
    titulo: "¿Qué carrera debería elegir?",
    descripcion:
      "Consejos prácticos para tomar una de las decisiones más importantes de tu vida.",
    categoria: "Futuro",
    duracion: "26 min",
    likesIniciales: 156,
    comentarios: 32,
    audio: base + "audio/fsm-team-escp-neonscapes.mp3",
  },
];

export const topicGradients = {
  Educación: "from-indigo-500 to-purple-700",
  Amistad: "from-pink-500 to-rose-700",
  Futuro: "from-emerald-500 to-teal-700",
};

export function getTopics() {
  return Array.from(new Set(podcasts.map((p) => p.categoria)));
}
