import React, { useState } from 'react';
import { TrendingUp, TrendingDown, ShoppingBag, ArrowUpRight, MapPin, BarChart3, Globe, Info, ChevronRight, Search, Plus, Star, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface MarketInsightsProps {
  region: string;
  onQuickAdd?: (cropData: any) => void;
}

const marketProducts = [
  {
    id: 1,
    name: "Pomidor",
    type: "Volgograd",
    price: "8,500",
    unit: "kg",
    trend: "up",
    change: "+12%",
    demand: "Yuqori",
    profitability: "85%",
    yield: "15-20 t/ga",
    recommended: true,
    description: "Sizning hududingizda hozirgi kunda pomidorga talab juda katta. Hosildorlik yuqori.",
    color: "border-red-200 bg-red-50/30"
  },
  {
    id: 2,
    name: "Bodring",
    type: "Orzu",
    price: "6,200",
    unit: "kg",
    trend: "down",
    change: "-5%",
    demand: "O'rtacha",
    profitability: "70%",
    yield: "12-15 t/ga",
    recommended: false,
    description: "Bodring tez yetilishi bilan ajralib turadi. Bozorlarda doimiy xaridorga ega.",
    color: "border-green-200 bg-green-50/30"
  },
  {
    id: 3,
    name: "Sarimsoq",
    type: "Mahalliy",
    price: "25,000",
    unit: "kg",
    trend: "up",
    change: "+25%",
    demand: "Juda yuqori",
    profitability: "95%",
    yield: "8-10 t/ga",
    recommended: true,
    description: "Sarimsoq piyoz eksport uchun ham juda qulay. Kam xarajat, ko'p foyda.",
    color: "border-purple-200 bg-purple-50/30"
  },
  {
    id: 4,
    name: "Qalampir",
    type: "Achchiq",
    price: "12,000",
    unit: "kg",
    trend: "up",
    change: "+8%",
    demand: "Yuqori",
    profitability: "80%",
    yield: "10-12 t/ga",
    recommended: false,
    description: "Qalampir yetishtirish oson va kasalliklarga chidamli. Talab barqaror.",
    color: "border-orange-200 bg-orange-50/30"
  },
  {
    id: 5,
    name: "Piyoz",
    type: "Ko'k",
    price: "4,500",
    unit: "kg",
    trend: "up",
    change: "+15%",
    demand: "Yuqori",
    profitability: "90%",
    yield: "25-30 t/ga",
    recommended: true,
    description: "Ko'k piyoz yil davomida talabgir. Tez hosil beradi.",
    color: "border-blue-200 bg-blue-50/30"
  },
  {
    id: 6,
    name: "Kartoshka",
    type: "Sante",
    price: "5,800",
    unit: "kg",
    trend: "down",
    change: "-2%",
    demand: "Barqaror",
    profitability: "75%",
    yield: "30-35 t/ga",
    recommended: false,
    description: "Kartoshka asosiy iste'mol mahsuloti. Doimiy bozorga ega.",
    color: "border-yellow-200 bg-yellow-50/30"
  }
];

export default function MarketInsights({ region, onQuickAdd }: MarketInsightsProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = marketProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold mb-2 font-display">Bozor Narxlari</h1>
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin size={16} className="text-primary" />
            <span className="text-sm md:text-base">{region} hududidagi joriy narxlar</span>
          </div>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Qidiruv..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Market Ribbon/List Style */}
      <div className="space-y-4">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={cn(
              "relative flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 rounded-3xl border-2 shadow-sm hover:shadow-md transition-all group overflow-hidden gap-4 md:gap-6",
              product.color
            )}
          >
            {/* Left Section: Name and Type */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Tag size={12} className="text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.type} navi</span>
                {product.recommended && (
                  <span className="bg-primary/10 text-primary text-[8px] px-2 py-0.5 rounded-full font-bold uppercase">Tavsiya</span>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-bold font-display text-gray-900 truncate">{product.name}</h3>
            </div>

            {/* Middle Section: Stats Ribbon */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 w-full md:w-auto">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Talab</span>
                <span className={cn(
                  "text-xs font-bold",
                  product.demand === 'Yuqori' || product.demand === 'Juda yuqori' ? "text-blue-600" : "text-gray-600"
                )}>
                  {product.demand}
                </span>
              </div>
              
              <div className="w-px h-8 bg-gray-200 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">O'zgarish</span>
                <div className={cn(
                  "flex items-center gap-1 text-xs font-bold",
                  product.trend === 'up' ? "text-green-600" : "text-red-600"
                )}>
                  {product.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {product.change}
                </div>
              </div>

              <div className="w-px h-8 bg-gray-200 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Daromad</span>
                <span className="text-xs font-bold text-primary">{product.profitability}</span>
              </div>

              <div className="w-px h-8 bg-gray-200 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Hosildorlik</span>
                <span className="text-xs font-bold text-gray-700">{product.yield}</span>
              </div>

              <div className="w-px h-8 bg-gray-200 hidden md:block" />

              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">Narx</span>
                <span className="text-sm md:text-lg font-bold text-gray-900">
                  {product.price} <span className="text-[10px] opacity-50">so'm</span>
                </span>
              </div>
            </div>

            {/* Right Section: Action */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={() => onQuickAdd && onQuickAdd({ name: product.name, type: product.type })}
                className="flex-1 md:flex-none px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg shadow-gray-900/10"
              >
                <Plus size={16} />
                Qo'shish
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-primary rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 font-display">Bozor tahlili va eksport</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              Bizning AI tizimimiz har kuni O'zbekiston bo'ylab 50 dan ortiq bozorlardagi narxlarni tahlil qiladi va sizga eng foydali tavsiyalarni beradi.
            </p>
          </div>
          <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2 shrink-0 shadow-xl">
            Batafsil ma'lumot
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
