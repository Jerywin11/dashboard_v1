import React, { useState } from "react";
import { FiArrowRight, FiGlobe, FiSmartphone, FiServer } from "react-icons/fi";

const Hero = ({
  title,
  highlightText,
  subtitle,
  primaryButton,
  secondaryButton,
  tabs,
  gradientFrom = "from-blue-400",
  gradientTo = "to-purple-500",
  blobColor1 = "bg-purple-600",
  blobColor2 = "bg-blue-600",
  background = "bg-gray-900",
  textColor = "text-gray-300",
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title.toLowerCase());

  return (
    <section className={`relative pt-32 pb-20 px-6 ${background}`}>
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${textColor}`}
          >
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
            >
              {highlightText}
            </span>
            <br />
            {title}
          </h1>
          <p className={`text-xl ${textColor} mb-8 max-w-lg`}>{subtitle}</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={primaryButton.onClick}
              className={`px-8 py-3 bg-gradient-to-r ${gradientFrom.replace(
                "from-",
                "from-"
              )} ${gradientTo.replace(
                "to-",
                "to-"
              )} rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center`}
            >
              {primaryButton.text} <FiArrowRight className="ml-2" />
            </button>
            <button
              onClick={secondaryButton.onClick}
              className={`px-8 py-3 border ${textColor.replace(
                "text-",
                "border-"
              )} rounded-full font-medium hover:bg-opacity-10 hover:bg-white transition-all`}
            >
              {secondaryButton.text}
            </button>
          </div>
        </div>

        {/* Interactive Code Panel */}
        <div className="lg:w-1/2 relative">
          <div className="relative w-full max-w-xl mx-auto">
            {/* Animated Blobs */}
            <div
              className={`absolute -top-10 -left-10 w-64 h-64 ${blobColor1} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`}
            ></div>
            <div
              className={`absolute -bottom-10 -right-10 w-64 h-64 ${blobColor2} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`}
            ></div>

            {/* Code Panel */}
            <div className="relative bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              {/* Window Controls */}
              <div className="flex space-x-2 p-4 bg-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <div className="flex mb-4 overflow-x-auto pb-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.title}
                      onClick={() => setActiveTab(tab.title.toLowerCase())}
                      className={`px-4 py-2 rounded-lg mr-2 flex items-center whitespace-nowrap ${
                        activeTab === tab.title.toLowerCase()
                          ? `bg-gradient-to-r ${gradientFrom} ${gradientTo} text-white`
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {tab.icon} <span className="ml-2">{tab.title}</span>
                    </button>
                  ))}
                </div>

                {tabs.map(
                  (tab) =>
                    activeTab === tab.title.toLowerCase() && (
                      <div
                        key={tab.title}
                        className="bg-gray-900 p-4 rounded-lg border border-gray-700"
                      >
                        <div className="text-blue-400 mb-2">
                          // {tab.code.title}
                        </div>
                        <div className="text-green-400 mb-2">
                          const {tab.code.variableName} = {"{"}
                        </div>
                        <div className="ml-4 text-gray-300">
                          {tab.code.properties.map((prop, index) => (
                            <div key={index}>
                              {prop.key}:{" "}
                              <span className="text-yellow-400">
                                {prop.value}
                                {index < tab.code.properties.length - 1
                                  ? ","
                                  : ""}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="text-green-400">{"}"}</div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
