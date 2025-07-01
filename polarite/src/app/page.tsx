import { Home, User, ShoppingCart } from "lucide-react";


export default function PolariteDashboard() {
  return (
    <div className="bg-bg w-screen min-h-screen flex">
      {/* Left Sidebar */}
      <div className="w-1/5 min-h-screen bg-bg p-6">
        {/* Logo */}
        <div className="mb-12">
          <p className="text-white text-5xl geistSans font-extrabold">Polarite.</p>
        </div>
        

        {/* Navigation */}
        <nav className="space-y-2">
          <a href="/" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <Home size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
          <a href="/account" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <User size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">Account</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
          <a href="/shop" className="flex items-center space-x-4 p-3 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer group relative overflow-hidden rounded-lg">
            <ShoppingCart size={24} className="group-hover:scale-110 transition-transform duration-300 relative z-10" />
            <span className="text-xl font-medium relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.5)] transition-all duration-300">Shop</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </a>
        </nav>
      </div>
      
      {/* Main Content Area */}
      <div className="w-4/5 min-h-screen bg-bg flex justify-center items-center p-8">
        <div className="w-full h-5/6 bg-veryblack rounded-lg border border-gray-700">
          {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
}