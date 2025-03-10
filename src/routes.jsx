import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './components/shared/ErrorPage';

// Pages
import Home from './pages/home';
import Achievements from './pages/achievements';
import Gallery from './pages/gallery';
import Timeline from './pages/timeline';
import Congratulations from './pages/congratulations';

// Create router with routes configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'achievements',
        element: <Achievements />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'timeline',
        element: <Timeline />,
      },
      {
        path: 'congratulations',
        element: <Congratulations />,
      }
    ],
  }
]);

export default router;