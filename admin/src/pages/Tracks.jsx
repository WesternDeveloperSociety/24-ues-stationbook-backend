import "../App.css";
import TrackForm from "../components/TrackForm";
import AttendeeList from "../components/AttendeeList";
import { useState, useEffect } from "react";
import axios from "axios";
import EventSelectionForm from "../components/EventSelectionForm";

function Tracks() {
  const [showEventSelection, setShowEventSelection] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [showEventForm, setShowEventForm] = useState(false);
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);

  const [openEventId, setOpenEventId] = useState(null);
  const [editEventId, setEditEventId] = useState(null);
  const [editEventData, setEditEventData] = useState(null);

  const [showAttendeeList, setShowAttendeeList] = useState(false);
  const [attendeeList, setAttendeeList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Add method to get all events for when 'event selection' is toggled
  }, []);

  const updateLists = async () => {
    const [upcomingRes, pastRes] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/api/Tracks/upcoming`),
      axios.get(`${import.meta.env.VITE_API_URL}/api/Tracks/past`),
    ]);
    setUpcoming(upcomingRes.data);
    setPast(pastRes.data);
  };

  const handleCreateEvent = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Tracks/createEvent`,
        data
      );
      alert("Event created!");
      updateLists();
    } catch (err) {
      console.error(err);
      alert("Error creating event: ", err);
    }
  };

  const toggleDetails = (event_no) => {
    setOpenEventId((prevId) => (prevId === event_no ? null : event_no));
  };

  const editEvent = (event) => {
    setEditEventId(event.event_no);
    setEditEventData(event);
    setShowEventForm(true);
  };

  const handleEditSubmit = async (event_no, data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/Tracks/edit/${event_no}`,
        data
      );
      alert("Event updated!");
      setEditEventId(null);
      setEditEventData(null);
      setShowEventForm(false);
      updateLists();
    } catch (err) {
      console.error(err);
      alert("Error editing event");
    }
  };

  const getAttendeeList = async (event_no) => {
    try {
      const attendeeList = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/scan/event-scans/${event_no}`
      );
      if (attendeeList.data.length > 0) {
        setAttendeeList(attendeeList.data);
        setShowAttendeeList(true);
        console.log(attendeeList);
      } else {
        alert("No attendees for this event.");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching attendee list");
    }
  };

  return (
    <>
      <div className="button-space">
        <button onClick={() => setShowEventForm(true)}>Create Track</button>
        {showEventForm && (
          <TrackForm
            onClose={() => {
              setShowEventForm(false);
              setEditEventId(null);
              setEditEventData(null);
            }}
            onSubmit={
              editEventId
                ? (data) => handleEditSubmit(editEventId, data)
                : handleCreateEvent
            }
            initialData={editEventData || {}}
          />
        )}
        {showEventSelection && (
          <EventSelectionForm
            onClose={() => {
              setShowEventSelection(false);
              setSelectedEvent(null);
            }}
            setSelected={setSelectedEvent}
            selected={selectedEvent}
            onSubmit={
              () => {} // Placeholder for event selection submit handler
            }
          />
        )}
      </div>
      <div className="main">
        <h1>Tracks Page</h1>
        <div className="columns-container">
          <div className="column">
            <div style={{ display: "flex", alignItems: "center" }}>
              <h2>Tracks</h2>
              <div
                className="add-button"
                onClick={() => setShowEventSelection(true)}
              >
                <h3 style={{ color: "white" }}>+</h3>
              </div>
            </div>
            {upcoming.length === 0 && <p>No upcoming events.</p>}
            <ul>
              {upcoming.map((event) => (
                <li key={event.event_no}>
                  <strong>{event.name}</strong> —{" "}
                  {new Date(event.date).toLocaleDateString()}
                  <button
                    className="details"
                    onClick={() => toggleDetails(event.event_no)}
                  >
                    {openEventId === event.event_no
                      ? "Hide Details"
                      : "Details"}
                  </button>
                  {openEventId === event.event_no && (
                    <div className="accordion-content">
                      <p>
                        <strong>Description:</strong>{" "}
                        {event.description || "N/A"}
                      </p>
                      <p>
                        <strong>Track:</strong> {event.track || "N/A"}
                      </p>
                      <p>
                        <strong>Points:</strong> {event.points ?? "N/A"}
                      </p>
                      <button onClick={() => editEvent(event)}>Edit</button>
                      <button onClick={() => getAttendeeList(event.event_no)}>
                        View Attendee List
                      </button>
                      {showAttendeeList && (
                        <AttendeeList attendeeList={attendeeList} />
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="column">
            <h2>Past Tracks</h2>
            {past.length === 0 && <p>No past Tracks.</p>}
            <ul>
              {past.map((event) => (
                <li key={event.event_no}>
                  <strong>{event.name}</strong> —{" "}
                  {new Date(event.date).toLocaleDateString()}
                  <button
                    className="details"
                    onClick={() => toggleDetails(event.event_no)}
                  >
                    {openEventId === event.event_no
                      ? "Hide Details"
                      : "Details"}
                  </button>
                  {openEventId === event.event_no && (
                    <div className="accordion-content">
                      <p>
                        <strong>Description:</strong>{" "}
                        {event.description || "N/A"}
                      </p>
                      <p>
                        <strong>Track:</strong> {event.track || "N/A"}
                      </p>
                      <p>
                        <strong>Points:</strong> {event.points ?? "N/A"}
                      </p>
                      <button onClick={() => getAttendeeList(event.event_no)}>
                        View Attendee List
                      </button>
                      {showAttendeeList && (
                        <AttendeeList attendeeList={attendeeList} />
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Tracks;
