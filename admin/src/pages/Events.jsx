import '../App.css';
import EventForm from '../components/eventForm';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Events() {
    const [showEventForm, setShowEventForm] = useState(false);
    const [upcoming, setUpcoming] = useState([]);
    const [past, setPast] = useState([]);

    const [openEventId, setOpenEventId] = useState(null);
    const [editEventId, setEditEventId] = useState(null);
    const [editEventData, setEditEventData] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
        try {
            const upcomingRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/upcoming`);
            const pastRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/past`);
            setUpcoming(upcomingRes.data);
            setPast(pastRes.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        } finally {
            setLoading(false);
        }
    };

    fetchEvents();
    }, []); 

    const updateLists = async () => {
        const [upcomingRes, pastRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/events/upcoming`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/events/past`)
        ]);
        setUpcoming(upcomingRes.data);
        setPast(pastRes.data);
    }

    const handleCreateEvent = async (data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/events/createEvent`, data);
            alert('Event created!');
            updateLists();
          } catch (err) {
            console.error(err);
            alert('Error creating event: ',err);
          }
    }

    const toggleDetails = (eventId) => {
        setOpenEventId(prevId => (prevId === eventId ? null : eventId));
    };

    const editEvent = (event) => {
        setEditEventId(event.event_no);
        setEditEventData(event);
        setShowEventForm(true);
    };

    const handleEditSubmit = async (event_no, data) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/events/edit/${event_no}`, data);
            alert('Event updated!');
            setEditEventId(null);
            setEditEventData(null);
            setShowEventForm(false);
            updateLists();
            
        } catch (err) {
            console.error(err);
            alert('Error editing event');
        }
    };


    return (
        <>
        <div className='button-space'>
                <button onClick={() => setShowEventForm(true)}>Create Event</button>
                {showEventForm && (
                    <EventForm
                        onClose={() => {
                            setShowEventForm(false);
                            setEditEventId(null);
                            setEditEventData(null);
                        }}
                        onSubmit={editEventId ? (data) => handleEditSubmit(editEventId, data) : handleCreateEvent}
                        initialData={editEventData || {}}
                    />
                )}
            </div>
            <div className='main'>
                <div className='event-columns'>
                        <div className='column'>
                        <h2>Upcoming Events</h2>
                            {upcoming.length === 0 && <p>No upcoming events.</p>}
                            <ul>
                                {upcoming.map(event => (
                                    <li key={event.event_no}>
                                    <strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}
                                    <button className="details" onClick={() => toggleDetails(event.event_no)}>
                                        {openEventId === event.event_no ? 'Hide Details' : 'Details'}
                                    </button>
                                    
                                    {openEventId === event.event_no && (
                                        <div className="accordion-content">
                                            <p><strong>Description:</strong> {event.description || 'N/A'}</p>
                                            <p><strong>Track:</strong> {event.track || 'N/A'}</p>
                                            <p><strong>Points:</strong> {event.points ?? 'N/A'}</p>
                                            <button onClick={() => editEvent(event)}>Edit</button>
                                            <button>View Attendee List</button>
                                        </div>
                                    )}
                                    
                                    </li>
                                ))}
                            </ul>
                    </div>
                    <div className='column'>
                        <h2>Past Events</h2>
                            {past.length === 0 && <p>No past events.</p>}
                            <ul>
                                {past.map(event => (
                                    <li key={event.event_no}>
                                    <strong>{event.name}</strong> — {new Date(event.date).toLocaleDateString()}
                                    <button className="details" onClick={() => toggleDetails(event.event_no)}>
                                        {openEventId === event.event_no ? 'Hide Details' : 'Details'}
                                    </button>
                                    
                                    {openEventId === event.event_no && (
                                        <div className="accordion-content">
                                            <p><strong>Description:</strong> {event.description || 'N/A'}</p>
                                            <p><strong>Track:</strong> {event.track || 'N/A'}</p>
                                            <p><strong>Points:</strong> {event.points ?? 'N/A'}</p>
                                            <button>View Attendee List</button>
                                        </div>
                                    )}
                                    </li>
                                ))}
                            </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Events;

