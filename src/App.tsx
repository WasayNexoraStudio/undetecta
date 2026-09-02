import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { HumanizerPage } from './pages/HumanizerPage';
import { DetectorPage } from './pages/DetectorPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 flex flex-col">
        <Header />
        
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-humanizer" element={<HumanizerPage />} />
            <Route path="/ai-detector" element={<DetectorPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="text-center pb-8 pt-12 text-xs text-gray-400">
          <div className="flex justify-center gap-4 mb-4">
            <Link to="/about" className="hover:text-gray-600 transition-colors">About</Link>
            <Link to="/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
          </div>
          <p>Built by Wasay</p>
        </footer>
      </div>
    </Router>
  );
}
