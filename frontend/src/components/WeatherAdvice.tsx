import { Cloud, Sun, Thermometer, Wind, Droplets, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface WeatherAdviceProps {
  region: string;
  userRole: string;
}

export default function WeatherAdvice({ region, userRole }: WeatherAdviceProps) {
  // Mock weather data
  const weather = {
    temp: 24,
    condition: 'Quyoshli',
    humidity: 45,
    wind: 12,
  };

  const aiTips = [
    {
      title: "Sug'orish vaqti",
      desc: "Bugun havo issiq bo'lishi kutilmoqda. Pomidorlarni kechki soat 19:00 dan keyin sug'orish tavsiya etiladi.",
      type: "warning"
    },
    {
      title: "O'g'itlash",
      desc: "Sizning hududingizda namlik yuqori, shuning uchun azotli o'g'itlarni kamaytiring.",
      type: "info"
    }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${userRole === 'USER' ? 'lg:col-span-1' : 'lg:col-span-3'} bg-white p-4 md:p-6 rounded-2xl md:rounded-[2rem] border border-gray-100 shadow-sm`}
      >
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h3 className="font-bold text-gray-500 uppercase text-[10px] md:text-xs tracking-widest">{region} ob-havosi</h3>
          <Sun className="text-yellow-500 w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex items-end gap-2 md:gap-4 mb-4 md:mb-6">
          <span className="text-2xl md:text-5xl font-bold font-display">{weather.temp}°C</span>
          <span className="text-gray-500 text-[10px] md:text-base font-medium mb-1">{weather.condition}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2 text-gray-500">
            <Droplets size={14} className="text-blue-400 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm">{weather.humidity}% namlik</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-gray-500">
            <Wind size={14} className="text-teal-400 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm">{weather.wind} km/s</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 text-gray-500">
            <Thermometer size={14} className="text-orange-400 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm">UV 4.2</span>
          </div>
        </div>
      </motion.div>

      {userRole === 'USER' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-gradient-to-br from-green-600 to-teal-600 p-4 md:p-6 rounded-2xl md:rounded-[2rem] text-white shadow-lg shadow-green-600/20 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Sparkles size={18} className="text-yellow-300 md:w-5 md:h-5" />
              <h3 className="font-bold text-base md:text-lg">AI Maslahatlari</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {aiTips.map((tip, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-md p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10">
                  <h4 className="font-bold text-xs md:text-sm mb-1 text-yellow-200">{tip.title}</h4>
                  <p className="text-[10px] md:text-xs text-white/80 leading-relaxed">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        </motion.div>
      )}
    </div>
  );
}
