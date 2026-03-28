import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Research } from './components/Research';
import { Competitions } from './components/Competitions';
import { Travel } from './components/Travel';
import { Footer } from './components/Footer';
import { useImagePreloadQueue } from './hooks/useImagePreloadQueue';
import { getModuleCoverUrls } from './content/media';

function App() {
  useImagePreloadQueue(getModuleCoverUrls('travel', 'md'), 4);

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen font-sans transition-colors duration-300">
          <div className="fixed inset-0 pointer-events-none ui-page-bg" />
          <Navbar />
          <main className="flex-grow relative">
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/education" element={<Education />} />
                <Route path="/research" element={<Research />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/travel" element={<Travel />} />
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
