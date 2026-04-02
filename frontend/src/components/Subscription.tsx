import { Check, Crown, Zap, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'react-toastify';

export default function Subscription() {
  const plans = [
    {
      name: 'Oddiy (Free)',
      price: '0',
      features: [
        'Har kuni 5 ta diagnostika',
        '100+ kasallik turlari',
        'Asosiy davolash tavsiyalari',
        'Ob-havo ma\'lumotlari'
      ],
      button: 'Joriy tarif',
      current: true,
      icon: Zap
    },
    {
      name: 'Premium',
      price: '3',
      features: [
        'Chegarasiz diagnostika',
        'Ekinlarni nazorat qilish (AI)',
        'Premium analitika va bashorat',
        'Zararli moddalar ro\'yxati',
        'Ekspert maslahatlari'
      ],
      button: 'Sotib olish',
      current: false,
      icon: Crown,
      popular: true
    }
  ];

  const handleSubscribe = (planName: string) => {
    if (planName === 'Premium') {
      toast.info("To'lov tizimi tez kunda ishga tushadi!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 font-display">Obuna va Tariflar</h1>
        <p className="text-gray-500">O'z hosilingizni AI yordamida maksimal darajada himoya qiling</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`relative p-8 rounded-[3rem] border flex flex-col ${
              plan.popular 
                ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/20 scale-105 z-10' 
                : 'bg-white border-gray-100 text-gray-900'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Star size={12} fill="currentColor" />
                ENG MASHHUR
              </div>
            )}

            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-primary/10'}`}>
                <plan.icon className={plan.popular ? 'text-white' : 'text-primary'} size={24} />
              </div>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
            </div>

            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-bold font-display">${plan.price}</span>
              <span className={plan.popular ? 'text-white/70' : 'text-gray-500'}>/oy</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex gap-3 items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.popular ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Check className={`w-3 h-3 ${plan.popular ? 'text-white' : 'text-primary'}`} />
                  </div>
                  <span className={plan.popular ? 'text-white/90' : 'text-gray-500'}>{f}</span>
                </li>
              ))}
            </ul>

            <button 
              disabled={plan.current}
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-95 ${
                plan.current
                  ? 'bg-gray-100 text-gray-400 cursor-default'
                  : plan.popular 
                    ? 'bg-white text-primary hover:bg-gray-50 shadow-lg' 
                    : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {plan.button}
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center shrink-0">
          <ShieldCheck className="text-teal-500 w-8 h-8" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-bold mb-2">Xavfsiz To'lov</h4>
          <p className="text-gray-500 text-sm">Barcha to'lovlar xalqaro xavfsizlik standartlariga muvofiq amalga oshiriladi. Istalgan vaqtda obunani bekor qilishingiz mumkin.</p>
        </div>
        <div className="flex gap-6 items-center flex-wrap justify-center md:justify-start">
          <div className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded-md font-bold text-[10px]">
            <div className="w-2 h-2 bg-white rounded-full" />
            UZCARD
          </div>
          <div className="flex items-center gap-1 bg-orange-500 text-white px-3 py-1 rounded-md font-bold text-[10px]">
            <div className="w-2 h-2 bg-white rounded-full" />
            HUMO
          </div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-70" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-70" />
        </div>
      </div>
    </div>
  );
}
