'use client';

import { useState, useEffect } from 'react';
// Heroicons 대신 간단한 SVG 아이콘 사용

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

export default function Calendar({ exhibitions = [], onDateClick, selectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    generateCalendar();
  }, [currentDate, exhibitions]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        exhibitions: []
      });
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayExhibitions = getExhibitionsForDate(date);
      
      days.push({
        date,
        isCurrentMonth: true,
        exhibitions: dayExhibitions,
        isWeekend: date.getDay() === 0 || date.getDay() === 6
      });
    }
    
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        exhibitions: []
      });
    }
    
    setCalendarDays(days);
  };

  const getExhibitionsForDate = (date) => {
    return exhibitions.filter(exhibition => {
      const startDate = new Date(exhibition.startDate);
      const endDate = new Date(exhibition.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const isSelected = (date) => {
    if (!selectedDate) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => navigateMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-xl font-semibold text-gray-800">
          {currentDate.getFullYear()}년 {MONTHS[currentDate.getMonth()]}
        </h2>
        
        <button
          onClick={() => navigateMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 border-b">
        {DAYS.map((day, index) => (
          <div
            key={day}
            className={`p-3 text-center text-sm font-medium ${
              index === 0 || index === 6 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-700 bg-gray-50'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`min-h-[100px] p-2 border-b border-r cursor-pointer transition-colors ${
              !day.isCurrentMonth 
                ? 'bg-gray-50 text-gray-400'
                : day.isWeekend
                ? 'bg-blue-50 hover:bg-blue-100'
                : 'bg-white hover:bg-gray-50'
            } ${
              isSelected(day.date) ? 'ring-2 ring-blue-500 bg-blue-100' : ''
            }`}
            onClick={() => onDateClick?.(day.date, day.exhibitions)}
          >
            <div className="flex flex-col h-full">
              <div className={`text-sm font-medium mb-1 ${
                !day.isCurrentMonth 
                  ? 'text-gray-400'
                  : day.isWeekend
                  ? 'text-blue-600'
                  : 'text-gray-900'
              }`}>
                {day.date.getDate()}
              </div>
              
              {day.exhibitions.length > 0 && (
                <div className="flex-1 space-y-1">
                  {day.exhibitions.slice(0, 3).map((exhibition, idx) => (
                    <div
                      key={idx}
                      className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate"
                      title={exhibition.title}
                    >
                      {exhibition.title}
                    </div>
                  ))}
                  {day.exhibitions.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{day.exhibitions.length - 3}개 더
                    </div>
                  )}
                </div>
              )}

              {day.exhibitions.length > 0 && (
                <div className="mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-red-500 text-white rounded-full">
                    {day.exhibitions.length}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}