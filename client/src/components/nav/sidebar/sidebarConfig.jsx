export const navItems = [
  {
    text: "Dashboard",
    tab: "dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    text: "Sales",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h18v6H3V3zM3 15h18v6H3v-6zM3 9h18v6H3V9z"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "POS Terminal",
        tab: "sales",
      },
      {
        text: "Returns",
        tab: "returns",
      },
    ],
  },
  {
    text: "Orders",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-6a2 2 0 012-2h6a2 2 0 012 2v6m-2 4H9a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2z"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "All Orders",
        tab: "orders",
      },
      {
        text: "Order History",
        tab: "order-history",
      },
    ],
  },
  {
    text: "Products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "All Products",
        tab: "products",
      },
      {
        text: "Categories",
        tab: "categories",
      },
      {
        text: "Inventory",
        tab: "inventory",
      },
    ],
  },
  {
    text: "Customers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5.121 17.804A6 6 0 0112 15a6 6 0 016.879 2.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "Customer List",
        tab: "customers",
      },
      {
        text: "Loyalty Program",
        tab: "loyalty",
      },
    ],
  },
  {
    text: "Suppliers",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 3h5v5M8 21H3v-5M3 3l18 18"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "All Suppliers",
        tab: "suppliers",
      },
      {
        text: "Purchase Orders",
        tab: "purchase-orders",
      },
    ],
  },
  {
    text: "Reports",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 17v-2a4 4 0 014-4h3m4 0h-3a4 4 0 00-4 4v2m-5-4h.01M3 13h.01M12 3v1m0 16v1"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "Sales Report",
        tab: "sales-report",
      },
      {
        text: "Inventory Report",
        tab: "inventory-report",
      },
    ],
  },
  {
    text: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4v1m0 14v1m7-7h1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707"
        />
      </svg>
    ),
    group: true,
    items: [
      {
        text: "POS Settings",
        tab: "pos-settings",
      },
      {
        text: "User Roles",
        tab: "user-roles",
      },
    ],
  },
];
