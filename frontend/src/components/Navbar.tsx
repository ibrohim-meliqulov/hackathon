import { motion } from "motion/react";
import { ArrowRight, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onAuthClick: () => void;
}

export default function Navbar({ onAuthClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="text-primary-foreground" size={18} />
            </div>
            <span className="text-xl font-bold tracking-tighter">AgroScan</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#muammo" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Muammo</a>
            <a href="#yechim" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Yechim</a>
            <a href="#narxlar" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Narxlar</a>
            <Button 
              onClick={onAuthClick}
              className="rounded-full px-6"
            >
              Kirish
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 py-6 flex flex-col gap-4"
        >
          <a href="#muammo" className="text-lg font-medium text-muted-foreground">Muammo</a>
          <a href="#yechim" className="text-lg font-medium text-muted-foreground">Yechim</a>
          <a href="#narxlar" className="text-lg font-medium text-muted-foreground">Narxlar</a>
          <Button 
            onClick={() => {
              onAuthClick();
              setIsOpen(false);
            }}
            className="w-full rounded-full"
          >
            Kirish
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </nav>
  );
}
