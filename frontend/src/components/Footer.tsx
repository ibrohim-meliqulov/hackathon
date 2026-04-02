import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Leaf className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tighter">AgroScan</span>
            </div>
            <p className="text-gray-500 max-w-xs leading-relaxed">
              O'simlik kasalliklarini AI yordamida aniqlash va davolash bo'yicha maslahatlar beruvchi platforma.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Aloqa</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>agroscan.uz</li>
              <li>info@agroscan.uz</li>
              <li>+998 ## ### ## ##</li>
              <li>Surxandaryo, O'zbekiston</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Ijtimoiy tarmoqlar</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Telegram</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-gray-50">
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-primary transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-primary transition-colors">Foydalanish shartlari</a>
          </div>
          <p className="text-sm text-gray-400">© 2026 AgroScan. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
}
