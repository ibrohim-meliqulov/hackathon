import { Activity, Thermometer, Droplets, FlaskConical, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

interface PremiumAnalyticsProps {
  region: string;
}

export default function PremiumAnalytics({ region }: PremiumAnalyticsProps) {
  const soilData = [
    { label: 'Azot (N)', value: '45 mg/kg', status: 'Me\'yorida', color: 'text-green-500' },
    { label: 'Fosfor (P)', value: '12 mg/kg', status: 'Past', color: 'text-yellow-500' },
    { label: 'Kaliy (K)', value: '180 mg/kg', status: 'Yuqori', color: 'text-blue-500' },
    { label: 'pH darajasi', value: '6.8', status: 'Ideal', color: 'text-teal-500' },
  ];

  return (
    <div className="space-y-6 mt-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-primary w-6 h-6" />
          <h2 className="text-2xl font-bold">Tuproq va Hosil Analitikasi</h2>
        </div>
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
          Ekspert Tahlili
        </span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {soilData.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm"
          >
            <p className="text-xs text-gray-400 font-bold uppercase mb-2 tracking-widest">{item.label}</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold font-display">{item.value}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-50 ${item.color}`}>
                {item.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-primary" size={20} />
            Hosil Bashorati (AI)
          </h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Kutilayotgan umumiy hosil:</span>
              <span className="text-xl font-bold text-primary">1,250 kg</span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-primary w-[70%]" />
              <div className="h-full bg-accent w-[15%] opacity-50" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              AI tahlili shuni ko'rsatadiki, agar hozirgi parvarish davom etsa, hosildorlik o'tgan yilga nisbatan 15% yuqori bo'ladi.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Activity className="text-teal-500" size={20} />
            Tuproq Namligi Xaritasi
          </h3>
          <div className="aspect-video bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200">
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-300 mx-auto mb-2" />
              <p className="text-xs text-gray-400">Interaktiv xarita yuklanmoqda...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
