import { CreditCardIcon } from "../../components/shared/icons.jsx";
import React from "react";

export const activitiesData = [
  { id: 1, user: "John Doe", action: "placed an order", time: "2 min ago" },
  {
    id: 2,
    user: "Jane Smith",
    action: "subscribed to premium",
    time: "10 min ago",
    icon: React.createElement(CreditCardIcon, {
      className: "h-5 w-5 text-indigo-600 dark:text-indigo-400",
    }),
  },
  {
    id: 3,
    user: "Robert Johnson",
    action: "requested a refund",
    time: "25 min ago",
  },
  {
    id: 4,
    user: "Emily Davis",
    action: "updated profile",
    time: "1 hour ago",
  },
];
