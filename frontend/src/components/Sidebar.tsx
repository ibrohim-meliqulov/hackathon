import { 
  LayoutDashboard, 
  History, 
  BookOpen, 
  Settings, 
  LogOut, 
  Leaf,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

interface SidebarProps {
  onLogout: () => void;
}

const menuItems = [
  { icon: <LayoutDashboard size={20} />, label: "Diagnostika", active: true },
  { icon: <History size={20} />, label: "Tarix", active: false },
  { icon: <BookOpen size={20} />, label: "Maslahatlar", active: false },
  { icon: <Settings size={20} />, label: "Sozlamalar", active: false },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Leaf className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tighter">AgroScan</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
              item.active 
                ? "bg-green-50 text-green-700 font-bold" 
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
            {item.active && <ChevronRight size={16} />}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Chiqish</span>
        </button>
      </div>
    </aside>
  );
}
