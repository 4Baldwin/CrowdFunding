import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center justify-center">
      <div className="space-y-6 text-center">
       
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-blue-900">Loading</h2>
          <p className="text-blue-600/80 animate-pulse">Please wait a moment...</p>
        </div>
        <div className="w-48 h-1.5 bg-indigo-100 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-blue-500 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}