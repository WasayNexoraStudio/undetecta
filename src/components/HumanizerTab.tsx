import { useState } from 'react';
import { Tone, HumanizeResponse } from '../types';
import { Copy, Check, Loader2, ArrowRight, ClipboardPaste, Trash2 } from 'lucide-react';

const TONES: Tone[] = ["Casual", "Professional", "Academic"];

export function HumanizerTab() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [tone, setTone] = useState<Tone>("Casual");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleHumanize = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError("");
    setOutputText("");
    
    try {
      const res = await fetch("/api/humanize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, tone }),
      });
      
      const data: HumanizeResponse = await res.json();
      
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to humanize text");
      }
      
      setOutputText(data.result || "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

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
    setOutputText("");
    setError("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Left Panel: Input */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <label htmlFor="input-text" className="font-medium text-gray-700">
              Paste your AI text here
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
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as Tone)}
            className="text-sm bg-gray-50 border border-gray-200 text-gray-700 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer"
          >
            {TONES.map(t => (
              <option key={t} value={t}>{t} Tone</option>
            ))}
          </select>
        </div>
        
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste the text you want to humanize..."
          className="w-full h-80 resize-none rounded-2xl bg-gray-50 border border-gray-200 p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base/relaxed"
        />
        
        <button
          onClick={handleHumanize}
          disabled={isLoading || !inputText.trim()}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-medium py-3.5 px-6 rounded-2xl transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Humanizing...
            </>
          ) : (
            <>
              Humanize Text
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
        
        {error && (
          <div className="text-red-500 text-sm mt-2 px-2">
            {error}
          </div>
        )}
      </div>

      {/* Right Panel: Output */}
      <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-700">
            Humanized Output
          </span>
          <button
            onClick={handleCopy}
            disabled={!outputText || isLoading}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors px-3 py-1.5 rounded-xl hover:bg-gray-50 active:bg-gray-100"
            title="Copy to Clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        
        <div className="relative">
          <textarea
            readOnly
            value={outputText}
            placeholder={isLoading ? "Humanizing your text..." : "Your rewritten text will appear here..."}
            className="w-full h-80 resize-none rounded-2xl bg-gray-50 border border-gray-200 p-4 text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-base/relaxed"
          />
          
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-2xl border border-transparent flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-blue-600 font-medium animate-pulse">Crafting human response...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
