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

export const GAMES: Game[] = [
  // ============ PREGUNTAS ============
  {
    id: 'q1',
    category: 'preguntas',
    title: 'Momentos memorables',
    emoji: '💫',
    intensities: {
      suave: '¿Cuál fue nuestro mejor momento juntos?',
      medio: '¿En qué momento me quisiste más que ahora?',
      intenso: '¿Cuál es la fantasía que te avergüenza admitir?',
    },
    tags: ['conexión', 'nostalgia'],
  },
  {
    id: 'q2',
    category: 'preguntas',
    title: 'Primera impresión',
    emoji: '✨',
    intensities: {
      suave: '¿Qué me hizo enamorarte la primera vez?',
      medio: '¿Cuándo decidiste que yo era "la indicada"?',
      intenso: '¿Qué fantasía real nunca te animaste a compartir?',
    },
    tags: ['romance', 'vulnerabilidad'],
  },
  {
    id: 'q3',
    category: 'preguntas',
    title: 'Sueños compartidos',
    emoji: '🌙',
    intensities: {
      suave: 'Si tuvieras una semana sola conmigo, ¿qué haríamos?',
      medio: '¿Qué nos falta probar juntos?',
      intenso: '¿Qué te gustaría que intentemos en la intimidad?',
    },
    tags: ['futuro', 'deseo'],
  },
  {
    id: 'q4',
    category: 'preguntas',
    title: 'Conexión profunda',
    emoji: '💖',
    intensities: {
      suave: '¿Cuándo te sentiste más segura conmigo?',
      medio: '¿Qué te cuesta decirme y quisieras poder decir?',
      intenso: '¿Hay algo que quisieras que hiciera diferente?',
    },
    tags: ['intimidad', 'confianza'],
  },
  {
    id: 'q5',
    category: 'preguntas',
    title: 'Atracción hoy',
    emoji: '🔥',
    intensities: {
      suave: '¿Qué me haces que nadie más te hace sentir?',
      medio: '¿Cuándo fue la última vez que te sentiste realmente deseada?',
      intenso: '¿Cuándo fue la última vez que te sentiste realmente sexy?',
    },
    tags: ['deseo', 'presente'],
  },

  // ============ RETOS FÍSICOS ============
  {
    id: 'r1',
    category: 'retos',
    title: 'Beso infinito',
    emoji: '💋',
    intensities: {
      suave: 'Beso largo sin interrupciones (3 min)',
      medio: 'Beso de 5 minutos en el balcón o ventana',
      intenso: 'Beso apasionado sin parar durante 10 min',
    },
    duration: 'variable',
    tags: ['físico', 'contacto'],
  },
  {
    id: 'r2',
    category: 'retos',
    title: 'Masaje sensual',
    emoji: '🧖',
    intensities: {
      suave: 'Masaje de hombros y espalda (5 min)',
      medio: 'Masaje sensual de cuerpo completo con música (10 min)',
      intenso: 'Masaje íntimo sin restricciones (indefinido)',
    },
    duration: '5-10 min',
    tags: ['contacto', 'relajación'],
  },
  {
    id: 'r3',
    category: 'retos',
    title: 'Contacto sin hablar',
    emoji: '🤫',
    intensities: {
      suave: 'Mirarse a los ojos sin hablar (2 min)',
      medio: 'Abrazarse en silencio (5 min)',
      intenso: 'Exploración silenciosa (10 min)',
    },
    duration: '2-10 min',
    tags: ['conexión', 'silencio'],
  },
  {
    id: 'r4',
    category: 'retos',
    title: 'Baile juntos',
    emoji: '💃',
    intensities: {
      suave: 'Bailar lentamente a una canción favorita',
      medio: 'Baile íntimo con movimiento sensual',
      intenso: 'Baile sin ropa (en privado)',
    },
    duration: '3-5 min',
    tags: ['movimiento', 'música'],
  },
  {
    id: 'r5',
    category: 'retos',
    title: 'Sorpresa de ducha',
    emoji: '🚿',
    intensities: {
      suave: 'Ducha juntos sin más',
      medio: 'Ducha juntos con masaje',
      intenso: 'Ducha juntos sin restricciones',
    },
    duration: '10-15 min',
    tags: ['físico', 'agua'],
  },
  {
    id: 'r6',
    category: 'retos',
    title: 'Foto de nosotros',
    emoji: '📸',
    intensities: {
      suave: 'Selfie juntos (ropa normal)',
      medio: 'Foto juntos semi-desnudos (íntima pero no explícita)',
      intenso: 'Foto osada que solo ustedes verán',
    },
    duration: '5 min',
    tags: ['validación', 'recuerdo'],
  },

  // ============ ROLEPLAY ============
  {
    id: 'rp1',
    category: 'roleplay',
    title: 'Desconocidos en un bar',
    emoji: '🍹',
    intensities: {
      suave: 'Se conocen en una fiesta, inicien conversación como si fuera primera vez',
      medio: 'Desconocidos que se atraen, ligar descaradamente',
      intenso: 'Encuentro apasionado que escala',
    },
    tags: ['fantasía', 'encuentro'],
  },
  {
    id: 'rp2',
    category: 'roleplay',
    title: 'Primera cita de nuevo',
    emoji: '🌹',
    intensities: {
      suave: 'Actúen que es la primera cita, descubrirse de nuevo',
      medio: 'Primera cita con química evidente',
      intenso: 'Primera cita que termina en pasión',
    },
    tags: ['nostalgia', 'conexión'],
  },
  {
    id: 'rp3',
    category: 'roleplay',
    title: 'Personajes de película',
    emoji: '🎬',
    intensities: {
      suave: 'Elijan dos personajes que les gusten, improvisen una escena',
      medio: 'Personajes con química evidente (ej. Han Solo & Leia)',
      intenso: 'Personajes en una escena romántica o sensual',
    },
    tags: ['creatividad', 'diversión'],
  },
  {
    id: 'rp4',
    category: 'roleplay',
    title: 'Profesiones atrayentes',
    emoji: '👨‍⚖️',
    intensities: {
      suave: 'Elige una profesión y el otro la admira (piloto, chef, abogada)',
      medio: 'Dinámicas de poder leve (jefe/empleado, profesor/alumno)',
      intenso: 'Dinámicas atrevidas que acuerdan ambos',
    },
    tags: ['fantasía', 'poder'],
  },

  // ============ SORPRESAS ============
  {
    id: 's1',
    category: 'sorpresas',
    title: 'Sorpresa random',
    emoji: '🎲',
    intensities: {
      suave: 'Hablá durante 10 min sobre tu fantasía más inocente',
      medio: 'Hablá durante 15 min sobre algo que nunca compartiste',
      intenso: 'Hablá sin restricciones sobre lo que deseas',
    },
    tags: ['impredecible', 'conversación'],
  },
  {
    id: 's2',
    category: 'sorpresas',
    title: 'Combinación loca',
    emoji: '⚡',
    intensities: {
      suave: 'Elijan: actividad (conversa/baila/masajea) + lugar (cama/sofá/cocina)',
      medio: 'Actividad + lugar + duración (5/10/30 min)',
      intenso: 'Actividad + lugar + duración + restricción (sin hablar, sin ropa, etc)',
    },
    tags: ['aleatoriedad', 'aventura'],
  },
];

export function getRandomGame(excludeIds: string[] = []): Game {
  const available = GAMES.filter(g => !excludeIds.includes(g.id));
  return available[Math.floor(Math.random() * available.length)];
}

export function getCategories(): GameCategory[] {
  return ['preguntas', 'retos', 'roleplay', 'sorpresas'];
}

export function getGamesByCategory(category: GameCategory): Game[] {
  return GAMES.filter(g => g.category === category);
}
