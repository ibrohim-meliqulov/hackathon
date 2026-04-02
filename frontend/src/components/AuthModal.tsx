import { motion, AnimatePresence } from "motion/react";
import { X, Phone, Lock, User, MapPin, Crown, MapPinned, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { axiosClient } from "../api/axios";
import { toast } from "react-toastify";
import { getTelegramUser } from "../lib/telegram";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user?: any) => void;
}

const regions = [
  "Toshkent shahri", "Toshkent viloyati", "Andijon", "Buxoro", "Farg'ona",
  "Jizzax", "Xorazm", "Namangan", "Navoiy", "Qashqadaryo", "Samarqand",
  "Sirdaryo", "Surxondaryo", "Qoraqalpog'iston"
];

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    password: "",
    region: "",
  });
  const [loading, setLoading] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  useEffect(() => {
    if (isOpen && !isLogin) {
      const tgUser = getTelegramUser();
      if (tgUser) {
        setFormData(prev => ({
          ...prev,
          name: tgUser.first_name || prev.name,
          surname: tgUser.last_name || prev.surname,
        }));
      }
      // Automatically try to detect location when switching to register
      if (!formData.region) {
        handleDetectLocation();
      }
    }
  }, [isOpen, isLogin]);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      return;
    }

    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use Nominatim for reverse geocoding to get more specific location
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`);
          const data = await response.json();
          
          if (data && data.address) {
            const addr = data.address;
            // Try to construct a specific location string: Village/District, Region
            const village = addr.village || addr.hamlet || addr.suburb || addr.town || addr.city_district || "";
            const county = addr.county || addr.district || "";
            const state = addr.state || addr.region || "";
            
            let locationStr = "";
            if (village) locationStr += village;
            if (county) locationStr += (locationStr ? ", " : "") + county;
            if (state) locationStr += (locationStr ? ", " : "") + state;
            
            if (locationStr) {
              setFormData(prev => ({ ...prev, region: locationStr }));
              toast.success("Joylashuv aniqlandi: " + locationStr);
            } else {
              // Fallback to a default if string is empty
              setFormData(prev => ({ ...prev, region: "Toshkent shahri" }));
            }
          }
        } catch (error) {
          console.error("Location detection error:", error);
          // Fallback
          setFormData(prev => ({ ...prev, region: "Toshkent shahri" }));
        } finally {
          setDetectingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        setDetectingLocation(false);
      },
      { timeout: 10000 }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const response = await axiosClient.post('/auth/login', {
          phone: formData.phone,
          password: formData.password
        });
        
        const { accessToken, user } = response.data;
        
        // Store token and user with 7 days expiry (for user info) but token in session
        const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
        const userData = user || { name: formData.phone, role: 'USER' };
        
        // User info can stay in localStorage for persistence if desired, 
        // but the prompt says "accessTokenini sessionga saqlashing".
        // I'll put both in sessionStorage to be safe and consistent with "session".
        sessionStorage.setItem('agro_token', accessToken);
        sessionStorage.setItem('agro_user', JSON.stringify(userData));
        
        // Also keep in localStorage if we want persistence across tabs, 
        // but "session" usually implies sessionStorage.
        // I'll stick to sessionStorage as requested.
        
        toast.success("Xush kelibsiz!");
        onSuccess(userData);
        onClose();
      } else {
        const response = await axiosClient.post('/user/register', {
          name: formData.name,
          surname: formData.surname,
          phone: formData.phone,
          password: formData.password,
          region: formData.region
        });
        
        const { accessToken, user } = response.data;
        
        sessionStorage.setItem('agro_token', accessToken);
        sessionStorage.setItem('agro_user', JSON.stringify(user || { name: formData.name, surname: formData.surname, role: 'USER', region: formData.region }));
        
        toast.success("Ro'yxatdan o'tish muvaffaqiyatli yakunlandi");
        onSuccess(user || { name: formData.name, surname: formData.surname, role: 'USER', region: formData.region });
        onClose();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="p-8 pt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2 font-display">
                  {isLogin ? "Xush kelibsiz!" : "Ro'yxatdan o'tish"}
                </h2>
                <p className="text-gray-500">
                  {isLogin
                    ? "Tizimga kirish uchun ma'lumotlaringizni kiriting"
                    : "AgroScan oilasiga qo'shilish uchun shaklni to'ldiring"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="name"
                        placeholder="Ism"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                      />
                    </div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="surname"
                        placeholder="Familiya"
                        required
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefon raqam"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>

                {!isLogin && (
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <div className="flex gap-2">
                      <select
                        name="region"
                        required
                        value={formData.region}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all appearance-none"
                      >
                        <option value="" disabled>Viloyatni tanlang</option>
                        {regions.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        disabled={detectingLocation}
                        className="px-4 bg-green-50 text-green-600 rounded-2xl border border-green-100 hover:bg-green-100 transition-all flex items-center justify-center shrink-0"
                        title="Joylashuvni aniqlash"
                      >
                        {detectingLocation ? <Loader2 size={18} className="animate-spin" /> : <MapPinned size={18} />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Parol"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-600/20 hover:bg-green-700 transition-all active:scale-[0.98] mt-4 disabled:opacity-70"
                >
                  {loading ? "Yuklanmoqda..." : isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                  {isLogin ? "Hali hisobingiz yo'qmi?" : "Hisobingiz bormi?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-green-600 font-bold hover:underline"
                  >
                    {isLogin ? "Ro'yxatdan o'tish" : "Kirish"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
