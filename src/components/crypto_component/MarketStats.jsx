import React from 'react'
import { useGetMarketStatsQuery } from '../../app/features/crypto/cryptoApi';
import { CircleSpinner, PulseDots, ErrorCard } from '@/components/LoadingStates';

const MarketStats = () => {

    const {data, isLoading, error} = useGetMarketStatsQuery();

    const stats = data?.data;
    
    if (isLoading) return <PulseDots />;
    if (error) return <ErrorCard message={error.message} />;
    console.log(data);

     const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatPercent = (num) => {
    return `${num?.toFixed(2)}%`;
  };

  // Get top 3 dominant coins
  const topCoins = Object.entries(stats?.market_cap_percentage || {})
    .slice(0, 3)
    .map(([coin, percent]) => ({ coin, percent }));

  return (
    <div className=" text-blue-400 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">🌐 Global Crypto Market Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Market Cap */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Market Cap</h3>
          <p className="text-2xl text-green-400">
            ${(stats?.total_market_cap?.usd)}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {formatPercent(stats?.market_cap_change_percentage_24h_usd)} (24h)
          </p>
        </div>

        {/* 24h Volume */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">24h Trading Volume</h3>
          <p className="text-2xl text-blue-400">
            ${formatNumber(stats?.total_volume?.usd)}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Active Cryptocurrencies</h3>
          <p className="text-2xl text-purple-400">
            {formatNumber(stats?.active_cryptocurrencies)}
          </p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg col-span-1 md:col-span-2 lg:col-span-3">
          <h3 className="text-lg font-semibold mb-2">Market Dominance</h3>
          <div className="flex flex-wrap gap-2">
            {topCoins.map(({ coin, percent }) => (
              <div key={coin} className="bg-gray-700 px-3 py-2 rounded-md">
                <span className="font-medium">{coin.toUpperCase()}: </span>
                <span className="text-yellow-400">{percent.toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Last updated: {new Date(stats?.updated_at * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default MarketStats;