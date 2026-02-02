import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { sendParentLoginOtp } from "../../features/parent/auth/parentAuthSlice";

import MuiButton from "../../components/common/button";
import MuiInput from "../../components/common/input";
const ParentLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.parentAuth);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(sendParentLoginOtp({ email }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/parent/verify-login-otp", { state: { email } });
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
          Parent Login
        </h1>
        <p className="text-base opacity-90 mb-8">
          Enter your email to receive an OTP
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-200 text-sm mb-4">
            {error}
          </p>
        )}

        {/* EMAIL INPUT – GLASS STYLE */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2 text-left">
            <MuiInput
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

          </div>

          {/* BUTTON – SAME AS OTP PAGE */}
          <MuiButton
  type="submit"
  loading={loading}
  sx={{
    backgroundColor: "#000",
    "&:hover": { backgroundColor: "#000" },
  }}
>
  Send OTP
</MuiButton>

        </form>

        {/* FOOTER */}
        <p className="mt-6 text-base opacity-90">
          New parent?{" "}
          <Link
            to="/parent/signup"
            className="underline underline-offset-4 font-medium"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ParentLogin;
