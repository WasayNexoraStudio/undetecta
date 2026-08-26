import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="py-8 px-6 text-center border-b border-gray-100 bg-white">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl">
          <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Undetecta
        </h1>
        <p className="text-gray-600 text-lg">
          Write like a human. Every time.
        </p>
      </div>
    </header>
  );
}
