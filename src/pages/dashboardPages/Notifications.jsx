import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `http://localhost:5173/api/notifications/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }

        const data = await response.json();
        setNotifications(data.data); // Accessing the notifications array from the response
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("Failed to load notifications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(
        "http://localhost:5173/api/notifications/read",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: notificationId,
            userId: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading notifications...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-4">{error}</div>;
  }

  // Separate notifications into new (unread) and older (read) sections
  const newNotifications = notifications
    .filter((notification) => !notification.isRead)
    .reverse();
  const olderNotifications = notifications
    .filter((notification) => notification.isRead)
    .reverse();

  return (
    <div className="mx-auto rounded-md">
      {newNotifications.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-2">New</h3>
          <ul className="space-y-4">
            {newNotifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 rounded-lg shadow-md bg-blue-100"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <strong className="text-lg">{notification.title}</strong>
                    <p className="text-sm">{notification.message}</p>
                    <a
                      href={notification.link}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View Details
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="ml-4 px-3 py-1 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md"
                  >
                    Mark as Read
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {olderNotifications.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Older</h3>
          <ul className="space-y-4">
            {olderNotifications.map((notification) => (
              <li
                key={notification.id}
                className="p-4 rounded-lg shadow-md bg-white"
              >
                <div>
                  <strong className="text-lg">{notification.title}</strong>
                  <p className="text-sm">{notification.message}</p>
                  <a
                    href={notification.link}
                    className="text-blue-500 hover:underline text-sm"
                  >
                    View Details
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {newNotifications.length === 0 && olderNotifications.length === 0 && (
        <p className="text-gray-500 text-center">No notifications available.</p>
      )}
    </div>
  );
};

export default Notifications;
