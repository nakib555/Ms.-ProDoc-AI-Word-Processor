import React from 'react';
import { Skeleton } from './Skeleton';

export function GhostImage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background glowing sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/30 via-transparent to-indigo-100/30 dark:from-purple-900/20 dark:to-indigo-900/20 animate-pulse"></div>
      
      {/* Main skeleton canvas */}
      <Skeleton className="w-[80%] aspect-square rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 shadow-xl relative overflow-hidden flex items-center justify-center">
         {/* Internal shimmer line */}
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 dark:via-purple-500/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite_ease-in-out]"></div>
         
         <div className="flex flex-col items-center gap-3 opacity-60">
            {/* Shapes simulating image composition */}
            <div className="flex gap-4 items-end mb-2">
                <Skeleton className="w-12 h-20 rounded-lg bg-indigo-200/50 dark:bg-indigo-700/30" />
                <Skeleton className="w-20 h-28 rounded-xl bg-purple-200/50 dark:bg-purple-700/30" />
                <Skeleton className="w-16 h-16 rounded-full bg-blue-200/50 dark:bg-blue-700/30" />
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-clip-text">Creating your masterpiece...</span>
         </div>
      </Skeleton>
    </div>
  );
}