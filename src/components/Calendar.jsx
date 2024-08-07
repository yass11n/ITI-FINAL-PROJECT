import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import Day from './Day';
import Modal from './Modal';
import EventForm from './EventForm';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
  const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
  const startDate = startOfMonth.getDay() === 0 ? startOfMonth : new Date(startOfMonth.setDate(startOfMonth.getDate() - startOfMonth.getDay()));
  const endDate = endOfMonth.getDay() === 6 ? endOfMonth : new Date(endOfMonth.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay())));

  const dates = [];
  let date = startDate;
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const handleAddEvent = (event) => {
    setEvents([...events, event]);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const openModal = (date, event = null) => {
    setSelectedDate(date);
    setEditingEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setSelectedDate(null);
  };

  return (
    <div className="p-4">
      <CalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {dates.map(date => (
          <Day
            key={date}
            date={date}
            currentMonth={currentMonth}
            events={events.filter(event => new Date(event.date).toDateString() === date.toDateString())}
            openModal={openModal}
          />
        ))}
      </div>
      {showModal && (
        <Modal closeModal={closeModal}>
          <EventForm
            date={selectedDate}
            addEvent={handleAddEvent}
            editEvent={handleEditEvent}
            deleteEvent={handleDeleteEvent}
            editingEvent={editingEvent}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
