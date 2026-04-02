import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Stats from './components/Stats';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { expandTelegramApp } from './lib/telegram';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    expandTelegramApp();
    const userData = sessionStorage.getItem('agro_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('agro_user');
    sessionStorage.removeItem('agro_token');
  };

  if (user) {
    return (
      <>
        <Dashboard user={user} onLogout={handleLogout} />
        <ToastContainer position="bottom-right" theme="colored" aria-label="Notifications" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setIsAuthModalOpen(true)} />
      <main>
        <Hero />
        <Problem />
        <Stats />
        <Features />
        <Pricing />
        
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[100px]" />
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">
                  O'z hosilingizni bugun <br /> himoya qilishni boshlang
                </h2>
                <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
                  AgroScan - O'zbekiston qishloq xo'jaligining kelajagi. Har bir fermer uchun aqlli yordamchi, har bir hosil uchun muvaffaqiyat.
                </p>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-white text-primary px-10 py-6 rounded-full text-xl font-bold hover:bg-gray-50 transition-all shadow-xl"
                >
                  Hoziroq boshlash
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={(userData) => setUser(userData)}
      />
      
      <ToastContainer position="bottom-right" theme="colored" aria-label="Notifications" />
    </div>
  );
}
