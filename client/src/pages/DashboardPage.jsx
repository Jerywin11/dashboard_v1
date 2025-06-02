// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/nav/sidebar/Sidebar";
import { navItems } from "../components/nav/sidebar/sidebarConfig";
import TopNavigation from "../components/nav/header/TopNavigation";
import StatCard from "../components/card/StatsGrid";
import ChartCard from "../components/card/ChartCard";
import ProductListCard from "../components/card/ProductListCard";
import ActivityFeed from "../components/card/ActivityFeedCard";
import { UserIcon, TrendDownIcon } from "../components/shared/icons.jsx";

import { statsData } from "../data/dashboard/stats";
import { activitiesData } from "../data/dashboard/activities";
import { productsData } from "../data/dashboard/products";
import { salesData } from "../data/dashboard/sales";
import { HomeIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
const Breadcrumb = ({ items, darkMode }) => {
  return (
    <nav className="flex px-4 md:px-6 py-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 overflow-x-auto whitespace-nowrap">
        {items.map((item, index) => (
          <li key={item.name} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRightIcon
                className={`w-4 h-4 mx-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            )}
            <a
              href={item.href}
              className={`inline-flex items-center text-sm font-medium ${
                darkMode
                  ? index === items.length - 1
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                  : index === items.length - 1
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              } ${index === 0 ? "min-w-[24px]" : ""}`}
            >
              {index === 0 ? (
                <HomeIcon
                  className={`w-4 h-4 ${items.length > 1 ? "mr-2" : ""} ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              ) : null}
              {items.length <= 2 || !isMobile || index === items.length - 1
                ? item.name
                : null}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const [timeRange, setTimeRange] = useState("week");
  const breadcrumbItems = [
    { name: "Home", href: "#" },
    { name: "Dashboard", href: "#" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Only auto-close if changing to mobile, don't auto-open when changing to desktop
      if (mobile && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]); // Add sidebarOpen as dependency

  return (
    <div
      className={`flex h-screen font-sans ${
        darkMode ? "dark bg-gray-900 shadow-none" : "bg-gray-100 shadow-sm"
      }`}
    >
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
        darkMode={darkMode}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setSidebarOpen={setSidebarOpen}
        navItems={navItems}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <TopNavigation
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          isMobile={isMobile}
          logoText="ZeriByteCare"
          user={{
            name: "John Doe",
            avatar:
              "https://cdn3.pixelcut.app/7/18/profile_photo_maker_hero_100866f715.jpg",
          }}
          onNotificationClick={() => console.log("Notification clicked")}
          showNotifications={true}
        />
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} darkMode={darkMode} />
        {/* Dashboard Content */}
        <main className="p-4 md:p-6 space-y-6">
          <StatCard
            stats={statsData}
            cardHeight={120}
            cardWidth="100%"
            cardClassName="custom-shadow"
            darkMode={darkMode}
          />

          {/* Two-column chart section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Chart */}
            <ChartCard
              title="Sales Overview"
              data={salesData}
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              darkMode={darkMode}
              height="h-64"
            />

            {/* Right Chart - You can add different data or props for this chart */}
            <ChartCard
              title="Revenue Overview"
              data={salesData} // You might want to use different data here
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              darkMode={darkMode}
              height="h-64"
            />

            {/* Right Chart - You can add different data or props for this chart */}
            <ChartCard
              title="Expenses Overview"
              data={salesData} // You might want to use different data here
              timeRange={timeRange}
              setTimeRange={setTimeRange}
              darkMode={darkMode}
              height="h-64"
            />
          </div>

          {/* Bottom section with products and activities */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProductListCard
              title="Best Selling Products"
              products={productsData}
              darkMode={darkMode}
              icon={
                <TrendDownIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              }
            />

            <ActivityFeed
              activities={activitiesData}
              title="User Activities"
              darkMode={darkMode}
              icon={
                <UserIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              }
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
