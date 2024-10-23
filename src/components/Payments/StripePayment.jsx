// StripePayment.jsx
import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return; // Stripe.js hasn't yet loaded.
    }

    const cardElement = elements.getElement(CardElement);

    // Fetch the client secret from your backend
    const response = await fetch(
      "http://localhost:5173/api/payments/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { clientSecret } = await response.json();

    // Confirm the payment with the fetched client secret
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    // Handle the payment result
    if (error) {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    } else if (paymentIntent.status === "succeeded") {
      setSuccessMessage("Payment successful!");
      setErrorMessage(null);
      // Optionally, you can redirect or perform other actions
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
