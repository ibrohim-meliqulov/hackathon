import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import AuthModal from "./components/AuthModal";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const logoutHandler = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("token")
  }

  if (isAuthenticated || localStorage.getItem("token")) {
    return <Dashboard onLogout={logoutHandler} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar onAuthClick={() => setIsAuthOpen(true)} />

      <main>
        <Hero />

        <Problem />

        {/* Market Stats Section from Slide 4 */}
        <section className="py-20 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">3.5M</div>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Fermerlar</p>
                <p className="text-sm text-muted-foreground/60 mt-2">O'zbekistonda faol ishlayotgan dehqonlar</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">65%</div>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Smartfonlar</p>
                <p className="text-sm text-muted-foreground/60 mt-2">Fermerlar orasida zamonaviy smartfonlar ulushi</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$7B</div>
                <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Bozor hajmi</p>
                <p className="text-sm text-muted-foreground/60 mt-2">Qishloq xo'jaligi bozorining umumiy hajmi</p>
              </div>
            </div>
          </div>
        </section>

        <Features />

        <Pricing />

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-20">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent rounded-full blur-[100px]" />
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl lg:text-6xl font-bold text-primary-foreground mb-8">
                  O'z hosilingizni bugun <br /> himoya qilishni boshlang
                </h2>
                <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto">
                  AgroScan - O'zbekiston qishloq xo'jaligining kelajagi. Har bir fermer uchun aqlli yordamchi, har bir hosil uchun muvaffaqiyat.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setIsAuthOpen(true)}
                  className="rounded-full px-10 h-16 text-xl font-bold"
                >
                  Hoziroq boshlash
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => setIsAuthenticated(true)}
      />

      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                  <Leaf className="text-primary-foreground" size={14} />
                </div>
                <span className="text-lg font-bold tracking-tighter">AgroScan</span>
              </div>
              <p className="text-muted-foreground max-w-xs leading-relaxed">
                O'simlik kasalliklarini AI yordamida aniqlash va davolash bo'yicha maslahatlar beruvchi platforma.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Aloqa</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>agroscan.uz</li>
                <li>info@agroscan.uz</li>
                <li>+998 ## ### ## ##</li>
                <li>Surxandaryo, O'zbekiston</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Ijtimoiy tarmoqlar</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Telegram</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-50">
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Maxfiylik siyosati</a>
              <a href="#" className="hover:text-primary transition-colors">Foydalanish shartlari</a>
            </div>

            <p className="text-sm text-muted-foreground/60">
              © 2026 AgroScan. Barcha huquqlar himoyalangan.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
