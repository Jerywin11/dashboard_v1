// src/components/shared/UserDropdown.jsx
import PropTypes from "prop-types";
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const UserDropdown = ({ user, darkMode, onItemClick }) => {
  const menuItems = [
    {
      label: "Your Profile",
      icon: <UserIcon className="w-5 h-5" />,
      action: () => console.log("Profile clicked"),
    },
    {
      label: "Settings",
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      action: () => console.log("Settings clicked"),
    },
    {
      label: "Security",
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      action: () => console.log("Security clicked"),
    },
    {
      label: "Messages",
      icon: <EnvelopeIcon className="w-5 h-5" />,
      action: () => console.log("Messages clicked"),
    },
    {
      label: "Sign out",
      icon: <ArrowRightOnRectangleIcon className="w-5 h-5" />,
      action: () => console.log("Sign out clicked"),
      danger: true,
    },
  ];

  return (
    <>
      {/* User info section */}
      <div
        className={`px-4 py-3 border-b ${
          darkMode ? "border-gray-600" : "border-gray-100"
        }`}
      >
        <p
          className={`text-sm font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {user.name}
        </p>
        <p
          className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-500"}`}
        >
          {user.email}
        </p>
      </div>

      {/* Menu items */}
      <div className="py-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              onItemClick?.();
            }}
            className={`flex items-center w-full px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
              item.danger
                ? darkMode
                  ? "text-red-400 hover:bg-red-900/30"
                  : "text-red-500 hover:bg-red-50"
                : darkMode
                ? "text-gray-200 hover:bg-gray-600"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span
              className={`mr-3 ${
                item.danger
                  ? darkMode
                    ? "text-red-400"
                    : "text-red-500"
                  : darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
};

UserDropdown.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  darkMode: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export default UserDropdown;
