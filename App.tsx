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

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 flex flex-col transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/education" element={<Education />} />
              <Route path="/research" element={<Research />} />
              <Route path="/competitions" element={<Competitions />} />
              <Route path="/travel" element={<Travel />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;