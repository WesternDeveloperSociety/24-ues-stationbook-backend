import { useState } from "react";
import "./EventForm.css";

function EventSelectionForm({ onClose, selected, setSelected }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const choices = [
    "Event 1",
    "Event 2",
    "Event 3",
    "Event 4",
    "Event 5",
    "Event 5",
    "Event 5",
    "Event 5",
  ]; // Example choices

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h1>Select Event</h1>
          <form onSubmit={handleSubmit}>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "40vh",
                overflowY: "auto",
              }}
            >
              {choices.map((choice, index) => (
                <li
                  key={index}
                  onClick={() => setSelected(choice)}
                  className={selected === choice ? "selected" : ""}
                  style={{
                    listStyle: "none",
                    padding: "1rem 2rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    cursor: "pointer",
                    background: selected === choice ? "#48287c" : "#f1ecfa",
                    color: selected === choice ? "#fff" : "#48287c",
                    transition: "background 0.2s, color 0.2s",
                  }}
                >
                  {choice}
                </li>
              ))}
            </ul>
            <button type="submit">Submit</button>
            <button onClick={onClose}>Close</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EventSelectionForm;
