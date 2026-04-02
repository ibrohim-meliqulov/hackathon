import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Camera, Upload, Sparkles, AlertCircle, CheckCircle2, Loader2, X, ChevronRight, Info } from 'lucide-react';
import { axiosClient } from '../api/axios';
import { toast } from 'react-toastify';

export default function AnalysisTool() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setResult(null);

    try {
      const response = await axiosClient.post('/crop/analyze', { 
        imageBase64: selectedImage,
        lang: 'uz' // Default to uz
      });
      
      // The response is data: { result: string }
      const analysisResult = response.data.data;
      
      // Parse the result string to extract fields if possible, or just display it as a block
      // The format is:
      // 🌿 O'simlik: [Nomi]
      // 🦠 Kasallik: [Nomi]
      // 📊 Ishonch darajasi: [0-100%]
      // 💡 Sababi: [Qisqa izoh]
      // 💊 Tavsiya: [O'zbekistonda mavjud dori nomlari (fungitsidlar)]
      
      const lines = analysisResult.split('\n');
      const parsedResult = {
        problem: lines.find((l: string) => l.includes('🦠'))?.split(':')[1]?.trim() || 'Aniqlanmadi',
        plant: lines.find((l: string) => l.includes('🌿'))?.split(':')[1]?.trim() || 'Aniqlanmadi',
        confidence: lines.find((l: string) => l.includes('📊'))?.split(':')[1]?.trim() || '0%',
        reason: lines.find((l: string) => l.includes('💡'))?.split(':')[1]?.trim() || 'Ma\'lumot yo\'q',
        solution: lines.find((l: string) => l.includes('💊'))?.split(':')[1]?.trim() || 'Tavsiya yo\'q',
        fullText: analysisResult
      };
      
      setResult(parsedResult);
      toast.success('Tahlil muvaffaqiyatli yakunlandi!');
    } catch (error: any) {
      console.error("Tahlil xatosi:", error.message);
      toast.error('Tahlil qilishda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
      <div className="bg-white rounded-2xl md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 md:p-12">
          <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
              <Sparkles size={20} className="md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-base md:text-xl font-bold font-display">AI Diagnostika</h2>
              <p className="text-gray-500 text-[9px] md:text-sm">Kasallik va zararkunandalarni aniqlash</p>
            </div>
          </div>

          {!selectedImage ? (
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group border-2 border-dashed border-gray-100 rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center gap-3 md:gap-4 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-gray-400 group-hover:text-primary w-8 h-8 md:w-10 md:h-10" size={40} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-base md:text-lg">Galereyadan yuklash</p>
                  <p className="text-[10px] md:text-sm text-gray-400 mt-1">Suratni tanlang yoki sudrab keling</p>
                </div>
              </div>

              <div 
                onClick={() => toast.info("Kamera funksiyasi tez kunda ishga tushadi!")}
                className="group border-2 border-dashed border-gray-100 rounded-2xl md:rounded-[2.5rem] p-8 md:p-12 flex flex-col items-center justify-center gap-3 md:gap-4 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera className="text-gray-400 group-hover:text-primary w-8 h-8 md:w-10 md:h-10" size={40} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-700 text-base md:text-lg">Suratga olish</p>
                  <p className="text-[10px] md:text-sm text-gray-400 mt-1">Kamera orqali real vaqtda</p>
                </div>
              </div>
              
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-gray-100 border border-gray-100">
                <img src={selectedImage} alt="Uploaded" className="w-full h-full object-cover" />
                <button 
                  onClick={() => { setSelectedImage(null); setResult(null); }}
                  className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full backdrop-blur-md hover:bg-black/70 transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {!result && !isAnalyzing && (
                <button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full py-4 md:py-5 bg-primary text-white rounded-2xl font-bold text-base md:text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Sparkles size={20} className="md:w-6 md:h-6" />
                  AI Tahlilni boshlash
                </button>
              )}

              {isAnalyzing && (
                <div className="py-12 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-800">AI suratni tahlil qilmoqda...</p>
                    <p className="text-sm text-gray-400 mt-2">Bu bir necha soniya vaqt olishi mumkin</p>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                        <div className="flex items-center gap-2 text-red-600 mb-2">
                          <AlertCircle size={20} />
                          <span className="text-xs font-bold uppercase tracking-widest">Muammo aniqlandi</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{result.problem}</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-0.5 bg-white rounded-md text-[10px] font-bold text-red-500 border border-red-100 uppercase">O'simlik: {result.plant}</span>
                          <span className="px-2 py-0.5 bg-white rounded-md text-[10px] font-bold text-red-500 border border-red-100 uppercase">Ishonch: {result.confidence}</span>
                        </div>
                      </div>

                      <div className="p-6 bg-green-50 rounded-3xl border border-green-100">
                        <div className="flex items-center gap-2 text-green-600 mb-2">
                          <CheckCircle2 size={20} />
                          <span className="text-xs font-bold uppercase tracking-widest">AI Tavsiyasi</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed font-medium">{result.solution}</p>
                      </div>
                    </div>

                    <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Info className="text-primary" size={18} />
                        Sababi va tahlil
                      </h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{result.reason}</p>
                    </div>

                    <button 
                      onClick={() => { setSelectedImage(null); setResult(null); }}
                      className="w-full py-4 border border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                      Boshqa suratni tahlil qilish
                      <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
