import React, { useState, useEffect } from 'react';

const EventForm = ({ date, addEvent, editEvent, deleteEvent, editingEvent, closeModal }) => {
  const [title, setTitle] = useState(editingEvent ? editingEvent.title : '');
  const [reminder, setReminder] = useState(editingEvent ? editingEvent.reminder : '');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setReminder(editingEvent.reminder);
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: editingEvent ? editingEvent.id : new Date().getTime(),
      title,
      date,
      reminder
    };
    if (editingEvent) {
      editEvent(event);
    } else {
      addEvent(event);
    }
    closeModal();
  };

  const handleDelete = () => {
    deleteEvent(editingEvent.id);
    closeModal();
  };

  return (
    <form  onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm">Event Title</label>
        <input
          type="text"
          className="w-full border p-2 text-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm">Reminder (optional)</label>
        <input
          type="datetime-local"
          className="w-full border p-2 text-gray-600"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center">
        <button type="submit" className="bg-[#273463]  text-white px-4 py-2 rounded">
          {editingEvent ? 'Edit' : 'Add'} Event
        </button>
        {editingEvent && (
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
