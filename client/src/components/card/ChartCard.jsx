import React from "react";
import PropTypes from "prop-types";

const ChartCard = ({
  title,
  data,
  timeRange,
  setTimeRange,
  darkMode = false,
  className = "",
  height = "h-64",
}) => {
  const timeRanges = [
    { label: "Week", value: "week" },
    { label: "Month", value: "month" },
    { label: "Year", value: "year" },
  ];

  return (
    <div
      className={`rounded-lg shadow p-6 mb-6 transition-colors duration-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3
          className={`text-lg font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          } mb-2 sm:mb-0`}
        >
          {title}
        </h3>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-sm rounded-md ${
                timeRange === range.value
                  ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className={`${height} w-full relative`}>
        {/* Y-axis labels */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between text-xs ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <span>$10k</span>
          <span>$7.5k</span>
          <span>$5k</span>
          <span>$2.5k</span>
          <span>$0</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-8 right-0 top-0 bottom-6">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[0, 0.25, 0.5, 0.75, 1].map((position) => (
              <div
                key={position}
                className={`border-t ${
                  darkMode ? "border-gray-700" : "border-gray-100"
                }`}
                style={{ top: `${position * 100}%` }}
              ></div>
            ))}
          </div>

          {/* Current year line */}
          <svg className="w-full h-full">
            <path
              d={`
                M${(0 / (data.labels.length - 1)) * 100}%,
                ${100 - (data.datasets[0].data[0] / 10000) * 100}%
                ${data.labels
                  .slice(1)
                  .map(
                    (_, i) => `
                  L${((i + 1) / (data.labels.length - 1)) * 100}%,
                  ${100 - (data.datasets[0].data[i + 1] / 10000) * 100}%
                `
                  )
                  .join(" ")}
              `}
              fill="none"
              stroke="rgba(99, 102, 241, 1)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Fill area */}
            <path
              d={`
                M${(0 / (data.labels.length - 1)) * 100}%,
                ${100 - (data.datasets[0].data[0] / 10000) * 100}%
                ${data.labels
                  .slice(1)
                  .map(
                    (_, i) => `
                  L${((i + 1) / (data.labels.length - 1)) * 100}%,
                  ${100 - (data.datasets[0].data[i + 1] / 10000) * 100}%
                `
                  )
                  .join(" ")}
                L100%,100%
                L0%,100%
                Z
              `}
              fill="rgba(99, 102, 241, 0.1)"
            />
          </svg>

          {/* Previous year line */}
          <svg className="w-full h-full absolute top-0 left-0">
            <path
              d={`
                M${(0 / (data.labels.length - 1)) * 100}%,
                ${100 - (data.datasets[1].data[0] / 10000) * 100}%
                ${data.labels
                  .slice(1)
                  .map(
                    (_, i) => `
                  L${((i + 1) / (data.labels.length - 1)) * 100}%,
                  ${100 - (data.datasets[1].data[i + 1] / 10000) * 100}%
                `
                  )
                  .join(" ")}
              `}
              fill="none"
              stroke={
                darkMode ? "rgba(156, 163, 175, 1)" : "rgba(203, 213, 225, 1)"
              }
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 2"
            />
          </svg>

          {/* Data points */}
          <div className="absolute inset-0">
            {data.labels.map((_, i) => (
              <div
                key={i}
                className="absolute group"
                style={{
                  left: `${(i / (data.labels.length - 1)) * 100}%`,
                  bottom: `${(data.datasets[0].data[i] / 10000) * 100}%`,
                  transform: "translate(-50%, 50%)",
                }}
              >
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <div
                  className={`absolute -top-8 left-1/2 transform -translate-x-1/2 ${
                    darkMode ? "bg-gray-700" : "bg-gray-800"
                  } text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap`}
                >
                  ${data.datasets[0].data[i].toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* X-axis labels */}
        <div className="absolute left-8 right-0 bottom-0 h-6 flex justify-between px-2">
          {data.labels.map((month) => (
            <span
              key={month}
              className={`text-xs ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {month}
            </span>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute top-0 right-0 flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Current Year
            </span>
          </div>
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-1 ${
                darkMode ? "bg-gray-400" : "bg-gray-500"
              }`}
            ></div>
            <span
              className={`text-xs ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Previous Year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    datasets: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
    ).isRequired,
  }).isRequired,
  timeRange: PropTypes.string.isRequired,
  setTimeRange: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  height: PropTypes.string,
};

export default ChartCard;
