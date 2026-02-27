import { useEffect } from "react";

const BlockedPage = () => {
 
  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = () => {
      window.history.go(1);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-red-100">
        
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl text-red-600">🚫</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-red-600 mb-3">
          Account Blocked
        </h1>

        <p className="text-gray-600 mb-6 text-sm">
          Your account has been blocked by the administrator.
          Please contact support for further assistance.
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default BlockedPage;