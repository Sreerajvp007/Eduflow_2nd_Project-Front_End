import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tutorLogin } from "../../features/tutor/auth/tutorAuthSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import MuiInput from "../../components/common/input";
import MuiPasswordInput from "../../components/common/passwordInput";
import MuiButton from "../../components/common/button";


const TutorLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const { tutor, loading, error } = useSelector(
  (state) => state.tutorAuth
);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tutorLogin(formData));
  };

  // useEffect(() => {
  //   if (tutor) {
  //     if (tutor.onboardingStatus !== "completed") {
  //       navigate("/tutor/onboarding");
  //     } else {
  //       navigate("/tutor/dashboard");
  //     }
  //   }
  // }, [tutor, navigate]);
  useEffect(() => {
  if (!tutor) return;

  // If admin approved
  if (tutor.status === "active") {
    navigate("/tutor/dashboard");
    return;
  }

  // If onboarding submitted but not approved yet
  if (tutor.onboardingStatus === "submitted") {
    navigate("/tutor/onboarding");
    return;
  }

  // Otherwise go to onboarding form
  navigate("/tutor/onboarding");

}, [tutor, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Card */}
      <div className="w-full max-w-[360px] bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <div className="w-8 h-8 rounded-md bg-indigo-500 flex items-center justify-center mb-1">
            <span className="text-white text-xs">🎓</span>
          </div>
          <span className="text-indigo-600 text-sm font-medium">
            TutorFlow
          </span>
        </div>

        {/* Title */}
        <h2 className="text-center text-lg font-semibold text-gray-900">
          Tutor Login
        </h2>
        <p className="text-center text-xs text-gray-400 mt-1 mb-6">
          Hi tutor..Welcome back..
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-[11px] text-center mb-3">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
  {/* Email */}
  <div className="mb-5">
    <MuiInput
  label="Email Address"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="john.doe@example.com"
  sx={{
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      color: "#111",               
    },
    "& input::placeholder": {
      color: "#9ca3af",           
      opacity: 1,
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

  {/* Password */}
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

  {/* Login Button */}
  <MuiButton
              type="submit"
              loading={loading}
              sx={{
                mt: 1,
                height: 52,
                borderRadius: "14px",
                backgroundColor: "#4f46e5",
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 12px 24px rgba(79,70,229,0.35)",
                "&:hover": {
                  backgroundColor: "#4338ca",
                },
              }}
            >
              Login
            </MuiButton>
</form>

        {/* Footer */}
        <p className="mt-4 text-center text-xs text-indigo-500">
  Not a tutor yet?{" "}
  <Link
    to="/tutor/signup"
    className="cursor-pointer hover:underline"
  >
    Signup
  </Link>
</p>
      </div>
    </div>
  );
};

export default TutorLogin;
