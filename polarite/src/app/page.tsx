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
        <nav className="space-y-6">
          <div className="flex items-center text-right justify-between text-3xl space-x-3 p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 cursor-pointer">
            <Home size={48} />
            <span>Home</span>
          </div>
          <div className="flex items-center text-right justify-between text-3xl space-x-3 p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 cursor-pointer">
            <User size={48} />
            <span>Account</span>
          </div>
          <div className="flex items-center text-right justify-between text-3xl space-x-3 p-2 rounded-xl text-gray-300 hover:text-white hover:bg-gray-900 cursor-pointer">
            <ShoppingCart size={48} />
            <span>Shop</span>
          </div>
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