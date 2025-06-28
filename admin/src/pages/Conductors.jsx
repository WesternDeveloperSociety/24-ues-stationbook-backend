import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Conductors() {
  const [conductorRequests, setConductorRequests] = useState([]);
  const [activeConductors, setActiveConductors] = useState([]);

  useEffect(() => {
    const fetchConductorRequests = async () => {
      try {
        const requests = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/conductor/requests/all`
        );
        setConductorRequests(requests.data);
      } catch (err) {
        console.error("Error fetching conductor requests:", err);
      }
    };
    const fetchActiveConductors = async () => {
      try {
        const conductors = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/conductor/get-active-conductors`
        );
        setActiveConductors(conductors.data);
      } catch (err) {
        console.error("Error fetching active conductors:", err);
      }
    };
    fetchConductorRequests();
  }, []);

  return (
    <>
      <div className="main">
        <h1>Conductors Page</h1>
        <div className="columns-container">
          <div className="column">
            <h2>Incoming Conductor Requests</h2>
            <ul></ul>
          </div>

          <div className="column">
            <h2>Active Conductors</h2>
            <ul></ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Conductors;

//will have active conductors and what event they're authorized for, plus conductor requests
