import React, { useState } from "react";
import NavItem from "./NavItem";

const NavGroup = ({
  icon,
  text,
  items,
  activeTab,
  setActiveTab,
  sidebarOpen,
  darkMode,
  isMobile,
  setSidebarOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasActiveChild = items.some((item) => item.tab === activeTab);

  const handleGroupClick = () => {
    if (!sidebarOpen && !isMobile) {
      setSidebarOpen(true);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
      <button
        onClick={handleGroupClick}
        className={`flex items-center w-full p-3 transition-colors duration-200 ${
          hasActiveChild && darkMode
            ? "bg-gray-700"
            : hasActiveChild
            ? "bg-gray-100"
            : darkMode
            ? "hover:bg-gray-700"
            : "hover:bg-gray-100"
        }`}
      >
        {icon && (
          <span className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {icon}
          </span>
        )}
        {sidebarOpen && (
          <>
            <span
              className={`ml-${icon ? "3" : "0"} font-medium flex-1 text-left`}
            >
              {text}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-transform duration-200 ${
                isOpen ? "transform rotate-180" : ""
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </>
        )}
      </button>

      {sidebarOpen && (
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div
            className={`ml-6 pl-2 mt-1 space-y-1 ${
              darkMode ? "border-l border-gray-700" : "border-l border-gray-200"
            }`}
          >
            {items.map((item) => (
              <NavItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                active={activeTab === item.tab}
                onClick={() => setActiveTab(item.tab)}
                sidebarOpen={sidebarOpen}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavGroup;
