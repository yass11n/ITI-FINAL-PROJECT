import React from 'react';

const CalendarHeader = ({ currentMonth, setCurrentMonth }) => {
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={prevMonth}>&lt;</button>
      <h2 className="text-xl">{currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}</h2>
      <button onClick={nextMonth}>&gt;</button>
    </div>
  );
};

export default CalendarHeader;
