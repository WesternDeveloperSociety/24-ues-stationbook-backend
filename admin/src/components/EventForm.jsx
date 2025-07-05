import { useState, useEffect } from 'react';
import axios from 'axios';
import './EventForm.css';

function EventForm({ onClose, onSubmit, initialData = {} }) {
    const [tracks, setTracks] = useState([]);
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        date: initialData.date
            ? new Date(initialData.date).toISOString().split('T')[0] 
            : '',
        description: initialData.description || '',
        image: '',
        points: initialData.points || '',
        track: initialData.track || ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
          ...prev,
          [e.target.name]: e.target.value
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
      };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file); 
        }
    };

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/tracks`);
                setTracks(res.data);
            } catch (err) {
                console.error('Error fetching tracks:', err);
            }
        };
        fetchTracks();
    }, []);

    
    return(
        <>
           <div className='modal-overlay'>
                <div className='modal'>
                    <h1>Create Event</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Event Name:
                            <input type="text" name="name" value={formData.name} onChange={handleChange} />
                        </label>
                        <label>
                            Date:
                            <input type="date" name="date" value={formData.date} onChange={handleChange} />
                        </label>
                        <label>
                            Description:
                            <input type="text" name="description" value={formData.description} onChange={handleChange} />
                        </label>
                        <label>
                            Image (optional):
                            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                        </label>
                        <label>
                            Points:
                            <input type="number" name="points" value={formData.points} onChange={handleChange} />
                        </label>
                        <label>
                            Track:
                            <select name="track" value={formData.track} onChange={handleChange} required>
                                <option value="" disabled>Select a Track</option>
                                {tracks.map((track) => (
                                    <option key={track.track_name} value={track.track_name}>
                                        {track.track_name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Submit</button>
                        <button onClick={onClose}>Close</button>
                    </form>
                </div>
           </div>
        </>
    );
}

export default EventForm;