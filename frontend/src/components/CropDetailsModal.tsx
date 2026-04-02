import React, { useEffect, useState } from 'react';
import { X, Calendar, Sprout, MapPin, TrendingUp, Clock, ShieldCheck, AlertCircle, Loader2, Plus, Trash2, Wallet, Info, Coins, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { axiosClient } from '../api/axios';
import { toast } from 'react-toastify';

interface Expense {
  id: string;
  type: string;
  amount: number;
}

const EXPENSE_TYPES = [
  "Suv (Sug'orish)",
  "Urug' / Ko'chat",
  "O'g'itlar",
  "Zararkunandaga qarshi dori",
  "Ishchi kuchi",
  "Texnika ijarasi",
  "Transport",
  "Yoqilg'i",
  "Elektr energiyasi",
  "Boshqa xarajatlar"
];

interface CropDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cropId: number | null;
}

export default function CropDetailsModal({ isOpen, onClose, cropId }: CropDetailsModalProps) {
  const [crop, setCrop] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({ type: EXPENSE_TYPES[0], amount: '' });

  useEffect(() => {
    if (isOpen && cropId) {
      fetchCropDetails();
      // Load expenses from localStorage for now since backend doesn't have it
      const savedExpenses = localStorage.getItem(`expenses_${cropId}`);
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses));
      } else {
        setExpenses([]);
      }
    }
  }, [isOpen, cropId]);

  const fetchCropDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(`/planting/${cropId}`);
      setCrop(response.data);
    } catch (error: any) {
      toast.error("Ma'lumotlarni yuklashda xatolik yuz berdi");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = () => {
    if (!newExpense.amount || isNaN(Number(newExpense.amount))) {
      toast.error("Miqdorni to'g'ri kiriting");
      return;
    }

    const expense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      type: newExpense.type,
      amount: Number(newExpense.amount)
    };

    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${cropId}`, JSON.stringify(updatedExpenses));
    setNewExpense({ ...newExpense, amount: '' });
    setShowAddExpense(false);
    toast.success("Xarajat qo'shildi");
  };

  const removeExpense = (id: string) => {
    const updatedExpenses = expenses.filter(e => e.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem(`expenses_${cropId}`, JSON.stringify(updatedExpenses));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Noma'lum";
    return new Date(dateString).toLocaleDateString('uz-UZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateDaysRemaining = (harvestDate: string) => {
    if (!harvestDate) return 0;
    const today = new Date();
    const harvest = new Date(harvestDate);
    const diffTime = harvest.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2 md:p-4">
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
            className="relative w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {loading ? (
              <div className="h-[400px] flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-gray-500 font-medium">Ma'lumotlar yuklanmoqda...</p>
              </div>
            ) : crop ? (
              <>
                <div className="h-32 md:h-48 bg-primary relative overflow-hidden shrink-0">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-white rounded-full blur-[80px]" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[100%] bg-accent rounded-full blur-[80px]" />
                  </div>
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 text-white">
                    <div className="flex items-center gap-2 mb-1 md:mb-2">
                      <Sprout size={16} className="md:w-5 md:h-5" />
                      <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest opacity-80">Ekin tafsilotlari</span>
                    </div>
                    <h2 className="text-xl md:text-4xl font-bold font-display">{crop.name}</h2>
                    <p className="text-xs md:text-base opacity-80 font-medium">{crop.type} navi</p>
                  </div>
                </div>

                  <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                      <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Ekilgan</p>
                        <p className="text-[10px] md:text-sm font-bold text-gray-900">{formatDate(crop.plantedDate)}</p>
                      </div>
                      <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Hosil</p>
                        <p className="text-[10px] md:text-sm font-bold text-gray-900">{formatDate(crop.harvestDate)}</p>
                      </div>
                      <div className="p-3 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl border border-gray-100">
                        <p className="text-[8px] md:text-[10px] font-bold text-gray-400 uppercase mb-1">Maydon</p>
                        <p className="text-[10px] md:text-sm font-bold text-gray-900">{crop.area} sotix</p>
                      </div>
                      <div className="p-3 md:p-4 bg-green-50 rounded-xl md:rounded-2xl border border-green-100">
                        <p className="text-[8px] md:text-[10px] font-bold text-green-600 uppercase mb-1">Qolgan</p>
                        <p className="text-[10px] md:text-sm font-bold text-green-700">{calculateDaysRemaining(crop.harvestDate)} kun</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Advice Section */}
                      {crop.advice && (
                        <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
                          <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-3">
                            <Info size={18} />
                            Mutaxassis tavsiyasi
                          </h3>
                          <p className="text-xs md:text-sm text-blue-800 leading-relaxed">
                            {crop.advice}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Expected Yield Section */}
                        {crop.expectedYield && (
                          <div className="p-5 bg-green-50/50 border border-green-100 rounded-2xl">
                            <h3 className="text-sm font-bold text-green-900 flex items-center gap-2 mb-3">
                              <TrendingUp size={18} />
                              Kutilayotgan hosildorlik
                            </h3>
                            <p className="text-xs md:text-sm text-green-800 leading-relaxed font-medium">
                              {crop.expectedYield}
                            </p>
                          </div>
                        )}

                        {/* Seed Amount Section */}
                        {crop.seedAmount && (
                          <div className="p-5 bg-orange-50/50 border border-orange-100 rounded-2xl">
                            <h3 className="text-sm font-bold text-orange-900 flex items-center gap-2 mb-3">
                              <Package size={18} />
                              Zaruriy urug' miqdori
                            </h3>
                            <p className="text-xs md:text-sm text-orange-800 leading-relaxed font-medium">
                              {crop.seedAmount}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Estimated Profit Section */}
                      {crop.estimatedProfit && (
                        <div className="p-5 bg-purple-50/50 border border-purple-100 rounded-2xl">
                          <h3 className="text-sm font-bold text-purple-900 flex items-center gap-2 mb-3">
                            <Coins size={18} />
                            Taxminiy daromad
                          </h3>
                          <p className="text-xs md:text-sm text-purple-800 leading-relaxed font-bold">
                            {crop.estimatedProfit}
                          </p>
                        </div>
                      )}

                      {/* Expenses Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base md:text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Wallet className="text-primary" size={20} />
                            Xarajatlar
                          </h3>
                          <button 
                            onClick={() => setShowAddExpense(!showAddExpense)}
                            className="flex items-center gap-1 text-primary font-bold text-xs md:text-sm hover:underline"
                          >
                            <Plus size={16} />
                            Qo'shish
                          </button>
                        </div>

                        {showAddExpense && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <select 
                                value={newExpense.type}
                                onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                {EXPENSE_TYPES.map(type => (
                                  <option key={type} value={type}>{type}</option>
                                ))}
                              </select>
                              <input 
                                type="number"
                                placeholder="Summa (so'm)"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => setShowAddExpense(false)}
                                className="px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-all"
                              >
                                Bekor qilish
                              </button>
                              <button 
                                onClick={handleAddExpense}
                                className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
                              >
                                Saqlash
                              </button>
                            </div>
                          </motion.div>
                        )}

                        <div className="space-y-2">
                          {expenses.length === 0 ? (
                            <p className="text-center py-4 text-gray-400 text-xs italic">Hozircha xarajatlar kiritilmagan</p>
                          ) : (
                            expenses.map((expense) => (
                              <div key={expense.id} className="flex items-center justify-between p-3 bg-white border border-gray-50 rounded-xl hover:border-gray-200 transition-all">
                                <span className="text-xs md:text-sm text-gray-700 font-medium">{expense.type}</span>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs md:text-sm font-bold text-gray-900">{new Intl.NumberFormat('uz-UZ').format(expense.amount)} so'm</span>
                                  <button 
                                    onClick={() => removeExpense(expense.id)}
                                    className="text-red-400 hover:text-red-600 p-1"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                          {expenses.length > 0 && (
                            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/10 mt-4">
                              <span className="text-xs md:text-sm font-bold text-primary">Jami xarajat:</span>
                              <span className="text-sm md:text-base font-bold text-primary">{new Intl.NumberFormat('uz-UZ').format(totalExpenses)} so'm</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-50 flex gap-3">
                      <button 
                        onClick={onClose}
                        className="flex-1 py-3 md:py-4 bg-gray-50 text-gray-500 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm hover:bg-gray-100 transition-all"
                      >
                        Yopish
                      </button>
                    </div>
                  </div>
              </>
            ) : (
              <div className="p-12 text-center">
                <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
                <h3 className="text-xl font-bold mb-2">Ma'lumot topilmadi</h3>
                <button onClick={onClose} className="text-primary font-bold">Orqaga qaytish</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
