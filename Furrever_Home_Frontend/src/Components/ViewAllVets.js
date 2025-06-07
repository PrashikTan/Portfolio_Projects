import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ViewAllVets.css'; // Custom CSS for styling

function ViewAllVets() {
    const navigate = useNavigate();
  const [vets, setVets] = useState([]);

  useEffect(() => {
    fetchVets();
  }, []);

  const fetchVets = async () => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json",
            },
          };
      
          const response = await axios.get(
            `http://localhost:8080/customer/getAllVets`,
            config
          );
      setVets(response.data);
    } catch (error) {
      console.error('Error fetching vets:', error);
    }
  };

  return (
    <div className="vets-container">
      <h2>Veterinarian Information</h2>
      <div className="vets-list">
        {vets.length > 0 ? (
          vets.map((vet, index) => (
            <div key={index} className="vet-card">
              <h3>{vet.doctorName}</h3>
              <p><strong>Experience:</strong> {vet.experience} years</p>
              <p><strong>Clinic Address:</strong> {vet.clinicAddress}</p>
              <p><strong>Contact Number:</strong> {vet.contactNumber}</p>
            </div>
          ))
        ) : (
          <p>No vets available at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default ViewAllVets;
