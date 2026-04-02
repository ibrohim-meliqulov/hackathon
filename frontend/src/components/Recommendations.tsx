import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Info, Star, MapPin, ShoppingBag, Plus } from 'lucide-react';

interface RecommendationProps {
  region: string;
  onQuickAdd: (cropData: any) => void;
}

const topProducts = [
  {
    id: 1,
    name: "Pomidor",
    type: "Volgograd",
    demand: "Yuqori",
    profitability: "85%",
    description: "Sizning hududingizda hozirgi kunda pomidorga talab juda katta. Hosildorlik yuqori.",
    image: "https://picsum.photos/seed/tomato/400/300",
    color: "bg-red-50 text-red-600 border-red-100"
  },
  {
    id: 2,
    name: "Bodring",
    type: "Orzu",
    demand: "O'rtacha",
    profitability: "70%",
    description: "Bodring tez yetilishi bilan ajralib turadi. Bozorlarda doimiy xaridorga ega.",
    image: "https://picsum.photos/seed/cucumber/400/300",
    color: "bg-green-50 text-green-600 border-green-100"
  },
  {
    id: 3,
    name: "Sarimsoq",
    type: "Mahalliy",
    demand: "Juda yuqori",
    profitability: "95%",
    description: "Sarimsoq piyoz eksport uchun ham juda qulay. Kam xarajat, ko'p foyda.",
    image: "https://picsum.photos/seed/garlic/400/300",
    color: "bg-purple-50 text-purple-600 border-purple-100"
  },
  {
    id: 4,
    name: "Qalampir",
    type: "Achchiq",
    demand: "Yuqori",
    profitability: "80%",
    description: "Qalampir yetishtirish oson va kasalliklarga chidamli. Talab barqaror.",
    image: "https://picsum.photos/seed/pepper/400/300",
    color: "bg-orange-50 text-orange-600 border-orange-100"
  }
];

export default function Recommendations({ region, onQuickAdd }: RecommendationProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 font-display">Hududiy Tavsiyalar</h1>
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm md:text-base">{region} uchun eng mos ekinlar</span>
          </div>
        </div>
        <div className="bg-primary/10 px-4 py-2 rounded-xl flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <span className="text-primary font-bold text-sm">Bozor talabi: Yuqori</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {topProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all"
          >
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${product.color} backdrop-blur-md`}>
                  {product.demand} talab
                </span>
              </div>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold font-display">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.type} navi</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Daromadlilik</p>
                  <p className="text-xl font-bold text-primary">{product.profitability}</p>
                </div>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onQuickAdd({ name: product.name, type: product.type })}
                  className="flex-1 bg-primary text-white py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                >
                  <Plus size={18} />
                  Tezkor qo'shish
                </button>
                <button className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-gray-100 transition-all">
                  <Info size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Bozor tahlili haqida ko'proq ma'lumot kerakmi?</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Bizning AI tizimimiz har kuni O'zbekiston bo'ylab 50 dan ortiq bozorlardagi narxlarni tahlil qiladi va sizga eng foydali tavsiyalarni beradi.
            </p>
          </div>
          <button className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2 shrink-0">
            To'liq tahlilni ko'rish
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
