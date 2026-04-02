import { useState } from 'react';
import Sidebar from './Sidebar';
import AnalysisTool from './AnalysisTool';
import WeatherAdvice from './WeatherAdvice';
import CropProgress from './CropProgress';
import NewCropModal from './NewCropModal';
import MarketInsights from './MarketInsights';
import ProfitCalculator from './ProfitCalculator';
import Profile from './Profile';
import Recommendations from './Recommendations';
import { Search, Bell, User as UserIcon, Plus, Settings, Crown, ShoppingBag, Leaf, Sprout, BookOpen } from 'lucide-react';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('diagnostics');
  const [isNewCropModalOpen, setIsNewCropModalOpen] = useState(false);
  const [initialCropData, setInitialCropData] = useState<{ name: string; type: string } | undefined>(undefined);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleCropAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleQuickAdd = (cropData: { name: string; type: string }) => {
    setInitialCropData(cropData);
    setIsNewCropModalOpen(true);
  };

  const closeNewCropModal = () => {
    setIsNewCropModalOpen(false);
    setInitialCropData(undefined);
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1 max-w-xl mr-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input 
                placeholder="Qidiruv..." 
                className="w-full pl-12 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                type="text" 
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {user.role === 'USER' && (
              <button 
                onClick={() => setIsNewCropModalOpen(true)}
                className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 whitespace-nowrap"
              >
                <Plus size={18} />
                <span className="hidden lg:inline">Yangi ekin</span>
              </button>
            )}

            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5.5 h-5.5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-3 pl-2 md:pl-6 border-l border-gray-100 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                <UserIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'diagnostics' && (
              <div className="space-y-6 md:space-y-8">
                <AnalysisTool />
                <WeatherAdvice region={user.region || 'Toshkent'} userRole={user.role} />
              </div>
            )}

            {activeTab === 'garden' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold mb-1 md:mb-2 font-display">Mening Tomorqam</h1>
                    <p className="text-gray-500 text-xs md:text-base">Ekinlaringizning o'sish jarayoni va nazorati</p>
                  </div>
                  {user.role === 'USER' && (
                    <button 
                      onClick={() => setIsNewCropModalOpen(true)}
                      className="flex items-center gap-2 bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-base font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/10 whitespace-nowrap"
                    >
                      <Plus size={18} className="md:w-5 md:h-5" />
                      <span className="hidden sm:inline">Yangi ekin qo'shish</span>
                      <span className="sm:hidden">Qo'shish</span>
                    </button>
                  )}
                </div>
                
                {user.role === 'USER' ? (
                  <div className="space-y-8 md:space-y-12">
                    <CropProgress 
                      refreshTrigger={refreshTrigger} 
                      onAddCrop={() => setIsNewCropModalOpen(true)}
                    />
                    <ProfitCalculator mode="garden" refreshTrigger={refreshTrigger} />
                  </div>
                ) : (
                  <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm text-center max-w-2xl mx-auto">
                    <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Crown className="text-primary w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Premium Imkoniyat</h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                      Tomorqangizdagi har bir ekinni alohida nazorat qilish, o'sish grafiklarini kuzatish va AI tavsiyalarini olish uchun Premium tarifga o'ting.
                    </p>
                    <button 
                      onClick={() => setActiveTab('market')}
                      className="bg-primary text-white px-10 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                    >
                      Bozor tahlilini ko'rish
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'market' && (
              <MarketInsights 
                region={user.region || 'Toshkent'} 
                onQuickAdd={handleQuickAdd}
              />
            )}

            {activeTab === 'profile' && (
              <Profile user={user} />
            )}
            
            {activeTab !== 'diagnostics' && activeTab !== 'market' && activeTab !== 'garden' && activeTab !== 'profile' && (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Settings className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-400">Tez kunda...</h2>
                <p className="text-gray-400">Bu bo'lim ustida ish olib borilmoqda.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <NewCropModal 
        isOpen={isNewCropModalOpen} 
        onClose={closeNewCropModal} 
        onSuccess={handleCropAdded}
        initialData={initialCropData}
      />
    </div>
  );
}
