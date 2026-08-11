import { useEffect, useState } from 'react';

interface CelebrationProps {
  show: boolean;
  onComplete?: () => void;
}

export function Celebration({ show, onComplete }: CelebrationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  const celebrations = [
    { emoji: '🎉', text: '¡Eso es!' },
    { emoji: '💕', text: '¡Qué lindo!' },
    { emoji: '🔥', text: '¡Adelante!' },
    { emoji: '⚡', text: '¡Bravo!' },
    { emoji: '💪', text: '¡Sí!' },
  ];

  const random = celebrations[Math.floor(Math.random() * celebrations.length)];

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
      <div className="animate-bounce text-7xl">
        {random.emoji}
      </div>
      <p className="absolute bottom-1/3 text-2xl font-bold text-coral">
        {random.text}
      </p>
    </div>
  );
}
