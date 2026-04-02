import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, MapPin, Phone, Crown, Calendar, Sprout, TrendingUp, ShoppingCart, X, Calculator, Wallet, Info, ArrowRight, Loader2 } from 'lucide-react';
import { allCrops } from '../constants/cropsData';
import ProfitCalculator from './ProfitCalculator';
import { axiosClient } from '../api/axios';
import { toast } from 'react-toastify';

interface PlantedCrop {
  id: number;
  name: string;
  type: string;
  plantedDate: string;
  harvestDate: string;
  area: number; // sotix
}

interface ProfileProps {
  user: any;
}

export default function Profile({ user }: ProfileProps) {
  const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
  const [selectedCropForSale, setSelectedCropForSale] = useState<PlantedCrop | null>(null);
  const [salePrice, setSalePrice] = useState<number>(0);
  const [myCrops, setMyCrops] = useState<PlantedCrop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCrops();
  }, []);

  const fetchMyCrops = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get('/planting');
      setMyCrops(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching my crops:", error);
      toast.error("Ekinlarni yuklashda xatolik");
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemaining = (dateStr: string) => {
    const harvestDate = new Date(dateStr);
    const today = new Date();
    const diffTime = harvestDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(Math.round(num));
  };

  const saleCalculation = useMemo(() => {
    if (!selectedCropForSale) return null;
    
    // Try to find matching crop data from our constants
    const cropInfo = allCrops.find(c => 
      selectedCropForSale.name.toLowerCase().includes(c.name.toLowerCase()) || 
      c.name.toLowerCase().includes(selectedCropForSale.name.toLowerCase())
    ) || allCrops[0];

    const totalYield = selectedCropForSale.area * cropInfo.yieldPerSotix;
    const totalRevenue = totalYield * salePrice;
    const totalCost = selectedCropForSale.area * cropInfo.costPerSotix;
    const netProfit = totalRevenue - totalCost;

    return {
      yield: totalYield,
      revenue: totalRevenue,
      cost: totalCost,
      profit: netProfit,
      marketPrice: cropInfo.pricePerKg
    };
  }, [selectedCropForSale, salePrice]);

  const openSaleModal = (crop: PlantedCrop) => {
    const cropInfo = allCrops.find(c => 
      crop.name.toLowerCase().includes(c.name.toLowerCase()) || 
      c.name.toLowerCase().includes(crop.name.toLowerCase())
    ) || allCrops[0];
    
    setSelectedCropForSale(crop);
    setSalePrice(cropInfo?.pricePerKg || 0);
    setIsSaleModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-24 md:h-32 bg-gradient-to-r from-primary/20 to-accent/20" />
        <div className="px-4 md:px-8 pb-6 md:pb-8 -mt-10 md:-mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div className="flex items-end gap-4 md:gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-1.5 md:p-2 shadow-xl">
                <div className="w-full h-full bg-primary/10 rounded-[1.2rem] md:rounded-[2rem] flex items-center justify-center text-primary">
                  <User size={48} className="md:w-16 md:h-16" />
                </div>
              </div>
              <div className="pb-1 md:pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl md:text-3xl font-bold font-display">{user.name} {user.surname}</h1>
                  {user.role === 'USER' && (
                    <div className="bg-yellow-100 text-yellow-700 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold flex items-center gap-1">
                      <Crown size={10} className="md:w-3 md:h-3 fill-yellow-700" />
                      PREMIUM
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4 text-gray-500 text-[10px] md:text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin size={14} className="text-primary md:w-4 md:h-4" />
                    {user.region || 'Toshkent'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-primary md:w-4 md:h-4" />
                    {user.phone || '+998 90 123 45 67'}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 md:gap-3 pb-1 md:pb-2">
              <button className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-gray-50 text-gray-600 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm hover:bg-gray-100 transition-all">
                Tahrirlash
              </button>
              <button className="flex-1 md:flex-none px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/10">
                Statistika
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-2xl font-bold font-display">Mening ekinlarim</h2>
            <span className="text-[10px] md:text-sm text-gray-400 font-medium">{myCrops.length} ta faol ekin</span>
          </div>

          <div className="space-y-3 md:space-y-4">
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="animate-spin text-primary" size={32} />
              </div>
            ) : myCrops.length === 0 ? (
              <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center">
                <p className="text-gray-500 text-sm italic">Hozircha ekinlar mavjud emas</p>
              </div>
            ) : (
              myCrops.map((crop) => {
                const daysLeft = getDaysRemaining(crop.harvestDate);
                const canSell = daysLeft >= 0 && daysLeft <= 15;

                return (
                  <motion.div
                    key={crop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
                        <Sprout size={20} className="md:w-6 md:h-6" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm md:text-lg">{crop.name}</h3>
                        <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-400 mt-0.5 md:mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                            <span>Hosil: {new Date(crop.harvestDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp size={12} className="text-green-500 md:w-3.5 md:h-3.5" />
                            <span>{crop.area} sotix</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-left md:text-right">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Vaqt qoldi</p>
                        <p className={`text-xs md:text-sm font-bold ${daysLeft <= 15 ? 'text-orange-500' : 'text-gray-700'}`}>
                          {daysLeft > 0 ? `${daysLeft} kun` : 'Yig\'im vaqti'}
                        </p>
                      </div>
                      {canSell && (
                        <button
                          onClick={() => openSaleModal(crop)}
                          className="flex items-center gap-1.5 md:gap-2 bg-green-500 text-white px-3 md:px-4 py-2 md:py-2.5 rounded-lg md:rounded-xl text-[10px] md:text-sm font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100"
                        >
                          <ShoppingCart size={14} className="md:w-4.5 md:h-4.5" />
                          Sotuvga chiqarish
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        <div className="space-y-4 md:space-y-6">
          <h2 className="text-lg md:text-2xl font-bold font-display">Xabarlar</h2>
          <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm space-y-3 md:space-y-4">
            <div className="flex gap-3 md:gap-4 p-3 md:p-4 bg-blue-50 rounded-xl md:rounded-2xl">
              <Info className="text-blue-500 shrink-0 w-4 h-4 md:w-5 md:h-5" size={20} />
              <p className="text-[10px] md:text-xs text-blue-700 leading-relaxed">
                <b>Pomidor</b> hosili yaqinlashmoqda. Bozor narxlarini kuzatib boring va sotuvni rejalashtiring.
              </p>
            </div>
            <div className="flex gap-3 md:gap-4 p-3 md:p-4 bg-green-50 rounded-xl md:rounded-2xl">
              <TrendingUp className="text-green-500 shrink-0 w-4 h-4 md:w-5 md:h-5" size={20} />
              <p className="text-[10px] md:text-xs text-green-700 leading-relaxed">
                Sizning hududingizda <b>sarimsoq</b> narxi 15% ga oshdi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg md:text-2xl font-bold font-display mb-6">Daromadni hisoblash</h2>
        <ProfitCalculator mode="general" />
      </div>

      {/* Sale Modal */}
      <AnimatePresence>
        {isSaleModalOpen && selectedCropForSale && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSaleModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
            >
              <button 
                onClick={() => setIsSaleModalOpen(false)}
                className="absolute top-4 right-4 md:top-8 md:right-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <X size={24} className="text-gray-400" />
              </button>

              <div className="grid lg:grid-cols-2 overflow-y-auto custom-scrollbar">
                <div className="p-6 md:p-12 space-y-6 md:space-y-8">
                  <div>
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-green-100 rounded-xl md:rounded-2xl flex items-center justify-center text-green-600 mb-4">
                      <ShoppingCart size={28} className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                    <h2 className="text-xl md:text-3xl font-bold font-display">Sotuvni rejalashtirish</h2>
                    <p className="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">{selectedCropForSale.name}</p>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2 md:space-y-3">
                      <label className="block text-[10px] md:text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Sotuv narxi (1 kg uchun)
                      </label>
                      <div className="relative">
                        <input 
                          type="number" 
                          value={salePrice}
                          onChange={(e) => setSalePrice(Number(e.target.value))}
                          className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-50 border border-gray-100 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg md:text-xl font-bold transition-all"
                        />
                        <span className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm md:text-base">so'm</span>
                      </div>
                      <p className="text-[10px] md:text-xs text-gray-400">
                        Bozordagi o'rtacha narx: <b>{formatNumber(saleCalculation?.marketPrice || 0)} so'm</b>
                      </p>
                    </div>

                    <div className="p-4 md:p-6 bg-blue-50 rounded-xl md:rounded-2xl border border-blue-100 flex gap-3 md:gap-4">
                      <Calculator className="text-blue-500 shrink-0 w-4 h-4 md:w-5 md:h-5" size={20} />
                      <p className="text-[10px] md:text-xs text-blue-700 leading-relaxed">
                        Siz kiritgan narx bo'yicha kutilayotgan sof foyda va xarajatlar tahlili o'ng tomonda ko'rsatilgan.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 md:p-12 space-y-6 md:space-y-8">
                  <div className="space-y-4 md:space-y-6">
                    <div className="space-y-1">
                      <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Taxminiy hosil hajmi</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl md:text-4xl font-bold font-display text-gray-900">{formatNumber(saleCalculation?.yield || 0)}</span>
                        <span className="text-sm md:text-lg font-bold text-gray-500">kg</span>
                      </div>
                    </div>

                    <div className="h-px bg-gray-200" />

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kutilayotgan tushum</p>
                        <p className="text-sm md:text-xl font-bold text-gray-800">{formatNumber(saleCalculation?.revenue || 0)} <span className="text-[10px]">so'm</span></p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jami xarajatlar</p>
                        <p className="text-sm md:text-xl font-bold text-red-500">-{formatNumber(saleCalculation?.cost || 0)} <span className="text-[10px]">so'm</span></p>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform hidden md:block">
                        <Wallet size={80} className="text-primary" />
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 text-primary mb-1 md:mb-2">
                          <TrendingUp size={16} className="md:w-4.5 md:h-4.5" />
                          <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Sof foyda</span>
                        </div>
                        <p className={`text-2xl md:text-4xl font-bold font-display ${saleCalculation && saleCalculation.profit > 0 ? 'text-primary' : 'text-red-500'}`}>
                          {formatNumber(saleCalculation?.profit || 0)} 
                          <span className="text-sm md:text-lg ml-1 md:ml-2">so'm</span>
                        </p>
                        <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2">
                          {saleCalculation && saleCalculation.profit > 0 
                            ? "Siz foyda ko'ryapsiz!" 
                            : "Ushbu narxda zarar ko'rishingiz mumkin."}
                        </p>
                      </div>
                    </div>

                    <button className="w-full py-3 md:py-4 bg-gray-900 text-white rounded-xl md:rounded-2xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200">
                      Bozorga e'lon berish
                      <ArrowRight size={16} className="md:w-4.5 md:h-4.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
