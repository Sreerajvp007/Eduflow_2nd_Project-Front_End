import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendParentSignupOtp } from "../../features/parent/auth/parentAuthSlice";

import MuiButton from "../../components/common/button";
import MuiInput from "../../components/common/input";
const ParentSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.parentAuth
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendParentSignupOtp(formData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/parent/verify-signup-otp", { state: formData });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-sky-400 flex items-center justify-center px-4">
      <div className="w-full max-w-[360px] text-center text-white">

         {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold mb-2">
          Parent Signup
        </h1>
        <p className="text-base opacity-90 mb-10">
          Enter your details to continue
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-200 text-sm mb-4">
            {error}
          </p>
        )}

        {/* FORM */}
        <form
          onSubmit={handleNext}
          className="flex flex-col gap-6 text-left"
        >
          {/* FULL NAME */}
          <div className="flex flex-col gap-2">
            {/* <label className="text-sm opacity-90">
              Full Name
            </label> */}
           <MuiInput
  label="Full Name"
  name="fullName"
  value={formData.fullName}
  onChange={handleChange}
/>
          </div>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            {/* <label className="text-sm opacity-90">
              Email Address
            </label> */}
           <MuiInput
  label="Email Address"
  name="email"
  type="email"
  value={formData.email}
  onChange={handleChange}
/>
          </div>

          {/* MOBILE */}
          <div className="flex flex-col gap-2">
            {/* <label className="text-sm opacity-90">
              Mobile Number
            </label> */}
           <MuiInput
  label="Mobile Number"
  name="mobile"
  type="tel"
  value={formData.mobile}
  onChange={handleChange}
/>
          </div>

          {/* BUTTON */}
          <MuiButton
  type="submit"
  loading={loading}
  sx={{
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#000",
    },
  }}
>
  Continue
</MuiButton>

        </form>
      </div>
    </div>
  );
};

export default ParentSignup;
