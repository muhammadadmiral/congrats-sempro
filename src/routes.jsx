import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/layout/RootLayout';
import ErrorPage from './components/shared/ErrorPage';

// Pages
import Home from './components/pages/home';
import Gallery from './components/pages/gallery';
import Timeline from './components/pages/timeline';
import Congratulations from './components/pages/congratulations';

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