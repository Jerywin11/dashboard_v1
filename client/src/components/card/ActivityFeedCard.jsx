import React from "react";
import PropTypes from "prop-types";
import { UserIcon } from "../../components/shared/icons.jsx";

const ActivityFeed = ({
  activities,
  title = "Recent Activities",
  darkMode = false,
  className = "",
  icon = <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
}) => {
  return (
    <section
      className={`rounded-lg shadow p-6 transition-colors duration-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } ${className}`}
    >
      <h3
        className={`text-lg font-medium mb-4 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div
              className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                darkMode ? "bg-indigo-900" : "bg-indigo-100"
              }`}
            >
              {activity.icon || icon}
            </div>
            <div className="ml-3">
              <p
                className={`text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {activity.user}{" "}
                <span
                  className={`font-normal ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {activity.action}
                </span>
              </p>
              <p
                className={`text-xs ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

ActivityFeed.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      user: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  title: PropTypes.string,
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default ActivityFeed;
