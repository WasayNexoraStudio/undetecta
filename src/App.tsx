import { useState } from 'react';
import { Header } from './components/Header';
import { HumanizerTab } from './components/HumanizerTab';
import { DetectorTab } from './components/DetectorTab';
import { AdFooter } from './components/AdFooter';

type Tab = 'humanize' | 'detect';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('humanize');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 inline-flex">
            <button
              onClick={() => setActiveTab('humanize')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'humanize' 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Humanize Text
            </button>
            <button
              onClick={() => setActiveTab('detect')}
              className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all ${
                activeTab === 'detect' 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Detect AI Text
            </button>
          </div>
        </div>

        {/* Active Tab Content */}
        {activeTab === 'humanize' ? <HumanizerTab /> : <DetectorTab />}
        
      </main>

      {/* Ad Footer */}
      <AdFooter />

      {/* Credit Footer */}
      <footer className="text-center pb-6 pt-2 text-xs text-gray-400">
        Built by Wasay
      </footer>
    </div>
  );
}
