import React from 'react';

const CalendarHeader = ({ currentMonth, setCurrentMonth }) => {
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="flex  justify-between items-center mb-20 mt-4">
      <button onClick={prevMonth} className=" text-xl font-bold">{'<'}</button>
      <h2 className="flex-grow text-center text-xl font-bold">
        {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
      </h2>
      <button onClick={nextMonth} className="text-xl font-bold">{'>'}</button>
    </div>
  );
};

export default CalendarHeader;
