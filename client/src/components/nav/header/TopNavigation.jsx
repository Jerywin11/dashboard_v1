// src/components/TopNavigation.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Dropdown from "../../shared/Dropdown";
import UserDropdown from "../../shared/UserDropdown";
import NotificationsDropdown from "../../shared/NotificationsDropdown";

const TopNavigation = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  logoText = "ZeriByteCare",
  user = {
    name: "Admin User",
    avatar:
      "https://cdn3.pixelcut.app/7/18/profile_photo_maker_hero_100866f715.jpg",
    email: "admin@zeribytec.are",
  },
  notifications,
  showNotifications = true,
}) => {
  const [notificationCount, setNotificationCount] = useState(3); // Example count

  const handleNotificationClick = (notification) => {
    console.log("Notification clicked:", notification);
    // Mark as read logic would go here
    // For now, we'll just decrement the count if it was unread
    if (notification && !notification.read) {
      setNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  return (
    <header
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b sticky top-0 z-10 h-[65px]`}
    >
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left side content */}
        <div className="flex items-center">
          <h2
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`
              block lg:hidden
              cursor-pointer text-2xl font-bold tracking-tight transition-colors duration-300 select-none 
              ${darkMode ? "text-white" : "text-gray-900"}
            `}
          >
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {logoText}
            </span>
          </h2>
        </div>

        {/* Right side content */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Notification Bell */}
          {showNotifications && (
            <Dropdown
              darkMode={darkMode}
              position="right"
              width="w-75"
              trigger={
                <div className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-500 dark:text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
                  )}
                </div>
              }
            >
              <NotificationsDropdown
                notifications={notifications}
                darkMode={darkMode}
                onItemClick={handleNotificationClick}
              />
            </Dropdown>
          )}

          {/* User Profile with Modern Dropdown */}
          <Dropdown
            darkMode={darkMode}
            trigger={
              <div className="flex items-center space-x-1 group">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt={`${user.name}'s profile`}
                    className="h-8 w-8 rounded-full object-cover border-2 border-transparent group-hover:border-indigo-500 transition-colors duration-200"
                  />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800"></span>
                </div>

                {!isMobile && (
                  <div className="flex items-center">
                    <span
                      className={`ml-2 text-sm font-medium ${
                        darkMode ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {user.name}
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 ml-1 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                )}
              </div>
            }
          >
            <UserDropdown user={user} darkMode={darkMode} />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

TopNavigation.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  logoText: PropTypes.string,
  user: PropTypes.shape({
    name: PropTypes.string,
    avatar: PropTypes.string,
    email: PropTypes.string,
  }),
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      read: PropTypes.bool,
    })
  ),
  showNotifications: PropTypes.bool,
};

export default TopNavigation;
