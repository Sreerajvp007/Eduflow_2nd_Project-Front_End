import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tutorSignup } from "../../features/tutor/auth/tutorAuthSlice";
import { Link } from "react-router-dom";
import MuiButton from "../../components/common/button";
import MuiInput from "../../components/common/input";
import MuiPasswordInput from "../../components/common/passwordInput";

const TutorSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { accessToken, loading, error } = useSelector(
  (state) => state.tutorAuth
);
;


  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(tutorSignup(formData));
  };

useEffect(() => {
  if (accessToken) {
    navigate("/tutor/onboarding", { replace: true });
  }
}, [accessToken, navigate]);



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
          Tutor Signup
        </h2>
        <p className="text-center text-xs text-gray-400 mt-1 mb-6">
          Create your tutor account to get started
        </p>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-[11px] text-center mb-3">
            {error}
          </p>
        )}

      <form onSubmit={handleSubmit}>
  {/* Full Name */}
  <div className="mb-4">
    <MuiInput
      label="Full Name"
      name="fullName"
      value={formData.fullName}
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

  {/* Email */}
  <div className="mb-4">
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

  {/* Mobile */}
  <div className="mb-4">
    <MuiInput
      label="Mobile Number"
      name="mobile"
      value={formData.mobile}
      onChange={handleChange}
      placeholder="+1 (US) 123 456 7890"
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

  {/* Password */}
  <div className="mb-4">
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

  {/* Confirm Password */}
  <div className="mb-6">
    <MuiPasswordInput
      label="Confirm Password"
      name="confirmPassword"
      value={formData.confirmPassword}
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

  {/* Submit Button */}
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
    Create Tutor Account
  </MuiButton>
</form>


        {/* Info text */}
        <p className="mt-4 text-center text-[11px] text-gray-400">
          You’ll complete your teaching profile and verification details after signup.
        </p>

        {/* Footer */}
        <p className="mt-3 text-center text-xs text-indigo-500">
  Already have an account?{" "}
  <Link
    to="/tutor/login"
    className="hover:underline"
  >
    Login
  </Link>
</p>

      </div>
    </div>
  );
};

export default TutorSignup;
