import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, Wallet, Sprout, Info, ArrowRight, ChevronDown, ChevronUp, Loader2, Download, FileText } from 'lucide-react';
import { allCrops } from '../constants/cropsData';
import { axiosClient } from '../api/axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ProfitCalculatorProps {
  mode?: 'general' | 'garden';
  refreshTrigger?: number;
}

export default function ProfitCalculator({ mode = 'general', refreshTrigger }: ProfitCalculatorProps) {
  const [calcMode, setCalcMode] = useState<'crop' | 'garden'>('crop');
  const [area, setArea] = useState<number>(1);
  const [selectedCropId, setSelectedCropId] = useState<string>(allCrops[0].id);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [userCrops, setUserCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode === 'garden') {
      fetchUserCrops();
    }
  }, [mode, refreshTrigger]);

  const isFetching = useRef(false);

  const fetchUserCrops = async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const response = await axiosClient.get('/planting');
      setUserCrops(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching user crops for calculator:", error);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };

  const selectedCrop = useMemo(() => 
    allCrops.find(c => c.id === selectedCropId) || allCrops[0]
  , [selectedCropId]);

  const results = useMemo(() => {
    if (mode === 'garden') {
      let totalYield = 0;
      let totalRevenue = 0;
      let totalCost = 0;
      let breakdown = { seeds: 0, fertilizer: 0, water: 0, labor: 0, other: 0 };

      userCrops.forEach(userCrop => {
        const cropData = allCrops.find(c => 
          c.name.toLowerCase().includes(userCrop.name.toLowerCase()) || 
          userCrop.name.toLowerCase().includes(c.name.toLowerCase())
        ) || allCrops[0];

        const cropYield = userCrop.area * cropData.yieldPerSotix;
        const cropRevenue = cropYield * cropData.pricePerKg;
        const cropCost = userCrop.area * cropData.costPerSotix;

        totalYield += cropYield;
        totalRevenue += cropRevenue;
        totalCost += cropCost;
        
        breakdown.seeds += userCrop.area * cropData.breakdown.seeds;
        breakdown.fertilizer += userCrop.area * cropData.breakdown.fertilizer;
        breakdown.water += userCrop.area * cropData.breakdown.water;
        breakdown.labor += userCrop.area * cropData.breakdown.labor;
        breakdown.other += userCrop.area * cropData.breakdown.other;
      });

      return {
        yield: totalYield,
        revenue: totalRevenue,
        cost: totalCost,
        profit: totalRevenue - totalCost,
        breakdown
      };
    }

    if (calcMode === 'crop') {
      const totalYield = area * selectedCrop.yieldPerSotix;
      const totalRevenue = totalYield * selectedCrop.pricePerKg;
      const totalCost = area * selectedCrop.costPerSotix;
      const netProfit = totalRevenue - totalCost;

      const breakdown = {
        seeds: area * selectedCrop.breakdown.seeds,
        fertilizer: area * selectedCrop.breakdown.fertilizer,
        water: area * selectedCrop.breakdown.water,
        labor: area * selectedCrop.breakdown.labor,
        other: area * selectedCrop.breakdown.other,
      };

      return {
        yield: totalYield,
        revenue: totalRevenue,
        cost: totalCost,
        profit: netProfit,
        breakdown
      };
    } else {
      const avgYield = allCrops.reduce((acc, c) => acc + c.yieldPerSotix, 0) / allCrops.length;
      const avgPrice = allCrops.reduce((acc, c) => acc + c.pricePerKg, 0) / allCrops.length;
      
      const avgSeeds = allCrops.reduce((acc, c) => acc + c.breakdown.seeds, 0) / allCrops.length;
      const avgFert = allCrops.reduce((acc, c) => acc + c.breakdown.fertilizer, 0) / allCrops.length;
      const avgWater = allCrops.reduce((acc, c) => acc + c.breakdown.water, 0) / allCrops.length;
      const avgLabor = allCrops.reduce((acc, c) => acc + c.breakdown.labor, 0) / allCrops.length;
      const avgOther = allCrops.reduce((acc, c) => acc + c.breakdown.other, 0) / allCrops.length;

      const totalYield = area * avgYield;
      const totalRevenue = totalYield * avgPrice;
      const totalCost = area * (avgSeeds + avgFert + avgWater + avgLabor + avgOther);
      const netProfit = totalRevenue - totalCost;

      return {
        yield: totalYield,
        revenue: totalRevenue,
        cost: totalCost,
        profit: netProfit,
        breakdown: {
          seeds: area * avgSeeds,
          fertilizer: area * avgFert,
          water: area * avgWater,
          labor: area * avgLabor,
          other: area * avgOther,
        }
      };
    }
  }, [area, selectedCrop, calcMode, mode, userCrops]);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('uz-UZ').format(Math.round(num));
  };

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AgroScan_Hisobot_${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error("PDF generate error:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (mode === 'garden' && loading && userCrops.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm p-12 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-gray-500 text-sm font-medium">Hisob-kitoblar tayyorlanmoqda...</p>
      </div>
    );
  }

  if (mode === 'garden' && userCrops.length === 0) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden"
    >
      <div className="p-4 md:p-12" ref={reportRef}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6 md:mb-12">
          <div className="flex items-center gap-3 md:gap-4 flex-1">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
              <Calculator size={20} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-bold font-display">
                {mode === 'garden' ? 'Tomorqa Daromadi' : 'Daromad Kalkulyatori'}
              </h2>
              <p className="text-gray-500 text-[10px] md:text-sm">
                {mode === 'garden' 
                  ? "Ekilgan ekinlaringizdan kutilayotgan sof foyda" 
                  : "Tomorqangizdan kutilayotgan sof foydani hisoblang"}
              </p>
            </div>
          </div>
          
          {mode === 'general' && (
            <div className="flex bg-gray-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setCalcMode('crop')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold transition-all ${calcMode === 'crop' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
              >
                Ma'lum ekin
              </button>
              <button
                onClick={() => setCalcMode('garden')}
                className={`flex-1 md:flex-none px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs font-bold transition-all ${calcMode === 'garden' ? 'bg-white text-primary shadow-sm' : 'text-gray-500'}`}
              >
                Umumiy tomorqa
              </button>
            </div>
          )}
        </div>

        <div className={`grid ${mode === 'garden' ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-6 md:gap-16`}>
          {mode === 'general' && (
            <div className="space-y-6 md:space-y-10">
              <div className="space-y-3 md:space-y-4">
                <label className="block text-[10px] md:text-sm font-bold text-gray-700 uppercase tracking-wider">
                  {calcMode === 'crop' ? 'Ekin maydoni (sotix)' : 'Umumiy tomorqa maydoni (sotix)'}
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    min="0.1"
                    step="0.1"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full px-4 md:px-6 py-3 md:py-5 bg-gray-50 border border-gray-100 rounded-2xl md:rounded-3xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg md:text-2xl font-bold transition-all"
                  />
                  <span className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm md:text-base">sotix</span>
                </div>
              </div>

              {calcMode === 'crop' && (
                <div className="space-y-3 md:space-y-4">
                  <label className="block text-[10px] md:text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Ekin turini tanlang
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 max-h-[250px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {allCrops.map((crop) => (
                      <button
                        key={crop.id}
                        onClick={() => setSelectedCropId(crop.id)}
                        className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all text-[10px] md:text-xs font-bold flex flex-col items-center gap-1 md:gap-2 ${
                          selectedCropId === crop.id 
                            ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <Sprout size={14} className="md:w-4.5 md:h-4.5" />
                        <span className="text-center line-clamp-1">{crop.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 md:p-6 bg-blue-50 rounded-2xl md:rounded-3xl border border-blue-100 flex gap-3 md:gap-4">
                <Info className="text-blue-500 shrink-0 w-4 h-4 md:w-5 md:h-5" size={20} />
                <p className="text-[10px] md:text-xs text-blue-700 leading-relaxed">
                  Hisob-kitoblar joriy bozor narxlari va o'rtacha hosildorlik ko'rsatkichlariga asoslangan. 
                  Real natijalar parvarish va ob-havo sharoitiga qarab o'zgarishi mumkin.
                </p>
              </div>
            </div>
          )}

          <div className={`${mode === 'garden' ? 'bg-white' : 'bg-gray-50'} rounded-2xl md:rounded-[3rem] p-4 md:p-10 space-y-6 md:space-y-8`}>
            <div className="space-y-1">
              <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">Kutilayotgan hosil</p>
              <div className="flex items-baseline gap-1 md:gap-2">
                <span className="text-2xl md:text-5xl font-bold font-display text-gray-900">{formatNumber(results.yield)}</span>
                <span className="text-xs md:text-xl font-bold text-gray-500">kg</span>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <div className="space-y-1">
                <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Umumiy daromad</p>
                <p className="text-sm md:text-2xl font-bold text-gray-800">{formatNumber(results.revenue)} <span className="text-[8px] md:text-xs">so'm</span></p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest">Xarajatlar</p>
                <p className="text-sm md:text-2xl font-bold text-red-500">-{formatNumber(results.cost)} <span className="text-[8px] md:text-xs">so'm</span></p>
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 overflow-hidden">
              <button 
                onClick={() => setShowBreakdown(!showBreakdown)}
                className="w-full p-3 md:p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-[10px] md:text-sm font-bold text-gray-700">Xarajatlar tafsiloti</span>
                {showBreakdown ? <ChevronUp size={16} className="md:w-5 md:h-5" /> : <ChevronDown size={16} className="md:w-5 md:h-5" />}
              </button>
              
              {showBreakdown && (
                <div className="p-3 md:p-5 pt-0 border-t border-gray-50">
                  <table className="w-full text-[10px] md:text-sm">
                    <tbody className="divide-y divide-gray-50">
                      <tr>
                        <td className="py-2 md:py-3 text-gray-500">Urug' va ko'chatlar</td>
                        <td className="py-2 md:py-3 text-right font-bold">{formatNumber(results.breakdown.seeds)} so'm</td>
                      </tr>
                      <tr>
                        <td className="py-2 md:py-3 text-gray-500">O'g'it va dori</td>
                        <td className="py-2 md:py-3 text-right font-bold">{formatNumber(results.breakdown.fertilizer)} so'm</td>
                      </tr>
                      <tr>
                        <td className="py-2 md:py-3 text-gray-500">Sug'orish (suv)</td>
                        <td className="py-2 md:py-3 text-right font-bold">{formatNumber(results.breakdown.water)} so'm</td>
                      </tr>
                      <tr>
                        <td className="py-2 md:py-3 text-gray-500">Ishchi kuchi</td>
                        <td className="py-2 md:py-3 text-right font-bold">{formatNumber(results.breakdown.labor)} so'm</td>
                      </tr>
                      <tr>
                        <td className="py-2 md:py-3 text-gray-500">Boshqa xarajatlar</td>
                        <td className="py-2 md:py-3 text-right font-bold">{formatNumber(results.breakdown.other)} so'm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="p-5 md:p-8 bg-white rounded-2xl md:rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Wallet size={60} className="text-primary md:w-24 md:h-24" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-primary mb-1 md:mb-2">
                  <TrendingUp size={14} className="md:w-5 md:h-5" />
                  <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Sof foyda</span>
                </div>
                <p className="text-xl md:text-5xl font-bold font-display text-primary">
                  {formatNumber(results.profit)} 
                  <span className="text-[10px] md:text-xl ml-1 md:ml-2">so'm</span>
                </p>
                <p className="text-[8px] md:text-xs text-gray-400 mt-1 md:mt-2">Barcha xarajatlar chegirib tashlangan holda</p>
              </div>
            </div>

            <button 
              onClick={downloadPDF}
              disabled={isGeneratingPdf}
              className="w-full py-3 md:py-5 bg-gray-900 text-white rounded-xl md:rounded-3xl text-xs md:text-base font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 disabled:opacity-70"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Yuklanmoqda...
                </>
              ) : (
                <>
                  Hisobotni PDF yuklab olish
                  <Download size={16} className="md:w-5 md:h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
