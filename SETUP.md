# Couple Games App - Setup Guide

## ✅ Instalación completada

La app está completamente funcional. El MVP incluye:

- **Home**: Interfaz principal con juegos por categoría
- **GameScreen**: Pantalla de juego con selector de intensidad
- **Historial**: Log de juegos completados (requiere Supabase)
- **Ajustes**: Pantalla de información
- **Router**: Navegación completa con TanStack Router
- **UI**: Diseño con Tailwind CSS v4

## 🔧 Próximo paso: Configurar Supabase

Para activar el historial y guardado de juegos:

### 1. Crear proyecto en Supabase

1. Ve a https://supabase.com
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia estas credenciales:
   - **Project URL**: `https://[PROJECT_ID].supabase.co`
   - **Anon Key**: (visible en Settings > API)

### 2. Configurar base de datos

Ejecuta este SQL en Supabase (SQL Editor):

```sql
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id TEXT NOT NULL,
  game_category TEXT NOT NULL,
  intensity TEXT NOT NULL,
  game_title TEXT,
  completed BOOLEAN DEFAULT FALSE,
  skipped BOOLEAN DEFAULT FALSE,
  notes TEXT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE game_sessions DISABLE ROW LEVEL SECURITY;
```

### 3. Actualizar `.env.local`

Abre `couple-games/.env.local` y reemplaza:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

Con tus credenciales reales de Supabase.

### 4. Reiniciar servidor

```bash
npm run dev
```

## 🎮 Usar la app

1. **Jugar ahora**: Click en 🎲 para un juego random
2. **Por categoría**: Selecciona Preguntas, Retos, Roleplay o Sorpresas
3. **Seleccionar intensidad**: Suave, Medio, Intenso
4. **Completar**: "Listo, lo hicimos" → Celebración → Historial
5. **Ver historial**: Click en 📜 Historial

## 📝 Agregar más juegos

Edita `src/games/gameDatabase.ts`:

```typescript
{
  id: 'nuevo1',
  category: 'preguntas', // preguntas | retos | roleplay | sorpresas
  title: 'Tu pregunta',
  emoji: '💭',
  intensities: {
    suave: 'Pregunta suave...',
    medio: 'Pregunta media...',
    intenso: 'Pregunta intensa...',
  },
  tags: ['tag1', 'tag2'],
}
```

## 🛠️ Stack técnico

- **React 18** + TypeScript
- **Vite** - build tool
- **TanStack Router** - routing
- **Tailwind CSS v4** - styling
- **Zustand** - estado (store)
- **Supabase** - backend opcional

## 📂 Estructura

```
src/
├── components/      # Componentes reutilizables
├── games/          # Base de datos de juegos
├── lib/            # Supabase + helpers
├── pages/          # Páginas principales
├── store/          # Zustand store
├── main.tsx        # Entry point
├── router.tsx      # Rutas
└── index.css       # Estilos globales
```

## 🚀 Deploy

Cuando esté listo, puedes deployar a:

- **Vercel**: `npm run build` → subir a Vercel
- **Netlify**: `npm run build` → subir a Netlify
- **GitHub Pages**: Requiere config adicional

## ⚠️ Notas importantes

- **Sin autenticación**: Local-first, solo para ustedes dos
- **Sin sincronización**: Cada dispositivo guarda en su propio Supabase (opcional)
- **Offline-first**: Funciona sin conexión (UI completa)
- **Supabase opcional**: Si no configuras credenciales, todo funciona excepto historial

## 🎨 Personalización

Colores en `tailwind.config.js`:

```javascript
coral: "#FF6B6B",    // Rojo/Coral
mint: "#00D4AA",     // Verde menta
gold: "#FFD700",     // Dorado
dark: "#0F0F1E",     // Fondo oscuro
```

## ❓ Troubleshooting

**"Failed to load resource 500"**
- Verifica que Supabase está configurado o comenta `saveGameSession()`

**Intensidad no muestra contenido**
- Verifica que el juego tiene `intensities.medio` o `intensities.intenso`

**No navega después de completar**
- Abre consola del navegador (F12) y busca errores

---

¡A disfrutar los juegos! 🎉
