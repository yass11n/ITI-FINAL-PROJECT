import React from 'react';

const EventsList = ({ selectedDate, events, openModal }) => {
  if (!selectedDate) {
    return <div className='text-xl font-bold text-center h-full flex items-center'>No events selected</div>;
  }

  const selectedDateEvents = events.filter(
    event => new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  const day = selectedDate.toLocaleString('default', { weekday: 'short' });
  const date = selectedDate.toLocaleString('default', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="p-4 relative h-full">
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold mr-2">{day}</span>
        <span className="text-lg text-gray-500">{date}</span>
      </div>
      {selectedDateEvents.length > 0 ? (
        <ul>
          {selectedDateEvents.map(event => (
            <li key={event.id} className="border p-2 rounded mb-2">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              {event.reminder && (
                <p className="text-sm text-gray-500">Reminder: {new Date(event.reminder).toLocaleString()}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this date.</p>
      )}
      <div
        className="absolute bottom-4 right-4 bg-gray-600 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
        onClick={() => openModal(selectedDate)}
      >
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
};

export default EventsList;
