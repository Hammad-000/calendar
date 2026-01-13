import React from 'react';

function MonthCalendar({ name, days, totalDays, theme, year }) {
  const currentDate = new Date();
  const isCurrentMonth = currentDate.getMonth() === new Date(`${name} 1, ${year}`).getMonth() && 
                         currentDate.getFullYear() === year;
  
  const firstDayOfMonth = new Date(year, new Date(`${name} 1, ${year}`).getMonth(), 1).getDay();
  
  const renderDays = () => {
    const daysArray = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-16"></div>);
    }
    
    for (let day = 1; day <= totalDays; day++) {
      const isToday = isCurrentMonth && day === currentDate.getDate();
      const dayOfWeek = new Date(year, new Date(`${name} 1, ${year}`).getMonth(), day).getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
   
      
      daysArray.push(
        <div
          key={day}
          className={`
            ${theme.dayCell}
            flex flex-col items-center justify-center
            border border-gray-200
            transition-all duration-200
            relative
            ${isWeekend ? theme.weekend : theme.regularDay}
            ${isToday ? theme.today : ''}
       
            group
          `}
        >
          {/* Day number */}
          <div className="text-lg font-semibold mb-1">
            {day}
          </div>
          
          {/* Today indicator */}
          {isToday && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
          )}
          
          {/* Weekend indicator */}
          {isWeekend && (
            <div className="text-xs text-red-400 font-medium">
              {dayOfWeek === 0 ? 'Sun' : 'Sat'}
            </div>
          )}
          
          {/* Hover effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.monthColor} opacity-10 rounded-lg`}></div>
          </div>
          
      
        </div>
      );
    }
    
    return daysArray;
  };

  return (
    <div className="p-4 md:p-6">
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 md:gap-3">
        {/* Weekday headers */}
        {days.map((day, index) => {
          const isWeekend = index === 0 || index === 6;
          return (
            <div
              key={day}
              className={`
                ${theme.headerText}
                text-center py-3
                ${isWeekend ? 'text-red-500' : 'text-gray-600'}
                border-b border-gray-200
              `}
            >
              {day}
            </div>
          );
        })}

        {renderDays()}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 mr-2"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded text-red-500 font-semibold mr-2 flex items-center justify-center">S</div>
            <span>Weekend</span>
          </div>
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded bg-gradient-to-r ${theme.monthColor} opacity-20 mr-2`}></div>
            <span>Current Month</span>
          </div>
        
        </div>
      </div>


    </div>
  );
}

export default MonthCalendar;