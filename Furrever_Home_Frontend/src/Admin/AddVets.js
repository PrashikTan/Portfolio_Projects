import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddVets.css";
import Admin from "./Admin";

function AddVets() {
    const [doctorName, setDoctorName] = useState("");
    const [experience, setExperience] = useState("");
    const [clinicAddress, setClinicAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

      useEffect(() => {
        if (!sessionStorage.getItem("userName")) {
          navigate("/");
        } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
          navigate("/customer");
        } else if (sessionStorage.getItem("userRole") === "ADMIN") {
          navigate("/admin");
        }
      }, [navigate]);


      const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!doctorName || !experience || !clinicAddress || !contactNumber) {
          setError("All fields are required.");
          return;
        }
      
        const vetData = {
          doctorName,
          experience,
          contactNumber,
          clinicAddress,
        };
      
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          };
      
          const response = await axios.post(
            "http://localhost:8080/admin/addVet",
            vetData,
            config
          );
      
          if (response.status === 201) {
            alert("Vet added successfully!");
            setDoctorName("");
            setExperience("");
            setClinicAddress("");
            setContactNumber("");
            setError("");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to add vet. Please try again.");
        }
      };
      

  return (
    <Admin>
      <div className="add-product-container">
        <h3>Add New Vet</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
          <label htmlFor="doctorName">Doctor Name</label>
            <input
              type="text"
              id="doctorName"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter doctor's name"
              required
            />
          </div>

          <div className="form-group">
          <label htmlFor="experience">Year of Experience</label>
            <input
              type="number"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Enter years of experience"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="clinicAddress">Clinic Address</label>
            <textarea
              id="clinicAddress"
              value={clinicAddress}
              onChange={(e) => setClinicAddress(e.target.value)}
              placeholder="Enter clinic address"
              required
            />
          </div>

          <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
            <input
              type="tel"
              id="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddVets;
