// TestPage.jsx
import { useState, useEffect } from "react";
import Card from "../components/Card.jsx";

export default function TestPage() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://localhost:5000/api/user");
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            User Profile
          </h1>
          <p className="text-gray-500 mt-2">
            View and manage your account details
          </p>
        </header>

        {isLoading ? (
          <Card>
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          </Card>
        ) : error ? (
          <Card>
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mt-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Personal Information
                  </h2>
                  <p className="text-gray-500">
                    Basic details about your account
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Username
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {user.username || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {user.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    Additional Details
                  </h2>
                  <p className="text-gray-500">
                    More information about your profile
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Full Name
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {[user.first_name, user.last_name]
                        .filter(Boolean)
                        .join(" ") || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Role
                    </p>
                    <p className="text-lg font-medium text-gray-800 capitalize">
                      {user.role || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      User ID
                    </p>
                    <p className="text-lg font-medium text-gray-800 font-mono">
                      {user.id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
// {
//   "scripts": {
//     "start:frontend": "serve -s \"C:/Web App/React Project/Dashboard v1/client/dist\"",
//     "start:backend": "npm start --prefix server",
//     "start": "concurrently \"npm run start:frontend\" \"npm run start:backend\""
//   }
// }
