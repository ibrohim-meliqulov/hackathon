import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Bepul (Free)',
      price: '0',
      features: ['Har kuni 5 ta diagnostika', '100+ kasallik turlari', 'Asosiy davolash tavsiyalari', 'O\'zbek va rus tillarida'],
      button: 'Boshlash',
      popular: false
    },
    {
      name: 'Asosiy (Starter)',
      price: '3',
      features: ['Chegarasiz diagnostika', '150+ kasallik turlari', 'Detallangan davolash rejasi', 'Zararli moddalar ro\'yxati', 'Har oy yangilanadi'],
      button: 'Sotib olish',
      popular: true
    },
    {
      name: 'Korxona (Pro)',
      price: '10',
      features: ['Barcha asosiy funksiyalar', '150+ kasallik turlari', 'Har oy 3 ta mutaxassis maslahati', 'Hisobotlar va tahlil', 'Qo\'shimcha o\'rnatish'],
      button: 'Bog\'lanish',
      popular: false
    }
  ];

  return (
    <section id="narxlar" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Biznes modeli</h2>
          <p className="text-lg text-gray-500">AgroScan freemium biznes modeliga asoslangan - asosiy funksiyalari bepul, qo'shimcha xususiyatlari uchun to'lovli.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2.5rem] border h-full flex flex-col ${
                plan.popular 
                  ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105 z-10' 
                  : 'bg-white border-gray-100 text-gray-900'
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className={plan.popular ? 'text-white/70' : 'text-gray-500'}>/oy</span>
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex gap-3 items-center text-sm">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-primary/10'}`}>
                      <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                    </div>
                    <span className={plan.popular ? 'text-white/90' : 'text-gray-500'}>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-6 rounded-2xl font-bold transition-all active:scale-95 ${
                plan.popular 
                  ? 'bg-white text-primary hover:bg-gray-50' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
