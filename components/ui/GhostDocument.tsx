import React from 'react';
import { Skeleton } from './Skeleton';

export function GhostDocument() {
  return (
    <div className="w-full flex flex-col items-center p-6 space-y-6">
      <div className="w-full max-w-2xl space-y-4">
        {/* Title skeleton */}
        <Skeleton className="h-10 w-3/4 rounded-lg bg-gradient-to-r from-indigo-100/50 via-slate-100/50 to-indigo-100/50 dark:from-indigo-900/50 dark:via-slate-800/50 dark:to-indigo-900/50" />
        
        {/* Paragraph skeletons */}
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        
        <div className="space-y-3 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-4/6" />
        </div>

        {/* Feature section skeleton */}
        <div className="pt-6 flex gap-4">
          <Skeleton className="h-24 w-1/3 rounded-xl" />
          <Skeleton className="h-24 w-1/3 rounded-xl" />
          <Skeleton className="h-24 w-1/3 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
