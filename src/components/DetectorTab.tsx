import { useState } from 'react';
import { DetectResponse } from '../types';
import { Loader2, Search, ClipboardPaste, Trash2 } from 'lucide-react';

export function DetectorTab() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<DetectResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputText(text);
      setError("");
    } catch (err) {
      console.error("Failed to paste", err);
      setError("Clipboard access restricted by browser. Please click inside the box and press Ctrl+V (Windows) or Cmd+V (Mac) to paste.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleClear = () => {
    setInputText("");
    setResult(null);
    setError("");
  };

  const handleDetect = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError("");
    setResult(null);
    
    try {
      const res = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      
      const data: DetectResponse = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to analyze text");
      }
      
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <label htmlFor="detect-input" className="font-medium text-gray-700">
            Paste text to check
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePaste}
              className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl transition-colors active:bg-blue-200"
              title="Paste from Clipboard"
            >
              <ClipboardPaste className="w-4 h-4" />
              Paste
            </button>
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors active:bg-red-200"
              title="Clear Text"
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>
        </div>
        
        <textarea
          id="detect-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste the text you want to analyze..."
          className="w-full h-64 resize-none rounded-2xl bg-gray-50 border border-gray-200 p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base/relaxed"
        />
        
        <button
          onClick={handleDetect}
          disabled={isLoading || !inputText.trim()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Check Text
              <Search className="w-5 h-5" />
            </>
          )}
        </button>
        
        {error && (
          <div className="text-red-500 text-sm mt-2 px-2 text-center">
            {error}
          </div>
        )}
      </div>

      {result && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            AI-Generated Probability
          </div>
          <div className="text-5xl font-bold text-gray-900 tracking-tight">
            {result.percentage}%
          </div>
          <div className="text-lg text-gray-600 max-w-lg mt-2">
            {result.explanation}
          </div>
        </div>
      )}
    </div>
  );
}
