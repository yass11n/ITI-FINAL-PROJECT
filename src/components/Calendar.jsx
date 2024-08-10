import React, { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import Day from "./Day";
import Modal from "./Modal";
import EventForm from "./EventForm";
import CalendarTitle from "./CalendarTitle";
import EventsList from "./EventsList";
import Ef from "./Ed";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    async function fetchEvents() {
      const res = await fetch("http://localhost:5000/events");
      const ev = await res.json();

      setEvents(ev);
    }

    fetchEvents();
  }, []);

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const startDate =
    startOfMonth.getDay() === 0
      ? startOfMonth
      : new Date(
          startOfMonth.setDate(startOfMonth.getDate() - startOfMonth.getDay())
        );
  const endDate =
    endOfMonth.getDay() === 6
      ? endOfMonth
      : new Date(
          endOfMonth.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()))
        );

  const dates = [];
  let date = startDate;
  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  const handleAddEvent = (event) => {
    fetch("http://localhost:5000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setEvents([...events, event]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };




  const openModal = (date, event = null) => {
    setSelectedDate(date);
    setEditingEvent(event);
    setShowModal(true);
    
  };

  const openModal2 = (date, event = null,i=0) => {
    setSelectedDate(date);
    setEditingEvent(event);
    setShowModal2(true);
    return i
    
    
  };

  
  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
  };

  const closeModal2 = () => {
    setShowModal2(false);
    setEditingEvent(null);
  };


  const itClick = (e) => {

    if (e.target.parentElement.className=="min-h-screen") {
      closeModal()
      closeModal2()
    }
    // console.log("kmkmk");
    
    
  };
  return (
    <div className="min-h-screen">
      {/*  CalendarTitle */}
      <CalendarTitle />
      {/* Header */}

      <div className="flex justify-center items-center ">
        {/* Calendar section */}
        <div className="flex flex-col md:flex-row bg-[#373c4f]  text-gray-800 p-3 gap-3 rounded ">
          {/* Calendar Body  */}
          <div className="bg-white rounded-xl p-3 flex-1">
            <CalendarHeader
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
            />
            <div className="grid grid-cols-7 gap-6 ">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-bold">
                  {day}
                </div>
              ))}
              {dates.map((date) => (
                <Day
                  key={date}
                  date={date}
                  currentMonth={currentMonth}
                  events={events.filter(
                    (event) =>
                      new Date(event.date).toDateString() ===
                      date.toDateString()
                  )}
                  selectDate={setSelectedDate}
                  
                />
                
              ))}
              
            </div>
          </div>

          {/* Events section */}
          <div className=" px-3 rounded">
            <EventsList
              selectedDate={selectedDate}
              events={events}
              openModal={openModal}
              openModal2={openModal2}
              closeModal1={closeModal}
              closeModal2={closeModal2}
              setEditingEvent={editingEvent}
              setEvents={setEvents}
              deleteEvent={handleDeleteEvent}
              editEvent={handleEditEvent}
              addEvent={handleAddEvent}

              
            />
            
          </div>
        </div>
      </div>
      {/* model section */}
      {showModal && (
        <Modal closeModal={closeModal} itClick={itClick}>
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

          
        {showModal2 && (
        <Modal closeModal={closeModal2} itClick={itClick}>
          <Ef
            date={selectedDate}
            addEvent={handleAddEvent}
            editEvent={handleEditEvent}
            deleteEvent={handleDeleteEvent}
            editingEvent={editingEvent}
            closeModal={closeModal2}
            
            
            

            
          />
        </Modal>

          )}
          
          
      


      
    </div>
  );
};

export default Calendar;
