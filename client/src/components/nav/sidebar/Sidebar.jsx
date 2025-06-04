// src/components/nav/sidebar/Sidebar.jsx

import React, { useState } from "react";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup";

const Sidebar = ({
  sidebarOpen,
  isMobile,
  darkMode,
  activeTab,
  setActiveTab,
  setSidebarOpen,
  navItems,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleItemClick = (tab) => {
    setActiveTab(tab);
    if (isMobile) setSidebarOpen(false);
  };

  return (
    <div
      className={`
        ${sidebarOpen ? "w-64" : isMobile ? "-translate-x-full" : "w-20"}
        ${isMobile ? "fixed inset-y-0 z-30" : "relative"}
        ${
          darkMode
            ? "bg-gray-800 border-r border-gray-700"
            : "bg-white border-r border-gray-200"
        }
        ${darkMode ? "text-white" : "text-gray-900"}
        flex flex-col transition-all duration-300
      `}
    >
      {/* Sidebar Header */}
      <div
        className={`flex items-center justify-start px-4 py-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        } h-[66px] flex-shrink-0`}
      >
        <h2
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`cursor-pointer text-2xl font-bold tracking-tight transition-colors duration-300 select-none ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {sidebarOpen ? "ZeriByteCare" : "ZBC"}
          </span>
        </h2>
      </div>

      {searchOpen && (
        <SearchModal
          darkMode={darkMode}
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          size="2xl"
        />
      )}

      {/* Nav Items */}
      <nav className="mt-6 overflow-y-auto flex-1">
        {navItems.map((item) =>
          item.group ? (
            <NavGroup
              key={item.text}
              icon={item.icon}
              text={item.text}
              items={item.items}
              activeTab={activeTab}
              setActiveTab={handleItemClick}
              sidebarOpen={sidebarOpen}
              darkMode={darkMode}
              isMobile={isMobile}
              setSidebarOpen={setSidebarOpen}
            />
          ) : (
            <NavItem
              key={item.text}
              icon={item.icon}
              text={item.text}
              active={activeTab === item.tab}
              onClick={() => handleItemClick(item.tab)}
              sidebarOpen={sidebarOpen}
              darkMode={darkMode}
            />
          )
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
