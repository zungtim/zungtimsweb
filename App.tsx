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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-sans transition-colors duration-500">
          <Navbar />
          <main className="flex-grow relative">
            {/* Background decoration */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-float" />
              <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            </div>
            
            {/* Content */}
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
