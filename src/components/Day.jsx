import React from 'react';

const Day = ({ date, currentMonth, events, selectDate }) => {
  const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
  const isToday = new Date().toLocaleDateString() == date.toLocaleDateString();
  
  const dayEvents = events.map(event => (
    <div key={event.id} className="bg-blue-200 p-1 mt-1 rounded">
      {event.title}
    </div>
  ));
  console.log(events.length);
  return (
    <div
      className={`p-2 rounded-full text-center ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'} w-auto h-auto`}
      onClick={() => selectDate(date)}
    >
      <div className={`text-3xl ${isToday ? 'bg-[#8c55c4]  rounded-full ' : ''}`}>
        {date.getDate()}
      </div>
      {events.length > 0 && <div className='p-1 bg-red-800 rounded-full'/> }
    </div>
  );
  
  
};

export default Day;
