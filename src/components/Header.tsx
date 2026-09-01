import { Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  
  return (
    <header className="py-8 px-6 text-center border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        <Link to="/" className="flex flex-col items-center justify-center gap-3 group">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl group-hover:bg-blue-100 transition-colors">
            <Sparkles className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
            Undetecta
          </h1>
        </Link>
        <p className="text-gray-600 text-lg">
          Write like a human. Every time.
        </p>
        
        <nav className="mt-4 flex gap-4 text-sm font-medium">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === '/' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            Home
          </Link>
          <Link 
            to="/ai-humanizer" 
            className={`px-4 py-2 rounded-lg transition-colors ${location.pathname === '/ai-humanizer' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
          >
            AI Humanizer
          </Link>
        </nav>
      </div>
    </header>
  );
}
