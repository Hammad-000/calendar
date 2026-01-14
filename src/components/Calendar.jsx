import React, { useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom';
import MonthCalendar from './MonthCalendar';

const months = [
  { name: 'January', path: '/january', days: 31, color: 'from-blue-400 to-cyan-400' },
  { name: 'February', path: '/february', days: 28, color: 'from-pink-400 to-rose-400' },
  { name: 'March', path: '/march', days: 31, color: 'from-green-400 to-emerald-400' },
  { name: 'April', path: '/april', days: 30, color: 'from-purple-400 to-violet-400' },
  { name: 'May', path: '/may', days: 31, color: 'from-yellow-400 to-orange-400' },
  { name: 'June', path: '/june', days: 30, color: 'from-red-400 to-pink-400' },
  { name: 'July', path: '/july', days: 31, color: 'from-blue-500 to-indigo-500' },
  { name: 'August', path: '/august', days: 31, color: 'from-teal-400 to-cyan-500' },
  { name: 'September', path: '/september', days: 30, color: 'from-amber-400 to-orange-400' },
  { name: 'October', path: '/october', days: 31, color: 'from-purple-500 to-pink-500' },
  { name: 'November', path: '/november', days: 30, color: 'from-brown-400 to-amber-600' },
  { name: 'December', path: '/december', days: 31, color: 'from-sky-400 to-blue-500' },
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar() {
  const [currentYear] = useState(new Date().getFullYear());
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentMonthIndex = () => {
    const currentPath = location.pathname;
    const monthIndex = months.findIndex(month => month.path === currentPath);
    return monthIndex === -1 ? 0 : monthIndex;
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

  const currentMonth = months[currentMonthIndex] || months[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              Calendar {currentYear}
            </h1>
            <p className="text-gray-600 text-lg">Navigate through months and track your days</p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
              <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-700 font-medium">Today: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{currentMonth.name} {currentYear}</h2>
                <div className="flex items-center mt-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${currentMonth.color} mr-2`}></div>
                  <span className="text-gray-600">{currentMonth.days} days</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  onClick={handlePrevMonth}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  onClick={handleNextMonth}
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative">
              <Routes>
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
                          headerText: 'text-gray-600 font-semibold uppercase text-sm',
                          dayCell: 'p-4 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer relative group',
                          weekend: 'text-red-500 font-semibold',
                          today: 'bg-gradient-to-r from-blue-200 to-cyan-100 border-2 border-blue-200',
                          regularDay: 'text-gray-700 hover:bg-gray-300',
                          monthColor: month.color,
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
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Month</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {months.map((month, index) => (
                <NavLink
                  key={month.path}
                  to={month.path}
                  className={({ isActive }) =>
                    `group relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:-translate-y-1 ${
                      isActive
                        ? `bg-gradient-to-r ${month.color} text-white shadow-xl scale-105`
                        : 'bg-white text-gray-700 hover:shadow-lg'
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
          
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                  <span>Current Month</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                  <span>Weekends</span>
                </div>
              </div>
              <div className="text-gray-500">
                Total: 365 days in {currentYear}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Days This Year</div>
            <div className="text-2xl font-bold text-gray-800">365</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Weekends</div>
            <div className="text-2xl font-bold text-red-500">104</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Current Week</div>
            <div className="text-2xl font-bold text-blue-500">{
              Math.ceil((new Date() - new Date(currentYear, 0, 1)) / (1000 * 60 * 60 * 24 * 7))
            }</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="text-gray-500 text-sm mb-1">Days Remaining</div>
            <div className="text-2xl font-bold text-green-500">
              {365 - Math.floor((new Date() - new Date(currentYear, 0, 1)) / (1000 * 60 * 60 * 24))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;