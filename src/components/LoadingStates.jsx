import React from 'react';

// Animated Circle Spinner
export const CircleSpinner = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-16 h-16 flex items-center justify-center text-sm text-gray-500">
          Loading
        </div>
      </div>
    </div>
  );
};

// Pulse Dots Spinner
export const PulseDots = () => {
  return (
    <div className="flex justify-center items-center py-6 space-x-2">
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-150"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
      <div className="ml-3 text-gray-600">Fetching market data</div>
    </div>
  );
};

// Fancy Error Card
export const ErrorCard = ({ message }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-red-500">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error occurred</h3>
            <div className="mt-1 text-sm text-red-700">
              {message}
            </div>
            <div className="mt-3">
              <button className="px-3 py-1 text-xs font-medium rounded-md bg-red-50 text-red-800 hover:bg-red-100">
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage Examples
export const Examples = () => {
  // Example states
  const isLoading = true;
  const error = { message: "Failed to fetch market data. Please check your connection." };

  return (
    <div className="space-y-6">
      {/* Original examples */}
      {isLoading && <div className="text-center py-4">Loading market data...</div>}
      {error && <div className="text-red-500">Error: {error.message}</div>}
      
      {/* New examples */}
      <CircleSpinner />
      <PulseDots />
      <ErrorCard message={error.message} />
    </div>
  );
};