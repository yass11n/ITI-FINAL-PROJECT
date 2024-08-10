import React, { useEffect, useState } from "react";
import EventForm from "./EventForm";
import Ef from "./Ed";

const EventsList = ({
  selectedDate,
  events,
  openModal,
  openModal2,
  closeModal1,
  closeModal2,
  editingEvent,
  setEvents,
  deleteEvent,
  editEvent,
  addEvent,
  
}) => {
  if (!selectedDate) {
    return (
      <div className="text-xl font-bold text-center h-full flex items-center">
        No events selected
      </div>
    );
  }

  // const [title, setTitle] = useState(editingEvent ? editingEvent.title : '');
  // const [reminder, setReminder] = useState(editingEvent ? editingEvent.reminder : '');

  // console.log(editingEvent);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const event = {
  //     id: editingEvent ? editingEvent.id : new Date().getTime()+"",
  //     title,
  //     date,
  //     reminder
  //   };
  //   if (editingEvent) {
  //     editEvent(event);
  //   } else {
  //     addEvent(event);
  //   }
  //   closeModal();
  // };

  const del = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/events/${eventId}`);
      if (!response.ok) {
        throw new Error(`Event with id ${eventId} not found`);
      }

      const deleteResponse = await fetch(
        `http://localhost:5000/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the event");
      }

      console.log(`Event with id ${eventId} deleted successfully`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const s = (l) => {
    console.log(l);
    deleteEvent(l);
    del(l);
  };
  const s2 = (sd) => {
    openModal2(sd)
    
    
    

  };

  const selectedDateEvents = events.filter(
    (event) =>
      new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  const day = selectedDate.toLocaleString("default", { weekday: "short" });
  const date = selectedDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="p-4 relative h-full">
      <div className="flex items-center mb-4">
        <span className="text-2xl font-bold mr-2">{day}</span>
        <span className="text-lg text-gray-500">{date}</span>
      </div>
      {selectedDateEvents.length > 0 ? (
        <ul>
          {selectedDateEvents.map((event) => (
            <li key={event.id} className="border p-2 rounded mb-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex">

                  <button
                    
                    onClick={() =>s2(selectedDate)}
                    className="text-yellow-500 hover:text-yellow-700 me-3"
                  >
                    <i className="fas fa-pen"></i>
                  </button>
                  <button
                    key={event.id}
                    onClick={() => s(event.id)}
                    className="text-red-500 hover:text-red-700 me-1"
                  >
                    <i className="fas fa-times "></i>
                  </button>
                </div>
              </div>
              {event.reminder && (
                <p className="text-sm text-gray-500">
                  Reminder: {new Date(event.reminder).toLocaleString()}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events for this date.</p>
      )}
      <div
        className="absolute bottom-4 right-4 bg-gray-600 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-500"
        onClick={() => {
          openModal(selectedDate);
        }}
      >
        <i className="fas fa-plus"></i>
      </div>
    </div>
  );
};

export default EventsList;
