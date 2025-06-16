import { useState } from 'react';
import './EventForm.css';

function AttendeeList() {
    return(
        <>
            <div className='modal-overlay'>
                <div className='modal'>
                    <h2>Attendees</h2>
                    <ul>
                        {attendeeList.length === 0 ? (
                            <li>No attendees yet.</li>
                        ) : (
                            attendeeList.map((attendee, idx) => (
                                <li key={idx}>
                                    Student ID: {attendee.student_id}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}

export default AttendeeList;