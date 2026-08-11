import { useEffect, useState } from 'react';

interface Props {
  show: boolean;
  onComplete: () => void;
}

const CELEBRATIONS = [
  { emoji: '🎉', text: '¡Eso es!' },
  { emoji: '💕', text: '¡Qué lindo!' },
  { emoji: '🔥', text: '¡Fuego!' },
  { emoji: '⚡', text: '¡Tremendo!' },
  { emoji: '💪', text: '¡Genios!' },
  { emoji: '😍', text: '¡Hermoso!' },
  { emoji: '🥰', text: '¡Amor puro!' },
  { emoji: '✨', text: '¡Brillan!' },
];

export function Celebration({ show, onComplete }: Props) {
  const [visible, setVisible] = useState(false);
  const [celebration, setCelebration] = useState(CELEBRATIONS[0]);

  useEffect(() => {
    if (show) {
      setCelebration(CELEBRATIONS[Math.floor(Math.random() * CELEBRATIONS.length)]);
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0F0F1E]/80 backdrop-blur-sm">
      <div className="animate-bounce text-8xl mb-6">{celebration.emoji}</div>
      <p className="text-3xl font-extrabold text-[#FF6B6B]">{celebration.text}</p>
    </div>
  );
}
