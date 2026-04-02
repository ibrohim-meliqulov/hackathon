import React, { useState } from 'react';
import { X, Sprout, Calendar, MapPin, Info, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-toastify';
import { axiosClient } from '../api/axios';

interface NewCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: { name: string; type: string };
}

export default function NewCropModal({ isOpen, onClose, onSuccess, initialData }: NewCropModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    area: '',
    sellToMarket: false
  });

  React.useEffect(() => {
    if (isOpen && initialData) {
      setFormData(prev => ({
        ...prev,
        name: initialData.name || prev.name,
        type: initialData.type || prev.type
      }));
    } else if (isOpen && !initialData) {
      // Reset if no initial data
      setFormData({
        name: '',
        type: '',
        date: new Date().toISOString().split('T')[0],
        area: '',
        sellToMarket: false
      });
    }
  }, [isOpen, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosClient.post('/planting', {
        name: formData.name,
        type: formData.type,
        plantedDate: new Date(formData.date).toISOString(),
        area: parseFloat(formData.area)
      });

      const message = formData.sellToMarket 
        ? "Yangi ekin qo'shildi! Bozor tahlili va sotuv imkoniyatlari faollashtirildi."
        : "Yangi ekin muvaffaqiyatli qo'shildi! AI nazoratni boshladi.";
      
      toast.success(message);
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Ekin qo'shishda xatolik yuz berdi";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-2 font-display">Yangi ekin qo'shish</h2>
              <p className="text-xs md:text-sm text-gray-500">Tomorqangizdagi yangi ekinni AI nazoratiga bering</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Ekin nomi</label>
                  <div className="relative">
                    <Sprout className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Pomidor"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 ml-1">Navi</label>
                  <input
                    type="text"
                    placeholder="Masalan: Volgograd"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Ekilgan sana</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Maydon (sotix)</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Masalan: 2"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-all" onClick={() => setFormData({ ...formData, sellToMarket: !formData.sellToMarket })}>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${formData.sellToMarket ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}>
                  {formData.sellToMarket && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-sm font-medium text-gray-700">Ekinni bozorda sotmoqchimisiz?</span>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-600 leading-relaxed">
                  Ekin qo'shilgandan so'ng, AI sizning hududingizdagi ob-havo va tuproq sharoitiga qarab avtomatik ravishda parvarishlash rejasini tuzadi.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Yuborilmoqda...
                  </>
                ) : (
                  "Ekinni qo'shish"
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
