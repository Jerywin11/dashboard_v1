import React from "react";
import PropTypes from "prop-types";

const StatCard = ({ title, value, change, trend, darkMode }) => {
  return (
    <div
      className={`rounded-lg shadow p-4 sm:p-6 transition-colors duration-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex justify-between items-start">
        {/* Stat Info */}
        <div>
          <p
            className={`text-sm font-medium ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {title}
          </p>
          <p
            className={`mt-1 text-xl sm:text-2xl font-semibold ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </p>
        </div>

        {/* Trend Badge */}
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            trend === "up"
              ? darkMode
                ? "bg-green-900 text-green-200"
                : "bg-green-100 text-green-800"
              : darkMode
              ? "bg-red-900 text-red-200"
              : "bg-red-100 text-red-800"
          }`}
        >
          {change}
          {trend === "up" ? (
            <svg
              className="ml-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="ml-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

const StatsGrid = ({
  stats,
  cols = { sm: 2, lg: 4 },
  className = "",
  darkMode = false,
}) => {
  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-${cols.sm} lg:grid-cols-${cols.lg} gap-4 ${className}`}
    >
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          trend={stat.trend}
          darkMode={darkMode}
        />
      ))}
    </section>
  );
};

// PropTypes for type checking
StatsGrid.propTypes = {
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      change: PropTypes.string.isRequired,
      trend: PropTypes.oneOf(["up", "down"]).isRequired,
    })
  ).isRequired,
  cols: PropTypes.shape({
    sm: PropTypes.number,
    lg: PropTypes.number,
  }),
  className: PropTypes.string,
  darkMode: PropTypes.bool,
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(["up", "down"]).isRequired,
  darkMode: PropTypes.bool,
};

export default StatsGrid;
