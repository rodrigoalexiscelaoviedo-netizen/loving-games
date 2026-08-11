import { useNavigate } from '@tanstack/react-router';

export function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-dark text-light p-4">
      <button
        onClick={() => navigate({ to: '/' })}
        className="mb-6 text-light/60 hover:text-light"
      >
        ← Volver
      </button>

      <h1 className="text-3xl font-bold text-coral mb-6">Ajustes</h1>

      <div className="space-y-4">
        <div className="bg-mid p-4 rounded-lg">
          <p className="text-sm text-light/60">Jugadores</p>
          <p className="text-lg font-semibold text-coral">Rodrigo & Nadia</p>
        </div>

        <div className="bg-mid p-4 rounded-lg">
          <p className="text-sm text-light/60">Versión</p>
          <p className="text-lg font-semibold text-light">1.0.0</p>
        </div>
      </div>
    </div>
  );
}
