import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

function App() {
  useEffect(() => {
    // Set global document title
    document.title = 'Congratulations Nur Fadiyah Azzizah';
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;