import React from 'react';

const AsetTableSkeleton = () => {
  return (
    <div role="status" className="space-y-3 animate-pulse w-full">
      {[...Array(7)].map((_, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 w-full max-w-full"
        >
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 flex-1" />
          <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 flex-1" />
          <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 flex-1" />
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default AsetTableSkeleton;
