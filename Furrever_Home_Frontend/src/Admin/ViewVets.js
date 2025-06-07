import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewProducts"; // Add a CSS file for styling if needed
import Admin from "./Admin";

function ViewVets() {
  const [vets, setVets] = useState([]);
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

  useEffect(() => {
    const fetchVets = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get("http://localhost:8080/admin/getAllVets", config);
        setVets(response.data);
      } catch (error) {
        console.error("Error fetching vets:", error);
      }
    };

    fetchVets();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editvet/${id}`);
    } else {
      console.error("Vet ID is undefined");
    }
  };

  return (
    <Admin>
      <div className="view-products-container">
        <h3>View Veterinarians</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Experience (Years)</th>
              <th>Clinic Address</th>
              <th>Contact Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vets.length > 0 ? (
              vets.map((vet) => (
                <tr key={vet.id}>
                  <td>{vet.doctorName}</td>
                  <td>{vet.experience}</td>
                  <td>{vet.clinicAddress}</td>
                  <td>{vet.contactNumber}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(vet.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No veterinarians available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewVets;
