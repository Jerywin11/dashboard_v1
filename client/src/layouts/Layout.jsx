// src/layouts/Layout.jsx
import React, { useState } from "react";
import TopNavigation from "../components/nav/header/TopNavigation";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";
import CartPage from "../pages/CartPage";
import OrdersPage from "../pages/OrdersPage";
import WishlistPage from "../pages/WishlistPage";

const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("home");

  const renderContent = () => {
    switch (activeNavItem) {
      case "home":
        return <HomePage />;
      case "shop":
        return <ShopPage />;
      case "cart":
        return <CartPage />;
      case "orders":
        return <OrdersPage />;
      case "wishlist":
        return <WishlistPage />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? "dark" : ""}`}>
      <TopNavigation
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMobile={false}
        activeNavItem={activeNavItem}
        setActiveNavItem={setActiveNavItem}
      />
      <main className="flex-1">{renderContent()}</main>
    </div>
  );
};

export default Layout;
