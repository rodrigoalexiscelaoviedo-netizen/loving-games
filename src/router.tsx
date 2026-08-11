import { Outlet, RootRoute, Route, Router } from '@tanstack/react-router';
import { Home } from './pages/Home';
import { GameScreen } from './pages/GameScreen';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

const rootRoute = new RootRoute({
  component: () => (
    <div className="bg-[#0F0F1E] min-h-screen min-h-[100dvh]">
      <Outlet />
    </div>
  ),
});

const homeRoute = new Route({ getParentRoute: () => rootRoute, path: '/', component: Home });
const gameRoute = new Route({ getParentRoute: () => rootRoute, path: '/game', component: GameScreen });
const historyRoute = new Route({ getParentRoute: () => rootRoute, path: '/history', component: History });
const settingsRoute = new Route({ getParentRoute: () => rootRoute, path: '/settings', component: Settings });

export const routeTree = rootRoute.addChildren([homeRoute, gameRoute, historyRoute, settingsRoute]);
export const router = new Router({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
