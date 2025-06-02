// src/components/TopNavigation.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Dropdown from "../../shared/Dropdown";
import UserDropdown from "../../shared/UserDropdown";
import NotificationsDropdown from "../../shared/NotificationsDropdown";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

const TopNavigation = ({
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
  isMobile,
  logoText = "ByteCare",
  user = {
    name: "Admin User",
    avatar:
      "https://cdn3.pixelcut.app/7/18/profile_photo_maker_hero_100866f715.jpg",
    email: "admin@zeribytec.are",
  },
  notifications,
  showNotifications = true,
}) => {
  const [notificationCount, setNotificationCount] = useState(3);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("home");

  const handleNotificationClick = (notification) => {
    console.log("Notification clicked:", notification);
    if (notification && !notification.read) {
      setNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const navItems = [
    {
      id: "home", // Homepage
      icon: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z",
    },
    {
      id: "shop", // Product categories / main shopping screen
      icon: "M4 4h16v2H4V4zm0 4h16v10a1 1 0 01-1 1H5a1 1 0 01-1-1V8z",
    },
    {
      id: "cart", // Shopping cart
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5m1.6 8l-2 3a1 1 0 00.8 1.6H17a1 1 0 00.8-1.6l-2-3",
    },
    {
      id: "orders", // Past orders
      icon: "M5 3a1 1 0 00-1 1v16a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H5zm8 4h3v2h-3V7zm-6 0h5v2H7V7zm0 4h9v2H7v-2zm0 4h9v2H7v-2z",
    },
    {
      id: "wishlist", // Favorites or saved items
      icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4 8.04 4 9.54 4.99 10.04 6.24h1.92C13.46 4.99 14.96 4 16.5 4 19 4 21 6 21 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    },
  ];

  return (
    <header
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-b sticky top-0 z-10`}
    >
      {/* First Row */}
      <div className="flex items-center justify-between px-4 h-[65px]">
        {/* Menu toggle button */}
        <div className="hidden md:block">
          <button
            type="button"
            className={`font-bold mr-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  sidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

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
          {/* Search Bar (hidden on smaller screens) */}
          <div className="hidden md:block relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.8-6.45a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className={`
                pl-10 pr-4 py-2 rounded-full border w-full
                ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}
              placeholder="Search..."
            />
          </div>

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
                    className="h-6 w-6 text-gray-500 dark:text-gray-500"
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
            position="right"
            width="w-50"
            onOpen={() => setIsUserDropdownOpen(true)}
            onClose={() => setIsUserDropdownOpen(false)}
            trigger={
              <div className="flex items-center space-x-1 group cursor-pointer">
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
                    {isUserDropdownOpen ? (
                      <ChevronUpIcon
                        className={`w-4 h-4 ml-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    ) : (
                      <ChevronDownIcon
                        className={`w-4 h-4 ml-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      />
                    )}
                  </div>
                )}
              </div>
            }
          >
            <UserDropdown user={user} darkMode={darkMode} />
          </Dropdown>
        </div>
      </div>

      {/* Second Row - Navigation Icons (Mobile and md only) */}
      <div
        className={`md:hidden relative ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex justify-around items-center h-12">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center w-full h-full relative"
              onClick={() => setActiveNavItem(item.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${
                  darkMode
                    ? activeNavItem === item.id
                      ? "text-indigo-400"
                      : "text-gray-400"
                    : activeNavItem === item.id
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={activeNavItem === item.id ? 2.5 : 2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
              <span
                className={`text-xs mt-1 capitalize ${
                  darkMode
                    ? activeNavItem === item.id
                      ? "text-indigo-400"
                      : "text-gray-400"
                    : activeNavItem === item.id
                    ? "text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {item.id}
              </span>
              {activeNavItem === item.id && (
                <div
                  className={`absolute bottom-0 w-full h-1 rounded-t ${
                    darkMode ? "bg-indigo-400" : "bg-indigo-600"
                  }`}
                ></div>
              )}
            </button>
          ))}
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
