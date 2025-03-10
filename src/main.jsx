import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes.jsx';
import './index.css';

// Dark Mode Setup
const initializeDarkMode = () => {
  // Check localStorage or system preference
  let darkModeEnabled;
  
  if (localStorage.getItem('darkMode') !== null) {
    darkModeEnabled = localStorage.getItem('darkMode') === 'true';
  } else {
    // Check system preference
    darkModeEnabled = window.matchMedia('(prefers-color-scheme: dark)').matches;
    localStorage.setItem('darkMode', darkModeEnabled);
  }
  
  // Apply dark mode class if enabled
  if (darkModeEnabled) {
    document.documentElement.classList.add('dark');
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (localStorage.getItem('darkMode') === null) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    }
  });
};

// Initialize dark mode
initializeDarkMode();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)