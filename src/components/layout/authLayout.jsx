const AuthLayout = ({ title, subtitle, children }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-sm bg-white rounded-xl shadow p-8">
      <div className="flex justify-center mb-4">
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
          🎓
        </div>
      </div>

      <h2 className="text-xl font-semibold text-center">{title}</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        {subtitle}
      </p>

      {children}

      <p className="text-xs text-center text-gray-400 mt-6">
        Tutor Dashboard Footer · © 2023
      </p>
    </div>
  </div>
);

export default AuthLayout;
