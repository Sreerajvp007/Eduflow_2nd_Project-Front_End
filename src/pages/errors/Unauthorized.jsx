const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center border border-yellow-200">
        
        <div className="mb-4 text-4xl">⚠️</div>

        <h1 className="text-2xl font-bold text-yellow-600 mb-3">
          Unauthorized Access
        </h1>

        <p className="text-gray-600 text-sm mb-6">
          You are not authorized to access this page.
          Please login again.
        </p>

        <button
          onClick={() => (window.location.href = "/login")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;