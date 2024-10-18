/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const Payments = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const auctionId = parseInt(queryParams.get("auctionId"));
  const type = queryParams.get("type");
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [auctionData, setAuctionData] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!type || !auctionId) {
      navigate("/dashboard");
    } else {
      // Fetch payment info from the API
      fetch(`http://localhost:5173/api/payments/info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auctionId,
          type,
          userId: currentUser.id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setAuctionData(data.data.auction);
            setPaymentAmount(data.data.amount);
            setLoading(false);
          } else {
            throw new Error(data.message);
          }
        })
        .catch((err) => {
          setError(
            err.message ||
              "An error occurred while fetching payment information."
          );
          navigate("/dashboard");
        });
    }
  }, [navigate, type, auctionId, currentUser.id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return; // Stripe.js hasn't yet loaded.
    }

    const cardElement = elements.getElement(CardElement);

    // Fetch the client secret from your backend
    const check_response = await fetch(
      "http://localhost:5173/api/payments/check",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          auctionId: auctionId,
          amount: paymentAmount,
          type: type,
        }),
      }
    );

    const { clientSecret } = await check_response.json();

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
      // Fetch the client secret from your backend
      const response = await fetch(
        "http://localhost:5173/api/payments/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: currentUser.id,
            auctionId: auctionId,
            amount: paymentAmount,
            type: type,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create payment");
      } else {
        setTimeout(() => {
          navigate(`/auction/${auctionId}`);
        }, 3000);
      }
      // Optionally, you can redirect or perform other actions
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-700 animate-pulse">
          Loading payment details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-100 text-red-600 px-6 py-4 rounded-md shadow-md max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl w-full p-4">
        {auctionData && (
          <>
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center gap-6 mb-4">
                <img
                  src={auctionData.auctionImage}
                  alt={auctionData.title}
                  className="w-36 h-36 rounded-lg object-cover shadow-md"
                />
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {auctionData.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {auctionData.description}
                  </p>
                  <div className="mt-4 text-sm text-gray-500 space-y-1">
                    <p>
                      Category:{" "}
                      <span className="font-medium">
                        {auctionData.auctionCategory}
                      </span>
                    </p>
                    <p>
                      Status:{" "}
                      <span className="font-medium">{auctionData.status}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-gray-700 mt-4 space-y-1">
                <p>
                  Starting Amount:{" "}
                  <span className="font-semibold">
                    ${auctionData.startingBid}
                  </span>
                </p>
                <p>
                  Auction End Time:{" "}
                  <span className="font-semibold">
                    {new Date(auctionData.endTime).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Payment Amount Section */}
              <div className="bg-gray-100 p-6 rounded-lg text-center shadow-inner">
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  Payment Amount ({type})
                </h4>
                {type === "starting bid" && (
                  <p className="text-sm text-gray-600 mb-4">
                    (Starting Bid = Starting Amount * 10%)
                  </p>
                )}
                <p className="text-sm text-gray-600 mb-6">
                  Please note that if you won this auction and do not pay, the
                  amount will not be refunded. If you did not win, you can
                  refund this amount. If you won the auction, you will only need
                  to pay the remaining amount. Only needs to pay once to start
                  the bidding process.
                </p>
                <p className="text-3xl font-semibold text-green-600">
                  ${paymentAmount}
                </p>
              </div>

              {/* Payment Form Section */}
              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h2 className="text-xl font-semibold mb-4">Payment</h2>
                <CardElement className="border border-gray-300 p-2 rounded mb-4" />
                <button
                  className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
                  type="submit"
                  disabled={!stripe}
                >
                  Pay
                </button>
                {errorMessage && (
                  <div className="mt-4 text-red-500">{errorMessage}</div>
                )}
                {successMessage && (
                  <div className="mt-4 text-green-500">{successMessage}</div>
                )}
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Payments;
