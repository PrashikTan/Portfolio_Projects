import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();
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

  const { totalPrice, products } = location.state || {
    totalPrice: 0,
    products: [],
  };

  const validateCardNumber = (number) => {
    return /^[0-9]{16}$/.test(number);
  };

  const validateExpirationDate = (date) => {
    const [month, year] = date.split("/").map(Number);
    if (!month || !year || month < 1 || month > 12 || year < new Date().getFullYear()) {
      return false;
    }
    const expirationDate = new Date(year, month - 1);
    const today = new Date();
    return expirationDate >= new Date(today.getFullYear(), today.getMonth());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cardNumber || !cardHolderName || !expiration || !cvv) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateCardNumber(cardNumber)) {
      setError("Card number must be 16 digits.");
      return;
    }

    if (!validateExpirationDate(expiration)) {
      setError("Expiration date is invalid or in the past.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("User is not logged in, no userId found.");
      setError("User is not logged in.");
      setIsSubmitting(false);
      return;
    }

    const orderPayload = {
      id: userId,
      items: products.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
      })),
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      const orderResponse = await axios.post(
        `http://localhost:8080/customer/createOrder`,
        orderPayload,
        config
      );

      console.log("Order created successfully", orderResponse.data);
      const orderId = orderResponse.data.orderId;

      if (!orderId) {
        throw new Error("Order ID not received");
      }

      const paymentPayload = {
        orderId: orderId,
        amount: totalPrice,
      };

      const paymentResponse = await axios.post(
        `http://localhost:8080/customer/processPayment`,
        paymentPayload,
        config
      );

      console.log("Payment successful", paymentResponse.data);

      if (paymentResponse.data.status === "PAID") {
        toast.success("Payment successful!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          navigate(`/viewcart/${userId}`);
        }, 1500);
      } else {
        throw new Error("Payment status is not PAID");
      }
    } catch (error) {
      console.error("Error processing order/payment", error.response || error);
      setError("Failed to complete the transaction. Please try again.");
      toast.error("Payment failed. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (totalPrice === 0) {
      console.error("No total price received.");
    }
    if (products.length === 0) {
      console.error("No products received.");
    }
  }, [totalPrice, products]);

  return (
    <MDBContainer fluid className="py-5 gradient-custom">
      <MDBRow className="d-flex justify-content-center py-5">
        <MDBCol md="7" lg="5" xl="4">
          <MDBCard style={{ borderRadius: "15px" }}>
            <MDBCardBody className="p-4">
              <form onSubmit={handleSubmit}>
                <MDBRow className="d-flex align-items-center">
                  <MDBCol size="9">
                    <MDBInput
                      label="Card Number"
                      id="form1"
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3457"
                      required
                    />
                  </MDBCol>
                  <MDBCol size="3">
                    <img
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="visa"
                      width="64px"
                    />
                  </MDBCol>

                  <MDBCol size="9">
                    <MDBInput
                      label="Cardholder's Name"
                      id="form2"
                      type="text"
                      value={cardHolderName}
                      onChange={(e) => setCardHolderName(e.target.value)}
                      placeholder="Cardholder's Name"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="6">
                    <MDBInput
                      label="Expiration"
                      id="form2"
                      type="text"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="MM/YYYY"
                      required
                    />
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBInput
                      label="CVV"
                      id="form2"
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="&#9679;&#9679;&#9679;"
                      required
                    />
                  </MDBCol>

                  {error && <div style={{ color: "red" }}>{error}</div>}

                  <MDBCol size="12" className="text-center mt-3">
                    <h5>Total Price: ₹{totalPrice.toFixed(2)}</h5>
                  </MDBCol>

                  <MDBCol size="3">
                    <MDBBtn
                      color="info"
                      rounded
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Processing..."
                      ) : (
                        <MDBIcon fas icon="arrow-right" />
                      )}
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ToastContainer />
    </MDBContainer>
  );
}
