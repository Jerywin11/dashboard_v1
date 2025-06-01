// src/components/shared/NotificationsDropdown.jsx
import PropTypes from "prop-types";
import { BellAlertIcon } from "@heroicons/react/24/outline";

const NotificationsDropdown = ({ notifications, darkMode, onItemClick }) => {
  // Sample notifications data
  const sampleNotifications = [
    {
      id: 1,
      title: "New message received",
      description: "You have 3 unread messages",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "System update",
      description: "New version available (v2.3.1)",
      time: "1 day ago",
      read: true,
    },
    {
      id: 3,
      title: "Payment received",
      description: "Your invoice has been paid",
      time: "3 days ago",
      read: true,
    },
  ];

  // Use provided notifications or sample data
  const displayedNotifications = notifications || sampleNotifications;

  return (
    <div className="py-1">
      <div
        className={`px-4 py-2 border-b ${
          darkMode
            ? "border-gray-600 text-white"
            : "border-gray-100 text-gray-900"
        } font-medium`}
      >
        Notifications
      </div>

      {displayedNotifications.length === 0 ? (
        <div
          className={`px-4 py-6 text-center ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <BellAlertIcon className="w-8 h-8 mx-auto mb-2" />
          <p>No new notifications</p>
        </div>
      ) : (
        displayedNotifications.map((notification) => (
          <button
            key={notification.id}
            onClick={() => {
              onItemClick?.(notification);
            }}
            className={`flex items-start w-full px-4 py-3 text-left transition-colors duration-150 ${
              !notification.read
                ? darkMode
                  ? "bg-gray-600/30 hover:bg-gray-600/50"
                  : "bg-blue-50 hover:bg-blue-100"
                : darkMode
                ? "hover:bg-gray-600/30"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {notification.title}
              </p>
              <p
                className={`text-sm truncate ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {notification.description}
              </p>
              <p
                className={`text-xs mt-1 ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                }`}
              >
                {notification.time}
              </p>
            </div>
            {!notification.read && (
              <span className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1.5"></span>
            )}
          </button>
        ))
      )}

      {displayedNotifications.length > 0 && (
        <div
          className={`px-4 py-2 border-t ${
            darkMode ? "border-gray-600" : "border-gray-100"
          } text-center`}
        >
          <button
            className={`text-sm ${
              darkMode
                ? "text-blue-400 hover:text-blue-300"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

NotificationsDropdown.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      read: PropTypes.bool,
    })
  ),
  darkMode: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export default NotificationsDropdown;
