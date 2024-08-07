import React from 'react';

const Day = ({ date, currentMonth, events, openModal }) => {
  const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
  const dayEvents = events.map(event => (
    <div key={event.id} className="bg-blue-200 p-1 mt-1 rounded">
      {event.title}
    </div>
  ));

  return (
    <div
      className={`p-2 border ${isCurrentMonth ? 'bg-white' : 'bg-gray-100'}`}
      onClick={() => openModal(date)}
    >
      <div className="text-sm">{date.getDate()}</div>
      {dayEvents}
    </div>
  );
};

export default Day;
