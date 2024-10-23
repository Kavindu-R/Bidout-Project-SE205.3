/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyPayments = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:5173/api/payments/my", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser.id }),
        });

        if (!response.ok) {
          throw new Error("Unable to fetch payment data.");
        }

        const data = await response.json();
        if (data.success) {
          // Sort payments by payment.id in descending order
          const sortedPayments = data.data.sort(
            (a, b) => b.payment.id - a.payment.id
          );
          setPayments(sortedPayments);
        } else {
          setError("No payments found.");
        }
      } catch (err) {
        setError("Error fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [currentUser.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {payments.length === 0 ? (
        <div className="text-gray-500">No payments found.</div>
      ) : (
        <div className="space-y-4">
          {payments.map((item, index) => (
            <Link
              to={"/auction/" + item.auction.auctionId}
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col"
            >
              <div className="flex">
                <img
                  src={item.auction.auctionImage}
                  alt={item.auction.title}
                  className="w-28 h-28 object-cover mr-4 rounded"
                />
                <div className="flex flex-col justify-start">
                  <p className="text-sm">Type: {item.payment.type}</p>
                  <p className="text-sm">Amount: ${item.payment.amount}</p>
                  <p className="text-sm">
                    Payment Method: {item.payment.paymentMethod}
                  </p>
                  <p className="text-sm">
                    Status: {item.payment.paymentStatus}
                  </p>
                  <p className="text-sm">
                    Date and Time:{" "}
                    {new Date(item.payment.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mx-auto mt-3 mb-1 border border-slate-200 w-full"></div>
              <div className="">
                <h2 className="text-lg font-semibold">{item.auction.title}</h2>
                <p className="text-sm text-gray-500">
                  {item.auction.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPayments;
