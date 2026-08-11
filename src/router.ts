import { RootRoute, Route, Router } from '@tanstack/react-router';
import { Outlet } from '@tanstack/react-router';
import { Home } from './pages/Home';
import { GameScreen } from './pages/GameScreen';
import { History } from './pages/History';
import { Settings } from './pages/Settings';

const rootRoute = new RootRoute({
  component: function RootLayout() {
    return (
      <div className="bg-dark min-h-screen">
        <div className="max-w-2xl mx-auto">
          <Outlet />
        </div>
      </div>
    );
  },
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const gameRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/game',
  component: GameScreen,
});

const historyRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/history',
  component: History,
});

const settingsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  gameRoute,
  historyRoute,
  settingsRoute,
]);

export const router = new Router({ routeTree });
