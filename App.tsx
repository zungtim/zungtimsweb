import React, { useEffect } from 'react';
import { Routes, Route, HashRouter, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Background } from './components/Background';
import { Research } from './components/Research';
import { Travel } from './components/Travel';
import { Footer } from './components/Footer';
import { usePageMotion } from './hooks/usePageMotion';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  usePageMotion(location.pathname);

  return null;
};

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col font-sans">
          <button type="button" className="skip-link ui-focus-ring" onClick={() => document.getElementById('main-content')?.focus()}>跳至正文</button>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="flex-grow relative">
            <div className="relative">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/background" element={<Background />} />
                <Route path="/education" element={<Navigate to="/background" replace />} />
                <Route path="/research" element={<Research />} />
                <Route path="/achievements" element={<Navigate to="/background" replace />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

