export type Intensity = 'suave' | 'medio' | 'intenso';
export type GameCategory = 'preguntas' | 'retos' | 'roleplay' | 'sorpresas';

export interface Game {
  id: string;
  category: GameCategory;
  title: string;
  emoji: string;
  intensities: {
    suave: string;
    medio?: string;
    intenso?: string;
  };
  duration?: string;
  tags?: string[];
}

export const CATEGORY_INFO: Record<GameCategory, { emoji: string; label: string; description: string; color: string }> = {
  preguntas: { emoji: '💭', label: 'Preguntas', description: 'Descubranse de nuevo', color: '#A78BFA' },
  retos: { emoji: '💪', label: 'Retos', description: 'Desafíos para dos', color: '#F472B6' },
  roleplay: { emoji: '🎭', label: 'Roleplay', description: 'Jueguen a ser otros', color: '#34D399' },
  sorpresas: { emoji: '🎲', label: 'Sorpresas', description: 'Dejense llevar', color: '#FBBF24' },
};

export const GAMES: Game[] = [
  // ============ PREGUNTAS ============
  {
    id: 'q1', category: 'preguntas', title: 'Momentos memorables', emoji: '💫',
    intensities: {
      suave: '¿Cuál fue nuestro mejor momento juntos?',
      medio: '¿En qué momento me quisiste más que ahora?',
      intenso: '¿Cuál es la fantasía que te avergüenza admitir?',
    },
    tags: ['conexión', 'nostalgia'],
  },
  {
    id: 'q2', category: 'preguntas', title: 'Primera impresión', emoji: '✨',
    intensities: {
      suave: '¿Qué fue lo primero que te atrajo de mí?',
      medio: '¿Cuándo decidiste que yo era la persona indicada?',
      intenso: '¿Qué fantasía real nunca te animaste a compartir?',
    },
    tags: ['romance', 'vulnerabilidad'],
  },
  {
    id: 'q3', category: 'preguntas', title: 'Sueños compartidos', emoji: '🌙',
    intensities: {
      suave: 'Si tuvieras una semana a solas conmigo, ¿qué haríamos?',
      medio: '¿Qué nos falta probar juntos?',
      intenso: '¿Qué te gustaría que intentemos en la intimidad?',
    },
    tags: ['futuro', 'deseo'],
  },
  {
    id: 'q4', category: 'preguntas', title: 'Conexión profunda', emoji: '💖',
    intensities: {
      suave: '¿Cuándo te sentiste más segura/o conmigo?',
      medio: '¿Qué te cuesta decirme y quisieras poder decir?',
      intenso: '¿Hay algo que quisieras que hiciera diferente?',
    },
    tags: ['intimidad', 'confianza'],
  },
  {
    id: 'q5', category: 'preguntas', title: 'Atracción hoy', emoji: '🔥',
    intensities: {
      suave: '¿Qué es lo que más te gusta de nosotros hoy?',
      medio: '¿Cuándo fue la última vez que te sentiste realmente deseada/o?',
      intenso: '¿Cuándo fue la última vez que te sentiste realmente sexy?',
    },
    tags: ['deseo', 'presente'],
  },
  {
    id: 'q6', category: 'preguntas', title: 'Vulnerabilidad', emoji: '🦋',
    intensities: {
      suave: '¿Qué es lo que más te da paz de nuestra relación?',
      medio: '¿Qué miedo tenés que nunca me dijiste?',
      intenso: '¿Qué necesitás de mí que no te animás a pedir?',
    },
    tags: ['profundidad', 'confianza'],
  },
  {
    id: 'q7', category: 'preguntas', title: 'Recuerdos', emoji: '📸',
    intensities: {
      suave: '¿Cuál es tu recuerdo favorito nuestro?',
      medio: '¿Qué momento nuestro te gustaría revivir?',
      intenso: '¿Cuál fue la noche que más disfrutaste conmigo?',
    },
    tags: ['nostalgia', 'romance'],
  },

  // ============ RETOS FÍSICOS ============
  {
    id: 'r1', category: 'retos', title: 'Beso infinito', emoji: '💋',
    intensities: {
      suave: 'Beso largo sin interrupciones — 3 minutos',
      medio: 'Beso de 5 minutos en el balcón o junto a la ventana',
      intenso: 'Beso apasionado sin parar durante 10 minutos',
    },
    duration: '3-10 min', tags: ['físico', 'contacto'],
  },
  {
    id: 'r2', category: 'retos', title: 'Masaje', emoji: '🧖',
    intensities: {
      suave: 'Masaje de hombros y espalda — 5 minutos',
      medio: 'Masaje sensual de cuerpo completo con música — 10 minutos',
      intenso: 'Masaje íntimo sin restricciones — sin límite de tiempo',
    },
    duration: '5-15 min', tags: ['contacto', 'relajación'],
  },
  {
    id: 'r3', category: 'retos', title: 'Silencio compartido', emoji: '🤫',
    intensities: {
      suave: 'Mirarse a los ojos sin hablar durante 2 minutos',
      medio: 'Abrazarse en silencio total durante 5 minutos',
      intenso: 'Exploración silenciosa durante 10 minutos — solo tacto',
    },
    duration: '2-10 min', tags: ['conexión', 'silencio'],
  },
  {
    id: 'r4', category: 'retos', title: 'Baile para dos', emoji: '💃',
    intensities: {
      suave: 'Bailar lentamente juntos a una canción que les guste',
      medio: 'Baile íntimo con movimiento sensual — sin separarse',
      intenso: 'Baile sin ropa, solo ustedes y la música',
    },
    duration: '3-5 min', tags: ['movimiento', 'música'],
  },
  {
    id: 'r5', category: 'retos', title: 'Ducha juntos', emoji: '🚿',
    intensities: {
      suave: 'Ducha juntos — relajados, sin más',
      medio: 'Ducha juntos con masaje incluido',
      intenso: 'Ducha juntos sin restricciones',
    },
    duration: '10-15 min', tags: ['físico', 'agua'],
  },
  {
    id: 'r6', category: 'retos', title: 'Foto de nosotros', emoji: '📸',
    intensities: {
      suave: 'Selfie juntos haciendo algo divertido',
      medio: 'Foto íntima pero artística — solo para ustedes',
      intenso: 'Foto osada que solo ustedes verán',
    },
    duration: '5 min', tags: ['validación', 'recuerdo'],
  },
  {
    id: 'r7', category: 'retos', title: 'Playlist del momento', emoji: '🎵',
    intensities: {
      suave: 'Cada uno elige 3 canciones y arman una playlist juntos',
      medio: 'Armar una playlist para "esta noche" — sin explicar por qué',
      intenso: 'Poner la playlist y dejarse llevar por lo que sugiera',
    },
    duration: '10 min', tags: ['música', 'creatividad'],
  },

  // ============ ROLEPLAY ============
  {
    id: 'rp1', category: 'roleplay', title: 'Desconocidos en un bar', emoji: '🍹',
    intensities: {
      suave: 'Se conocen en una fiesta — inicien conversación como si fuera la primera vez',
      medio: 'Desconocidos que se atraen — ligar descaradamente',
      intenso: 'Encuentro apasionado que escala sin freno',
    },
    tags: ['fantasía', 'encuentro'],
  },
  {
    id: 'rp2', category: 'roleplay', title: 'Primera cita', emoji: '🌹',
    intensities: {
      suave: 'Actúen que es la primera cita — descubrirse de nuevo',
      medio: 'Primera cita con química evidente y tensión',
      intenso: 'Primera cita que termina en algo inolvidable',
    },
    tags: ['nostalgia', 'conexión'],
  },
  {
    id: 'rp3', category: 'roleplay', title: 'Personajes de película', emoji: '🎬',
    intensities: {
      suave: 'Elijan dos personajes que les gusten e improvisen una escena',
      medio: 'Personajes con química evidente — dejen que fluya',
      intenso: 'Personajes en una escena romántica o sensual — sin guión',
    },
    tags: ['creatividad', 'diversión'],
  },
  {
    id: 'rp4', category: 'roleplay', title: 'Profesiones', emoji: '👔',
    intensities: {
      suave: 'Uno elige una profesión, el otro la admira — piloto, chef, artista',
      medio: 'Dinámicas de poder leve — jefe y empleado, profesor y alumno',
      intenso: 'Dinámicas atrevidas que acuerden ambos',
    },
    tags: ['fantasía', 'poder'],
  },
  {
    id: 'rp5', category: 'roleplay', title: 'Vecinos nuevos', emoji: '🏠',
    intensities: {
      suave: 'Se acaban de mudar al lado — presentarse con curiosidad',
      medio: 'Vecinos que se ven por la ventana — tensión creciente',
      intenso: 'Vecinos que cruzan el límite una noche',
    },
    tags: ['fantasía', 'situación'],
  },

  // ============ SORPRESAS ============
  {
    id: 's1', category: 'sorpresas', title: 'Dado de la suerte', emoji: '🎲',
    intensities: {
      suave: 'Hablá durante 10 minutos sobre tu fantasía más inocente',
      medio: 'Hablá durante 15 minutos sobre algo que nunca compartiste',
      intenso: 'Hablá sin restricciones sobre lo que deseas — sin filtros',
    },
    tags: ['impredecible', 'conversación'],
  },
  {
    id: 's2', category: 'sorpresas', title: 'Combinación loca', emoji: '⚡',
    intensities: {
      suave: 'Elijan juntos: actividad (conversar, bailar, masajear) + lugar (cama, sofá, cocina)',
      medio: 'Actividad + lugar + duración (5, 10 o 30 minutos)',
      intenso: 'Actividad + lugar + duración + restricción (sin hablar, sin ropa, ojos cerrados)',
    },
    tags: ['aleatoriedad', 'aventura'],
  },
  {
    id: 's3', category: 'sorpresas', title: 'Misión secreta', emoji: '🕵️',
    intensities: {
      suave: 'Escribí algo lindo sobre tu pareja en un papel y escondelo para que lo encuentre mañana',
      medio: 'Mandá un mensaje sugerente durante el día — sin avisar',
      intenso: 'Prepará una sorpresa para esta noche — sin revelar qué',
    },
    tags: ['creatividad', 'anticipación'],
  },
];

export function getRandomGame(excludeIds: string[] = []): Game {
  const available = GAMES.filter(g => !excludeIds.includes(g.id));
  if (available.length === 0) return GAMES[Math.floor(Math.random() * GAMES.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export function getGamesByCategory(category: GameCategory): Game[] {
  return GAMES.filter(g => g.category === category);
}

export function getRandomGameByCategory(category: GameCategory, excludeIds: string[] = []): Game {
  const games = getGamesByCategory(category).filter(g => !excludeIds.includes(g.id));
  if (games.length === 0) return getGamesByCategory(category)[0];
  return games[Math.floor(Math.random() * games.length)];
}
