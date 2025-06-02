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

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [timeRange, setTimeRange] = useState("week");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
