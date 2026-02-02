import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Education } from './components/Education';
import { Research } from './components/Research';
import { Competitions } from './components/Competitions';
import { Travel } from './components/Travel';
import { Footer } from './components/Footer';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 flex flex-col">
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
  );
}

export default App;