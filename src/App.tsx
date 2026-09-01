import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { HumanizerPage } from './pages/HumanizerPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-humanizer" element={<HumanizerPage />} />
        </Routes>

        {/* Credit Footer */}
        <footer className="text-center pb-6 pt-8 text-xs text-gray-400">
          Built by Wasay
        </footer>
      </div>
    </Router>
  );
}
