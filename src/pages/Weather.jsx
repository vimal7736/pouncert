import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { WiSunrise, WiSunset, WiStrongWind, WiHumidity, WiBarometer } from 'react-icons/wi';
import { FiCompass, FiEye, FiMapPin, FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import { IoSunnyOutline, IoCloudyOutline } from 'react-icons/io5';

const WeatherDashboard = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('Velliparamba');
    const [searchInput, setSearchInput] = useState('');
    const [time, setTime] = useState(new Date());
    const [darkMode, setDarkMode] = useState(false);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Fetch weather data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error("Error fetching weather data:", error);
                setError("City not found or network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            setCity(searchInput.trim());
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    if (loading) return (
        <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className={`text-4xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}
            >
                <IoSunnyOutline />
            </motion.div>
        </div>
    );

    if (error) return (
        <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-red-500'}`}>
            <div className="text-xl mb-4">{error}</div>
            <form onSubmit={handleSearch} className="flex">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search city..."
                    className={`px-4 py-2 rounded-l-lg focus:outline-none ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} border`}
                />
                <button
                    type="submit"
                    className={`px-4 py-2 rounded-r-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                >
                    <FiSearch />
                </button>
            </form>
        </div>
    );

    if (!weatherData) return (
        <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-red-500'}`}>
            <div className="text-xl">Failed to load weather data</div>
        </div>
    );

    // Convert Unix timestamps to readable time
    const formatTime = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Wind direction helper
    const getWindDirection = (degrees) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round((degrees % 360) / 45);
        return directions[index % 8];
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800'} p-6`}>
            {/* Toggle Dark Mode & Search Bar */}
            <div className="flex justify-between items-center mb-6 max-w-6xl mx-auto">
                <button
                    onClick={toggleDarkMode}
                    className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-white text-gray-800'} shadow`}
                >
                    {darkMode ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
                </button>

                <form onSubmit={handleSearch} className="flex flex-1 max-w-md mx-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search city..."
                        className={`px-4 py-2 rounded-l-lg focus:outline-none flex-grow ${darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800 border-gray-200'} border`}
                    />
                    <button
                        type="submit"
                        className={`px-4 py-2 rounded-r-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
                    >
                        <FiSearch />
                    </button>
                </form>
            </div>

            {/* Header with location and time */}
            <header className="mb-8 text-center">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-2"
                >
                    <FiMapPin className="text-red-500 text-xl" />
                    <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                        {weatherData.name}, {weatherData.sys.country}
                    </h1>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}
                >
                    {time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    <span className="mx-2">•</span>
                    {time.toLocaleTimeString()}
                </motion.p>
            </header>

            {/* Main weather card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {/* Primary weather info */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 col-span-1 lg:col-span-2`}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                                alt={weatherData.weather[0].description}
                                className="w-32 h-32"
                            />
                            <div>
                                <h2 className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {Math.round(weatherData.main.temp)}°C
                                </h2>
                                <p className={`text-xl capitalize ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {weatherData.weather[0].description}
                                </p>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    Feels like {Math.round(weatherData.main.feels_like)}°C
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4 md:mt-0">
                            <div className="flex items-center gap-2">
                                <WiHumidity className="text-3xl text-blue-500" />
                                <div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Humidity</p>
                                    <p className="font-semibold">{weatherData.main.humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <WiStrongWind className="text-3xl text-blue-500" />
                                <div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wind</p>
                                    <p className="font-semibold">
                                        {weatherData.wind.speed} m/s {getWindDirection(weatherData.wind.deg)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <WiBarometer className="text-3xl text-blue-500" />
                                <div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Pressure</p>
                                    <p className="font-semibold">{weatherData.main.pressure} hPa</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <FiEye className="text-2xl text-blue-500" />
                                <div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Visibility</p>
                                    <p className="font-semibold">{weatherData.visibility / 1000} km</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Sunrise/Sunset and Map */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
                    >
                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Sun & Moon</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <WiSunrise className="text-4xl text-orange-400" />
                                <div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sunrise</p>
                                    <p className="font-semibold">{formatTime(weatherData.sys.sunrise)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <WiSunset className="text-4xl text-purple-500" />
                                <div>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sunset</p>
                                    <p className="font-semibold">{formatTime(weatherData.sys.sunset)}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
                    >
                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Location</h3>
                        <div className="flex items-center gap-3 mb-3">
                            <FiCompass className="text-2xl text-blue-500" />
                            <div>
                                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Coordinates</p>
                                <p className="font-semibold">
                                    {weatherData.coord.lat}°N, {weatherData.coord.lon}°E
                                </p>
                            </div>
                        </div>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <iframe
                                title="location-map"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight="0"
                                marginWidth="0"
                                src={`https://maps.google.com/maps?q=${weatherData.coord.lat},${weatherData.coord.lon}&z=12&output=embed`}
                                className="rounded-lg"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Additional weather details */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mt-6 max-w-6xl mx-auto`}
            >
                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Detailed Conditions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Temperature Range</p>
                        <p className="font-semibold">
                            {Math.round(weatherData.main.temp_min)}°C - {Math.round(weatherData.main.temp_max)}°C
                        </p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ground Level</p>
                        <p className="font-semibold">{weatherData.main.grnd_level} hPa</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sea Level</p>
                        <p className="font-semibold">{weatherData.main.sea_level} hPa</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Wind Gusts</p>
                        <p className="font-semibold">
                            {weatherData.wind.gust ? `${weatherData.wind.gust} m/s` : 'N/A'}
                        </p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Cloud Cover</p>
                        <p className="font-semibold">{weatherData.clouds.all}%</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Timezone</p>
                        <p className="font-semibold">UTC{weatherData.timezone >= 0 ? '+' : ''}{weatherData.timezone / 3600}</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Weather ID</p>
                        <p className="font-semibold">{weatherData.weather[0].id}</p>
                    </div>
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-blue-50'} p-4 rounded-lg`}>
                        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Data Time</p>
                        <p className="font-semibold">
                            {new Date(weatherData.dt * 1000).toLocaleString()}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WeatherDashboard;