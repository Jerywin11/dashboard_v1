const NavItem = ({ icon, text, active, onClick, sidebarOpen, darkMode }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full p-3 ${
        active
          ? darkMode
            ? "bg-indigo-900 text-indigo-100"
            : "bg-indigo-50 text-indigo-600"
          : darkMode
          ? "text-gray-300 hover:bg-gray-700"
          : "text-gray-600 hover:bg-gray-100"
      } rounded-l-sm transition-colors duration-200`}
    >
      <span
        className={`${
          active
            ? darkMode
              ? "text-indigo-200"
              : "text-indigo-600"
            : darkMode
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {icon}
      </span>
      {sidebarOpen && <span className="ml-3 font-medium">{text}</span>}
    </button>
  );
};

export default NavItem;
