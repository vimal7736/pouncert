import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  useGetMarketStatsQuery, 
  useGetCryptosQuery, 
  useGetCoinDetailsQuery, 
  useGetCoinHistoryQuery,
  useGetTrendingCoinsQuery,
  useSearchCryptoQuery,
  useGetOHLCQuery
} from '@/app/features/crypto/cryptoApi';

const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Loading spinner component
const Spinner = () => (
  <div className="flex justify-center items-center py-4">
    <div className="w-10 h-10 border-4 border-gray-400 border-t-black rounded-full animate-spin"></div>
    <span className="ml-3 text-gray-600">Loading...</span>
  </div>
);

// Error message component
const ErrorMessage = ({ message }) => (
  <div className="border-l-4 border-black p-4 mb-4">
    <div className="flex">
      <div className="ml-3">
        <p className="text-sm text-gray-700">{message}</p>
      </div>
    </div>
  </div>
);

// Card component for consistent styling
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-none border border-gray-200 p-6 ${className}`}>
    <h2 className="text-xl font-normal mb-4 text-black border-b border-gray-200 pb-2">{title}</h2>
    {children}
  </div>
);

// Market Stats Component
const MarketStats = () => {
  const { data, isLoading, error } = useGetMarketStatsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.toString()} />;

  return (
    <Card title="Global Crypto Stats" className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Market Cap</p>
          <p className="text-xl font-normal text-black">${formatNumber(data?.data.total_market_cap.usd)}</p>
        </div>
        <div className="p-4 border border-gray-200">
          <p className="text-sm text-gray-600">24h Volume</p>
          <p className="text-xl font-normal text-black">${formatNumber(data?.data.total_volume.usd)}</p>
        </div>
        <div className="p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Active Cryptocurrencies</p>
          <p className="text-xl font-normal text-black">{formatNumber(data?.data.active_cryptocurrencies)}</p>
        </div>
      </div>
    </Card>
  );
};

// Crypto List Component
const CryptoList = ({ page = 1, onSelectCoin }) => {
  const { data, isLoading, error } = useGetCryptosQuery({ page });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.toString()} />;

  return (
    <Card title="Top Cryptocurrencies">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Coin</th>
              <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-normal text-gray-500 uppercase tracking-wider">24h Change</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((coin) => (
              <tr 
                key={coin.id} 
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectCoin(coin.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 mr-2 filter grayscale" />
                    <div>
                      <div className="font-normal">{coin.name}</div>
                      <div className="text-sm text-gray-500">{coin.symbol.toUpperCase()}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${formatNumber(coin.current_price)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {coin.price_change_percentage_24h > 0 ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

// Coin Detail Component
const CoinDetail = ({ coinId }) => {
  const { data, isLoading, error } = useGetCoinDetailsQuery(coinId);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.toString()} />;
  if (!coinId) return <ErrorMessage message="No coin selected" />;

  return (
    <Card title={`${data?.name} Details`} className="mb-6">
      <div className="flex items-center mb-4">
        <img src={data?.image?.large} alt={data?.name} className="w-16 h-16 mr-4 filter grayscale" />
        <div>
          <h3 className="text-2xl font-normal">{data?.name} <span className="text-gray-500">({data?.symbol.toUpperCase()})</span></h3>
          <p className="text-lg font-normal">Rank #{data?.market_cap_rank}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="p-4 border border-gray-200">
          <p className="text-gray-600">Current Price</p>
          <p className="text-2xl font-normal">${formatNumber(data?.market_data.current_price.usd)}</p>
        </div>
        <div className="p-4 border border-gray-200">
          <p className="text-gray-600">Market Cap</p>
          <p className="text-2xl font-normal">${formatNumber(data?.market_data.market_cap.usd)}</p>
        </div>
        <div className="p-4 border border-gray-200">
          <p className="text-gray-600">24h Volume</p>
          <p className="text-2xl font-normal">${formatNumber(data?.market_data.total_volume.usd)}</p>
        </div>
        <div className="p-4 border border-gray-200">
          <p className="text-gray-600">24h Change</p>
          <p className="text-2xl font-normal">
            {data?.market_data.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </div>
      
      <div className="mt-4">
        <h4 className="font-normal mb-2">Description:</h4>
        <div className="text-sm text-gray-600" dangerouslySetInnerHTML={{ __html: data?.description?.en?.slice(0, 300) + '...' }} />
      </div>
    </Card>
  );
};

// Coin History Chart Component
const CoinHistoryChart = ({ coinId }) => {
  const [days, setDays] = useState(30);
  const { data, isLoading, error } = useGetCoinHistoryQuery({ coinId, days });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.toString()} />;
  if (!coinId) return <ErrorMessage message="No coin selected" />;

  const chartData = {
    labels: data?.prices?.map((price) => new Date(price[0]).toLocaleDateString()) || [],
    datasets: [{
      label: 'Price (USD)',
      data: data?.prices?.map((price) => price[1]) || [],
      borderColor: 'rgb(0, 0, 0)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderWidth: 1,
      pointRadius: 0,
      fill: true,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${coinId.toUpperCase()} Price History (${days} Days)`
      }
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value}`
        }
      }
    }
  };

  return (
    <Card title="Price History" className="mb-6">
      <div className="mb-4">
        <div className="inline-flex border border-gray-300" role="group">
          <button 
            className={`px-4 py-2 text-sm font-normal ${days === 7 ? 'bg-black text-white' : 'text-gray-700 bg-white'} hover:bg-gray-100 focus:outline-none`}
            onClick={() => setDays(7)}
          >
            7D
          </button>
          <button 
            className={`px-4 py-2 text-sm font-normal ${days === 30 ? 'bg-black text-white' : 'text-gray-700 bg-white'} border-l border-r border-gray-300 hover:bg-gray-100 focus:outline-none`}
            onClick={() => setDays(30)}
          >
            30D
          </button>
          <button 
            className={`px-4 py-2 text-sm font-normal ${days === 90 ? 'bg-black text-white' : 'text-gray-700 bg-white'} hover:bg-gray-100 focus:outline-none`}
            onClick={() => setDays(90)}
          >
            90D
          </button>
        </div>
      </div>
      {data?.prices?.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500 py-8">No price data available</p>
      )}
    </Card>
  );
};

const TrendingCoins = ({ onSelectCoin }) => {
  const { data, isLoading, error } = useGetTrendingCoinsQuery();
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.toString()} />;

  return (
    <Card title="Trending Coins" className="mb-6">
      <ul className="divide-y divide-gray-200">
        {data?.coins.slice(0, 3).map((coin) => (
          <li 
            key={coin.item.id} 
            className="py-3 flex items-center hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectCoin(coin.item.id)}
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden mr-3">
              <img src={coin.item.small} alt={coin.item.name} className="w-full h-full object-cover filter grayscale" />
            </span>
            <div className="flex-grow">
              <p className="font-normal">{coin.item.name}</p>
              <p className="text-sm text-gray-500">{coin.item.symbol}</p>
            </div>
            <div className="flex-shrink-0 text-sm">
              <span className="border border-gray-300 text-gray-800 px-2 py-1">Rank #{coin.item.market_cap_rank}</span>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

// Crypto Search Component
const CryptoSearch = ({ onSelectCoin }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading, error } = useSearchCryptoQuery(searchTerm, {
    skip: searchTerm.length < 2, // Don't search until 2+ characters
  });

  return (
    <Card title="Search Cryptocurrencies" className="mb-6">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search coins..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 focus:ring-black focus:border-black"
        />
        {searchTerm.length > 0 && (
          <button 
            className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
            onClick={() => setSearchTerm('')}
          >
            &times;
          </button>
        )}
      </div>
      
      {isLoading && <Spinner />}
      {error && <ErrorMessage message={error.toString()} />}
      
      {data?.coins && data.coins.length > 0 ? (
        <ul className="mt-4 divide-y divide-gray-200">
          {data.coins.map((coin) => (
            <li 
              key={coin.id} 
              className="py-3 flex items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                onSelectCoin(coin.id);
                setSearchTerm('');
              }}
            >
              <img src={coin.thumb} alt={coin.name} className="w-8 h-8 mr-3 filter grayscale" />
              <div>
                <p className="font-normal">{coin.name}</p>
                <p className="text-sm text-gray-500">{coin.symbol}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : searchTerm.length >= 2 && !isLoading && (
        <p className="mt-4 text-gray-500 text-center">No results found</p>
      )}
    </Card>
  );
};

// Custom OHLC/Candlestick Chart Component
const OHLCChart = ({ coinId }) => {
  const [days, setDays] = useState(1);
  const { data, isLoading, error } = useGetOHLCQuery({ coinId, days });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.toString()} />;
  if (!coinId) return <ErrorMessage message="No coin selected" />;

  return (
    <Card title="Price Candles" className="mb-6">
      <div className="mb-4">
        <div className="inline-flex border border-gray-300" role="group">
          <button 
            className={`px-4 py-2 text-sm font-normal ${days === 1 ? 'bg-black text-white' : 'text-gray-700 bg-white'} hover:bg-gray-100 focus:outline-none`}
            onClick={() => setDays(1)}
          >
            1D
          </button>
          <button 
            className={`px-4 py-2 text-sm font-normal ${days === 7 ? 'bg-black text-white' : 'text-gray-700 bg-white'} border-l hover:bg-gray-100 focus:outline-none`}
            onClick={() => setDays(7)}
          >
            1W
          </button>
        </div>
      </div>
      
      {/* Custom candle visualization */}
      <div className="overflow-x-auto">
        <div className="min-w-full h-64 relative">
          {data && data.length > 0 ? (
            <>
              {(() => {
                const prices = data.flatMap(d => [d[1], d[2], d[3], d[4]]);
                const min = Math.min(...prices);
                const max = Math.max(...prices);
                const range = max - min;
                
                // Scale function to map price to pixel height
                const scaleY = (price) => {
                  return 100 - ((price - min) / range) * 100;
                };
                
                return (
                  <div className="flex items-end h-full">
                    {data.map((d, i) => {
                      const [timestamp, open, high, low, close] = d;
                      const date = new Date(timestamp);
                      const isUp = close >= open;
                      const candleColor = isUp ? 'bg-gray-800' : 'bg-white border border-gray-800';
                      const candleWidth = `${100 / Math.min(data.length, 30)}%`;
                      
                      // Calculate position values in percentage
                      const candleTop = `${Math.min(scaleY(open), scaleY(close))}%`;
                      const candleHeight = `${Math.abs(scaleY(open) - scaleY(close))}%`;
                      const wickTop = `${scaleY(high)}%`;
                      const wickHeight = `${scaleY(low) - scaleY(high)}%`;
                      
                      return (
                        <div key={i} className="flex flex-col items-center" style={{ width: candleWidth }}>
                          {/* Wick */}
                          <div 
                            className="w-px bg-gray-800" 
                            style={{ 
                              height: wickHeight, 
                              marginTop: wickTop
                            }}
                          ></div>
                          {/* Candle body */}
                          <div 
                            className={`w-4 ${candleColor}`}
                            style={{ 
                              height: candleHeight || '1px', 
                              marginTop: candleHeight ? '0' : '0.5px'
                            }}
                          ></div>
                          {/* Time label (show only few) */}
                          {i % 5 === 0 && (
                            <div className="text-xs mt-2 text-gray-500 transform -rotate-45 origin-top-left">
                              {date.getHours()}:{date.getMinutes().toString().padStart(2, '0')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No OHLC data available</p>
            </div>
          )}
        </div>
        
        {/* Price scale */}
        {data && data.length > 0 && (
          <div className="flex justify-between text-xs text-gray-500 mt-6">
            {(() => {
              const prices = data.flatMap(d => [d[1], d[2], d[3], d[4]]);
              const min = Math.min(...prices);
              const max = Math.max(...prices);
              return (
                <>
                  <div>${min.toFixed(2)}</div>
                  <div>${((max + min) / 2).toFixed(2)}</div>
                  <div>${max.toFixed(2)}</div>
                </>
              );
            })()}
          </div>
        )}
      </div>
    </Card>
  );
};

// Main Dashboard Component
const CryptoDashboard = () => {
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-normal text-black">Crypto Dashboard</h1>
        </div>
      </header>
      
      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Market Stats */}
          <div className="mb-6">
            <MarketStats />
          </div>
          
          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <CoinDetail coinId={selectedCoin} />
              
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-1">
              <CryptoSearch onSelectCoin={setSelectedCoin} />
              <TrendingCoins onSelectCoin={setSelectedCoin} />
            </div>
          </div>
          
          {/* Crypto List (Full Width) */}
          <div className="mt-6">
            <CryptoList page={page} onSelectCoin={setSelectedCoin} />
            
            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              <nav className="inline-flex border border-gray-200">
                <button 
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-sm font-normal text-gray-700 bg-gray-50 border-l border-r border-gray-200">
                  Page {page}
                </span>
                <button 
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CryptoDashboard;