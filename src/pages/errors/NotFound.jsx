import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-gray-600">Page not found</p>

      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
