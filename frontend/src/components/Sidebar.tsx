import { LayoutDashboard, History, BookOpen, Settings, LogOut, Leaf, ChevronRight, CreditCard, ShoppingBag, Sprout, User as UserIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'diagnostics', label: 'Diagnostika', icon: LayoutDashboard },
    { id: 'garden', label: 'Tomorqam', icon: Sprout },
    { id: 'market', label: 'Bozor', icon: ShoppingBag },
    { id: 'profile', label: 'Profil', icon: UserIcon },
  ];

  return (
    <aside className={cn(
      "bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 transition-all duration-300 z-50",
      "w-16 md:w-64" // Even narrower on mobile (w-16)
    )}>
      <div className="p-3 md:p-6 border-b border-gray-50 flex justify-center md:justify-start">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-8 md:h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <Leaf className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tighter hidden md:block">AgroScan</span>
        </div>
      </div>

      <nav className="flex-1 p-1.5 md:p-4 space-y-1 md:space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            title={item.label}
            className={cn(
              "w-full flex items-center p-2.5 md:p-3 rounded-xl transition-all",
              activeTab === item.id 
                ? "bg-primary/10 text-primary font-bold" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              "justify-center md:justify-between"
            )}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-4.5 h-4.5 md:w-5 md:h-5 shrink-0" />
              <span className="text-xs md:text-sm hidden md:block">{item.label}</span>
            </div>
            {activeTab === item.id && <ChevronRight className="w-4 h-4 hidden md:block" />}
          </button>
        ))}
      </nav>

      <div className="p-1.5 md:p-4 border-t border-gray-50">
        <button 
          onClick={onLogout}
          title="Chiqish"
          className={cn(
            "w-full flex items-center p-2.5 md:p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all",
            "justify-center md:justify-start gap-3"
          )}
        >
          <LogOut className="w-4.5 h-4.5 md:w-5 md:h-5 shrink-0" />
          <span className="text-xs md:text-sm font-medium hidden md:block">Chiqish</span>
        </button>
      </div>
    </aside>
  );
}
