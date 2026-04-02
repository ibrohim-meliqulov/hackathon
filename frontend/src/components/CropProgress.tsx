import { useState, useEffect, useCallback, useRef } from 'react';
import { Calendar, ChevronRight, MoreVertical, Sprout, TrendingUp, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { axiosClient } from '../api/axios';
import { toast } from 'react-toastify';
import CropDetailsModal from './CropDetailsModal';

interface Crop {
  id: number;
  name: string;
  type: string;
  plantedDate: string;
  harvestDate: string;
  area: number;
  progress?: number;
  status?: 'yaxshi' | 'diqqat' | 'xavfli';
}

interface CropProgressProps {
  refreshTrigger?: number;
  onAddCrop?: () => void;
}

export default function CropProgress({ refreshTrigger, onAddCrop }: CropProgressProps) {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCropId, setSelectedCropId] = useState<number | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const isFetching = useRef(false);

  const fetchCrops = useCallback(async () => {
    if (isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
    try {
      const response = await axiosClient.get('/planting');
      setCrops(Array.isArray(response.data) ? response.data : []);
    } catch (error: any) {
      if (error.response?.status !== 500) {
        toast.error("Ekinlar ro'yxatini yuklashda xatolik");
      }
      setCrops([]);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  }, []);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops, refreshTrigger]);

  const handleOpenDetails = (id: number) => {
    setSelectedCropId(id);
    setIsDetailsOpen(true);
  };

  const calculateProgress = (plantedDate: string, harvestDate: string) => {
    const start = new Date(plantedDate).getTime();
    const end = new Date(harvestDate).getTime();
    const now = new Date().getTime();
    
    if (now >= end) return 100;
    if (now <= start) return 0;
    
    const total = end - start;
    const current = now - start;
    return Math.round((current / total) * 100);
  };

  const getDaysRemaining = (harvestDate: string) => {
    const diff = new Date(harvestDate).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  if (loading && crops.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-500 font-medium">Ekinlar yuklanmoqda...</p>
      </div>
    );
  }

  if (crops.length === 0) {
    return (
      <div className="bg-white p-8 md:p-12 rounded-2xl md:rounded-[3rem] border border-gray-100 shadow-sm text-center">
        <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sprout className="text-primary w-6 h-6 md:w-8 md:h-8" size={32} />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Hozircha hech nima ekmagansiz</h3>
        <p className="text-gray-500 text-xs md:text-base mb-6 md:mb-8">Yangi ekin qo'shish orqali monitoringni boshlang</p>
        {onAddCrop && (
          <button 
            onClick={onAddCrop}
            className="bg-primary text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
          >
            Ekin qo'shish
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-2xl font-bold">Mening tomorqam</h2>
          <button className="text-primary font-bold text-[9px] md:text-sm hover:underline flex items-center gap-1">
            Barchasini ko'rish <ChevronRight size={12} className="md:w-4 md:h-4" />
          </button>
        </div>

      <div className="flex flex-col gap-3 md:gap-4">
        {crops.map((crop, i) => {
          const progress = calculateProgress(crop.plantedDate, crop.harvestDate);
          const daysLeft = getDaysRemaining(crop.harvestDate);
          
          return (
            <motion.div
              key={crop.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleOpenDetails(crop.id)}
              className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden group flex items-center p-4 md:p-6 gap-4 md:gap-6 cursor-pointer hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2 md:gap-3 mb-1">
                      <h3 className="font-bold text-sm md:text-lg truncate max-w-[150px] md:max-w-none">{crop.name} <span className="text-gray-400 font-medium text-[10px] md:text-sm">({crop.type})</span></h3>
                      <div className="bg-gray-50 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[8px] md:text-[10px] font-bold flex items-center gap-1 shrink-0">
                        <div className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full ${progress < 80 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        {progress < 80 ? 'YAXSHI' : 'YIG\'IM VAQTI'}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-gray-400 text-[10px] md:text-xs">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="md:w-3.5 md:h-3.5" />
                        <span className="truncate">Ekilgan: {new Date(crop.plantedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Sprout size={12} className="text-primary md:w-3.5 md:h-3.5" />
                        <span>{daysLeft} kun qoldi</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-1.5 md:p-2 hover:bg-gray-50 rounded-full transition-colors shrink-0">
                    <MoreVertical size={16} className="text-gray-400 md:w-4.5 md:h-4.5" />
                  </button>
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex-1">
                    <div className="flex justify-between text-[10px] md:text-xs mb-1">
                      <span className="text-gray-500 font-medium">O'sish jarayoni</span>
                      <span className="text-primary font-bold">{progress}%</span>
                    </div>
                    <div className="h-1 md:h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-[8px] md:text-[10px] text-gray-400 uppercase font-bold tracking-wider">Kutilayotgan hosil</p>
                      <div className="flex items-center justify-end gap-1">
                        <TrendingUp size={12} className="text-green-500 md:w-3.5 md:h-3.5" />
                        <span className="font-bold text-xs md:text-sm text-gray-700">{crop.area * 15} kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <CropDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        cropId={selectedCropId}
      />
    </div>
  );
}
