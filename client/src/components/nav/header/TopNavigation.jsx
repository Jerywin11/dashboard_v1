// src/components/TopNavigation.jsx

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Dropdown from "../../shared/Dropdown";
import UserDropdown from "../../shared/UserDropdown";
import NotificationsDropdown from "../../shared/NotificationsDropdown";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import SearchModal from "../../shared/modal/SearchModal";
import SearchBar from "../../shared/SearchBar";
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
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNotificationClick = (notification) => {
    console.log("Notification clicked:", notification);
    if (notification && !notification.read) {
      setNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const navItems = [
    {
      id: "home",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      id: "market",
      icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: "message",
      icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    },
    {
      id: "favourite",
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
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
            hidden max-md:block
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
        <div className="flex items-center space-x-2">
          {/* Search Bar (hidden on smaller screens) */}
          <div className="hidden sm:block">
            <SearchBar
              darkMode={darkMode}
              onClick={() => setSearchOpen(true)}
              placeholder="Search anything..."
            />

            {/* Search Modal */}
            <SearchModal
              darkMode={darkMode}
              isOpen={searchOpen}
              onClose={() => setSearchOpen(false)}
              size="2xl"
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
        className={`md:hidden ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } border-t`}
      >
        <div className="flex justify-around items-center h-14">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="flex flex-col items-center justify-center w-full h-full"
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
                strokeWidth={activeNavItem === item.id ? 2 : 1.5}
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
