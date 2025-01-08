import React from 'react';

export function IndicatorsSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
      <div className="px-4 py-5 sm:p-6">
        <div className="h-6 w-48 bg-white/10 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <div 
              key={index}
              className="bg-white/5 rounded-lg p-4 border border-white/10"
            >
              <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
              <div className="mt-2 h-8 w-24 bg-white/10 rounded animate-pulse"></div>
              <div className="mt-2 h-3 w-28 bg-white/10 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}