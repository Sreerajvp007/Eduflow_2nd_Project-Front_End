import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../features/admin/adminAuthSlice";
import { useNavigate } from "react-router-dom";

import MuiInput from "../../components/common/input";
import MuiPasswordInput from "../../components/common/passwordInput";
import MuiButton from "../../components/common/button";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.admin);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(adminLogin(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Card */}
      <div className="w-full max-w-[360px] bg-white rounded-2xl shadow-lg px-6 py-8">
        
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
              <span className="text-white text-sm">🎓</span>
            </div>
            <span className="text-indigo-600 font-semibold text-lg">
              TutorFlow
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-900">
          Admin Login
        </h2>
        <p className="text-center text-sm text-gray-500 mt-1 mb-6">
          Hii..Admin welcome back !
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs text-center mb-3">
            {error}
          </p>
        )}

        {/* Form */}
   <form onSubmit={handleSubmit}>
  <div className="mb-5">
    <MuiInput
      label="User name"
      name="userName"
      value={formData.userName}
      onChange={handleChange}
      placeholder="admin@example.com"
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fff",
          color: "#111",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#d1d5db",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#9ca3af",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#4f46e5",
          borderWidth: "2px",
        },
        "& .MuiInputLabel-root": {
          color: "#6b7280",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4f46e5",
        },
      }}
    />
  </div>

  <div className="mb-6">
    <MuiPasswordInput
      label="Password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      sx={{
        "& .MuiOutlinedInput-root": {
          backgroundColor: "#fff",
          color: "#111",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#d1d5db",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#9ca3af",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#4f46e5",
          borderWidth: "2px",
        },
        "& .MuiInputLabel-root": {
          color: "#6b7280",
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#4f46e5",
        },
      }}
    />
  </div>

  <MuiButton
    type="submit"
    loading={loading}
    sx={{
      height: 52,
      borderRadius: 14,
      backgroundColor: "#4f46e5",
      fontSize: "1rem",
      fontWeight: 600,
      boxShadow: "0 12px 24px rgba(79,70,229,0.3)",
      "&:hover": {
        backgroundColor: "#4338ca",
      },
    }}
  >
    Login
  </MuiButton>
</form>



        
      </div>
    </div>
  );
};

export default AdminLogin;
