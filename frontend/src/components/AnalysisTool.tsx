import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { axiosClient } from "../api/axios";
import { useEffect } from "react"

export default function AnalysisTool() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      window.location.href = "/"
    }
  }, [])


  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSend = async () => {
    try {
      if (!selectedImage) return;
      setIsAnalyzing(true)
      const base64 = selectedImage.split(",")[1];

      const { data } = await axiosClient.post(
        `/crop/analyze`,
        { imageBase64: base64 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(null);
      if (data.success) {
        setResult(data.data);
      } else {
        setResult("Diagnostika qilishda xatolik yuz berdi");
      }
      setIsAnalyzing(false)
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">O'simlikni diagnostika qilish</h2>

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative aspect-video rounded-3xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden ${selectedImage ? "border-green-500 bg-green-50/10" : "border-gray-200 bg-gray-50 hover:bg-gray-100"
            }`}
        >
          {selectedImage ? (
            <>
              <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-medium flex items-center gap-2">
                  <Upload size={20} /> Rasmni almashtirish
                </p>
              </div>
            </>
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 text-green-600">
                <ImageIcon size={32} />
              </div>
              <p className="text-lg font-bold mb-1">Rasm yuklang yoki suratga oling</p>
              <p className="text-sm text-gray-500">PNG, JPG formatlari (max. 10MB)</p>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSend}
            disabled={!selectedImage || isAnalyzing}
            className={`
    relative flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl
    transition-all duration-300
    ${isAnalyzing ? 'bg-green-400 cursor-not-allowed opacity-60' : 'bg-gradient-to-r from-green-500 to-teal-400 hover:from-teal-400 hover:to-green-500 hover:shadow-lg'}
    text-white shadow-md
    disabled:opacity-50 disabled:cursor-not-allowed
  `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Tahlil qilinmoqda...
              </>
            ) : (
              <>
                <Send size={20} className="transition-transform duration-200 group-hover:translate-x-1" />
                Muammoni yuborish
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-[2.5rem] border border-green-100 shadow-xl shadow-green-600/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-green-100">
              <CheckCircle2 size={120} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 text-green-600">
                <CheckCircle2 size={28} />
                <h3 className="text-2xl font-bold">Tahlil yakunlandi</h3>
              </div>

              <div className="prose prose-green max-w-none text-gray-700 leading-relaxed">
                {result.split('\n').map((line, i) => {
                  const trimmed = line.trim();
                  if (!trimmed) return null;

                  // Heading
                  if (trimmed.startsWith('###')) {
                    return <h4 key={i} className="text-xl font-bold mt-4 mb-2 text-gray-900">{trimmed.replace('###', '').trim()}</h4>;
                  }

                  // Bold (Markdown ichidagi **...** ni topib bold qiladi)
                  if (trimmed.includes('**')) {
                    const parts = trimmed.split('**');
                    return (
                      <p key={i} className="mb-2">
                        {parts.map((part, idx) =>
                          idx % 2 === 1
                            ? <span key={idx} className="font-bold text-gray-900">{part}</span>
                            : part
                        )}
                      </p>
                    );
                  }

                  // Numbered list
                  if (trimmed.match(/^\d\./)) {
                    return <li key={i} className="ml-4 mb-1">{trimmed}</li>;
                  }

                  // Oddiy paragraph
                  return <p key={i} className="mb-2">{trimmed}</p>;
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
