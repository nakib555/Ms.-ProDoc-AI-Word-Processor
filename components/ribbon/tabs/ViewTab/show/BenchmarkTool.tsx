import React, { useState } from 'react';
import { Gauge } from 'lucide-react';
import { BenchmarkModal } from './BenchmarkModal';

export const BenchmarkTool: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors text-left w-full group"
        title="Open 1,000-Page Benchmark & Scale Telemetry"
      >
        <Gauge size={14} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
        <span className="font-semibold text-indigo-700 dark:text-indigo-300">1,000-Page Scale Tool</span>
      </button>

      <BenchmarkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
