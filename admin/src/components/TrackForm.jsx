import { useState } from "react";
import "./EventForm.css";

function TrackForm({ onClose, onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    description: initialData.description || "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
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
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h1>Create Track</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Track Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            {/* <label>
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </label> */}
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Image (optional):
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            {/* <label>
              Points:
              <input
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
              />
            </label>
            <label>
              Track:
              <input
                type="text"
                name="track"
                value={formData.track}
                onChange={handleChange}
              />
            </label> */}
            <button type="submit">Submit</button>
            <button onClick={onClose}>Close</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default TrackForm;
