import { motion } from 'motion/react';
import { Zap, Cpu, Shield, BarChart, Users, Globe } from 'lucide-react';

export default function Features() {
  const features = [
    { title: 'Foto diagnostika', desc: 'Kasallikli o\'simlikning fotosuratini oling va 3 soniyada natijani oling.', icon: Zap, color: 'text-yellow-500' },
    { title: 'AI tahlil', desc: 'Deep learning texnologiyasi bilan 150+ kasallikni aniqlaydi.', icon: Cpu, color: 'text-blue-500' },
    { title: 'Davolash maslahatlari', desc: 'Har bir kasallik uchun aniq tavsiyalar va zararli moddalar ro\'yxati.', icon: Shield, color: 'text-green-500' },
    { title: 'Qo\'llab-quvvatlash', desc: 'Davolash jarayonini kuzatish va vaqtida eslatmalar.', icon: BarChart, color: 'text-purple-500' },
    { title: '92% aniqlik', desc: '10,000+ fotosuratga asoslanib o\'rgatilgan yuqori aniqlikdagi model.', icon: Users, color: 'text-orange-500' },
    { title: 'O\'zbek tilida', desc: 'Barcha fermerlar uchun tushunarli va qulay interfeys.', icon: Globe, color: 'text-red-500' },
  ];

  return (
    <section id="yechim" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">AgroScan - Cho'ntak Agronomi</h2>
          <p className="text-lg text-gray-500">AI texnologiyasini qo'llab, o'simlik kasalliklarini fotosuratga asoslanib tez va aniq diagnostika qiladi.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <f.icon className={cn("w-6 h-6", f.color)} />
              </div>
              <h3 className="text-xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { cn } from '../lib/utils';
