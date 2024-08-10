import React, { useState, useEffect } from "react";

const Ef = ({
  date,
  addEvent,
  editEvent,
  deleteEvent,
  editingEvent,
  closeModal,
  openModal2
}) => {
  const [title, setTitle] = useState(editingEvent ? editingEvent.title : "");
  const [reminder, setReminder] = useState(
    editingEvent ? editingEvent.reminder : ""
  );

  console.log(editingEvent);

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setReminder(editingEvent.reminder);
    }
  }, [editingEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      id: editingEvent ? editingEvent.id : new Date().getTime() + "",
      title,
      date,
      reminder,
    };
    if (editingEvent) {
      editEvent(event);
    } else {
      addEvent(event);
    }
    closeModal();
  };

  const handleDelete = () => {
    console.log(editEvent);

    deleteEvent(editingEvent.id);

    closeModal();
  };


  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm">new</label>
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
          <button
            
            
            
            type="submit"
            className="text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
          >
            Edite
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
    </div>
  );
};

export default Ef;
