import { useEffect } from 'react';
import { HumanizerTab } from '../components/HumanizerTab';
import { Link } from 'react-router-dom';

export function ChatGPTHumanizerPage() {
  useEffect(() => {
    document.title = "Free ChatGPT Humanizer - Make ChatGPT Text Sound Natural | Undetecta";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Free tool to humanize ChatGPT text so it sounds natural and human. No signup required.");
    }
  }, []);

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Intro Section */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Free ChatGPT Humanizer – Make ChatGPT Text Sound Natural
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            ChatGPT produces impressive responses, but its text often sounds robotic, relies on repetitive phrasing, and adheres to an overly predictable, mechanical structure. Our free ChatGPT humanizer rewrites and refines your ChatGPT-generated drafts into smooth, authentic human writing that sounds completely natural.
          </p>
        </div>

        {/* The Humanizer Tool */}
        <div className="mb-16">
          <HumanizerTab />
        </div>
        
      </main>

      {/* How It Works Section */}
      <section className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold mb-3">1</div>
            <h3 className="font-medium text-gray-900 mb-2">Paste ChatGPT Output</h3>
            <p className="text-sm text-gray-600">Copy your ChatGPT draft and paste it directly into the input box above.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold mb-3">2</div>
            <h3 className="font-medium text-gray-900 mb-2">Choose Tone</h3>
            <p className="text-sm text-gray-600">Select the tone (Standard, Casual, Professional, or Academic) that matches your audience.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold mb-3">3</div>
            <h3 className="font-medium text-gray-900 mb-2">Get Natural Rewrite</h3>
            <p className="text-sm text-gray-600">Click Humanize and instantly receive a natural, humanized rewrite that sounds genuinely written by you.</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Does this work specifically with ChatGPT text?</h3>
            <p className="text-sm text-gray-600">Yes! The tool is tailored to identify and remove repetitive sentence patterns, telltale transition phrases, and rigid structures typical of ChatGPT (including GPT-3.5, GPT-4, and GPT-4o).</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Is it free?</h3>
            <p className="text-sm text-gray-600">Yes, our ChatGPT humanizer is 100% free with no subscription, account creation, or credit card required.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Will it change the meaning of my ChatGPT output?</h3>
            <p className="text-sm text-gray-600">No. It preserves your core concepts, arguments, and key details while restructuring phrasing and varying vocabulary to achieve a natural human cadence.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Can I use it for essays or emails?</h3>
            <p className="text-sm text-gray-600">Yes, you can use it for academic essays, professional correspondence, work emails, articles, and creative writing. Always remember to check your school or workplace's guidelines regarding AI-assisted writing.</p>
          </div>
        </div>
      </section>

      {/* Related Tools Section */}
      <section className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mb-8 text-center border-t border-gray-100 mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Related Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/ai-humanizer" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm shadow-sm"
          >
            Explore General AI Humanizer
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
          <Link 
            to="/ai-detector" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-medium text-sm shadow-sm"
          >
            Check Out Our Free AI Detector
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
