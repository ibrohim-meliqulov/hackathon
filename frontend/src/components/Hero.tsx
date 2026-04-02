import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI-guruhlangan platforma
            </div>
            <h1 className="text-6xl lg:text-7xl font-bold font-display leading-[0.9] mb-8">
              AgroScan: <br />
              <span className="text-primary italic">Fermerlar uchun</span> <br />
              Aqlli Yechim.
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-lg leading-relaxed">
              O'simlik kasalliklarini tez va aniq diagnostika qilish, darhol davolash maslahatlari olish uchun platforma. Har bir fermer uchun aqlli agronom.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                Boshlash
              </button>
              <button className="bg-white border border-gray-100 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                Batafsil
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 bg-primary/10 group">
              <img 
                src="https://picsum.photos/seed/tech/1200/1200" 
                alt="Technology" 
                className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <div className="glass-card p-6 rounded-2xl border-none">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Foydalanuvchilar</p>
                      <h3 className="text-3xl font-bold">12.5k+</h3>
                    </div>
                    <div className="text-green-500 font-bold text-sm flex items-center gap-1">
                      +24% <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
