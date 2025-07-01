import Link from "next/link";
import { Home, User, ShoppingCart } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
    const { translations } = useLanguage();

    return (
        <nav className="space-y-2">Add commentMore actions
        <Link href="/" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <Home size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">{translations.navigation?.home}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </Link>

        <Link href="/account" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <User size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">{translations.navigation?.account}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </Link>

        <Link href="/shop" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">{translations.navigation?.shop}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </Link>
        </nav>
    );
};

export default Navbar;