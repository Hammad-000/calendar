import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate, Navigate } from 'react-router-dom';
import MonthCalendar from './MonthCalendar';

const months = [
  { name: 'January', path: 'january', days: 31, color: 'from-blue-400 to-cyan-400' },
  { name: 'February', path: 'february', days: 28, color: 'from-pink-400 to-rose-400' },
  { name: 'March', path: 'march', days: 31, color: 'from-green-400 to-emerald-400' },
  { name: 'April', path: 'april', days: 30, color: 'from-purple-400 to-violet-400' },
  { name: 'May', path: 'may', days: 31, color: 'from-yellow-400 to-orange-400' },
  { name: 'June', path: 'june', days: 30, color: 'from-red-400 to-pink-400' },
  { name: 'July', path: 'july', days: 31, color: 'from-blue-500 to-indigo-500' },
  { name: 'August', path: 'august', days: 31, color: 'from-teal-400 to-cyan-500' },
  { name: 'September', path: 'september', days: 30, color: 'from-amber-400 to-orange-400' },
  { name: 'October', path: 'october', days: 31, color: 'from-purple-500 to-pink-500' },
  { name: 'November', path: 'november', days: 30, color: 'from-brown-400 to-amber-600' },
  { name: 'December', path: 'december', days: 31, color: 'from-sky-400 to-blue-500' },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getCurrentMonthPath = () => {
  return months[new Date().getMonth()].path;
};

import { createContext, useContext } from 'react';

const defaultTheme = {
  name: 'light',
  backgroundColor: 'bg-gray-50',
  textColor: 'text-gray-800',
  headerTextColor: 'text-gray-800',
  buttonColor: 'bg-gray-200 hover:bg-gray-300',
  accentColor: 'from-blue-400 to-cyan-400',
  weekendColor: 'text-red-500 font-semibold',
  cardBg: 'bg-white',
  borderColor: 'border-gray-200',
  shadow: 'shadow-xl',
  calendarBg: 'bg-white',
  todayBg: 'bg-gradient-to-r from-blue-200 to-cyan-100',
};

const darkTheme = {
  name: 'dark',
  backgroundColor: 'bg-gray-900',
  textColor: 'text-gray-200',
  headerTextColor: 'text-white',
  buttonColor: 'bg-gray-800 hover:bg-gray-700 text-white',
  accentColor: 'from-indigo-500 to-purple-500',
  weekendColor: 'text-yellow-400 font-semibold',
  cardBg: 'bg-gray-800',
  borderColor: 'border-gray-700',
  shadow: 'shadow-lg shadow-gray-900',
  calendarBg: 'bg-gray-800',
  todayBg: 'bg-gradient-to-r from-indigo-800 to-purple-800',
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => 
      prevTheme.name === 'light' ? darkTheme : defaultTheme
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function Calendar() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const getCurrentMonthIndex = () => {
    const index = months.findIndex(month =>
      location.pathname.endsWith(month.path)
    );

    return index === -1 ? new Date().getMonth() : index;
  };

  const currentMonthIndex = getCurrentMonthIndex();

  const handlePrevMonth = () => {
    const prevIndex = (currentMonthIndex - 1 + months.length) % months.length;
    navigate(months[prevIndex].path);
  };

  const handleNextMonth = () => {
    const nextIndex = (currentMonthIndex + 1) % months.length;
    navigate(months[nextIndex].path);
  };

  const handlePrevYear = () => {
    setCurrentYear(prevYear => prevYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(prevYear => prevYear + 1);
  };

  const currentMonth = months[currentMonthIndex] || months[0];

  return (
    <div className={`min-h-screen ${theme.backgroundColor} ${theme.textColor} font-sans p-4 md:p-6 lg:p-8 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold ${theme.headerTextColor} mb-2`}>
              Calendar {currentYear}
            </h1>
            <p className={`${theme.textColor} text-lg opacity-80`}>Navigate through months and track your days</p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className={`inline-flex items-center px-4 py-2 ${theme.cardBg} rounded-full ${theme.shadow}`}>
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className={`${theme.textColor} font-medium`}>Today: {new Date().toLocaleDateString()}</span>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-3 ${theme.buttonColor} rounded-full transition-all duration-200 ${theme.shadow}`}
              aria-label="Toggle theme"
            >
              {theme.name === 'light' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-2xl ${theme.shadow} overflow-hidden ${theme.borderColor} border transition-colors duration-300`}>
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className={`text-3xl font-bold ${theme.headerTextColor}`}>{currentMonth.name} {currentYear}</h2>
                <div className="flex items-center mt-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${currentMonth.color} mr-2`}></div>
                  <span className={`${theme.textColor} opacity-80`}>{currentMonth.days} days</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className={`p-2 ${theme.buttonColor} rounded-lg transition-colors ${theme.borderColor} border`}
                  onClick={handlePrevMonth}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className={`p-2 ${theme.buttonColor} rounded-lg transition-colors ${theme.borderColor} border`}
                  onClick={handleNextMonth}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative">
              <Routes>
                <Route
                  index
                  element={<Navigate to={getCurrentMonthPath()} replace />}
                />
                {months.map((month) => (
                  <Route
                    key={month.path}
                    path={month.path}
                    element={
                      <MonthCalendar
                        name={month.name}
                        days={daysOfWeek}
                        totalDays={month.days}
                        theme={{
                          headerText: `${theme.headerTextColor} font-semibold uppercase text-sm`,
                          dayCell: `p-4 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer relative group ${theme.calendarBg}`,
                          weekend: theme.weekendColor,
                          today: `${theme.todayBg} border-2 border-blue-200`,
                          regularDay: `${theme.textColor} hover:bg-gray-700`,
                          monthColor: month.color,
                          borderColor: theme.borderColor,
                        }}
                        year={currentYear}
                      />
                    }
                  />
                ))}
              </Routes>
            </div>
          </div>

          <div className="m-6">
            <h2 className={`text-xl font-semibold ${theme.headerTextColor} mb-4`}>Select Month</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {months.map((month, index) => (
                <NavLink
                  key={month.path}
                  to={month.path}
                  className={({ isActive }) =>
                    `group relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1 ${isActive
                      ? `bg-gradient-to-r ${month.color} text-white shadow-xl scale-105`
                      : `${theme.cardBg} ${theme.textColor} hover:shadow-lg ${theme.borderColor} border`
                    }`
                  }
                  onMouseEnter={() => setHoveredMonth(month.path)}
                  onMouseLeave={() => setHoveredMonth(null)}
                >
                  <div className="relative z-10">
                    <div className="text-2xl font-bold mb-1">{String(index + 1).padStart(2, '0')}</div>
                    <div className="font-semibold">{month.name}</div>
                    <div className="text-sm opacity-80 mt-1">{month.days} days</div>
                  </div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${month.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                </NavLink>
              ))}
            </div>
          </div>

          <div className={`border-t ${theme.borderColor} ${theme.cardBg} px-6 py-4`}>
            <div className={`flex items-center justify-between text-sm ${theme.textColor}`}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span>Current Month</span>
                </div>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${theme.name === 'light' ? 'bg-red-400' : 'bg-yellow-400'} mr-2`}></div>
                  <span>Weekends</span>
                </div>
              </div>
              <div className="opacity-80">
                Total: 365 days in {currentYear}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`${theme.cardBg} rounded-xl p-5 ${theme.shadow} ${theme.borderColor} border`}>
            <div className={`${theme.textColor} opacity-80 text-sm mb-1`}>Days This Year</div>
            <div className={`text-2xl font-bold ${theme.headerTextColor}`}>365</div>
          </div>
          <div className={`${theme.cardBg} rounded-xl p-5 ${theme.shadow} ${theme.borderColor} border`}>
            <div className={`${theme.textColor} opacity-80 text-sm mb-1`}>Weekends</div>
            <div className={`text-2xl font-bold ${theme.weekendColor}`}>104</div>
          </div>
          <div className={`${theme.cardBg} rounded-xl p-5 ${theme.shadow} ${theme.borderColor} border`}>
            <div className={`${theme.textColor} opacity-80 text-sm mb-1`}>Current Week</div>
            <div className="text-2xl font-bold text-blue-500">{
              Math.ceil((new Date() - new Date(currentYear, 0, 1)) / (1000 * 60 * 60 * 24 * 7))
            }</div>
          </div>
          <div className={`${theme.cardBg} rounded-xl p-5 ${theme.shadow} ${theme.borderColor} border`}>
            <div className={`${theme.textColor} opacity-80 text-sm mb-1`}>Days Remaining</div>
            <div className="text-2xl font-bold text-green-500">
              {365 - Math.floor((new Date() - new Date(currentYear, 0, 1)) / (1000 * 60 * 60 * 24))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div className="flex items-center space-x-2">
            <span className={`${theme.textColor} text-sm font-medium`}>
              {theme.name === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
            <div className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${theme.name === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}
                 onClick={toggleTheme}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${theme.name === 'light' ? 'translate-x-0' : 'translate-x-6'}`}></div>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handlePrevYear}
              className={`px-4 py-2 ${theme.buttonColor} rounded-lg transition-colors ${theme.borderColor} border`}
            >
              Prev Year
            </button>
            <button
              onClick={handleNextYear}
              className={`px-4 py-2 ${theme.buttonColor} rounded-lg transition-colors ${theme.borderColor} border`}
            >
              Next Year
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;