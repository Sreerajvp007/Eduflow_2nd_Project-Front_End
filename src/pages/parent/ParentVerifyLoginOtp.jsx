import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  verifyParentLoginOtp,
  sendParentLoginOtp,
} from "../../features/parent/auth/parentAuthSlice";

import MuiButton from "../../components/common/button";
import MuiOtpInput from "../../components/common/OtpInput";

const ParentVerifyLoginOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const { loading, error } = useSelector(
    (state) => state.parentAuth
  );

  const email = state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);


  useEffect(() => {
    if (timer === 0) return;
    const t = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

 
  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    const res = await dispatch(
      verifyParentLoginOtp({ email, otp: code })
    );

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/parent/dashboard", { replace: true });
    }
  };


  const handleResend = async () => {
    await dispatch(sendParentLoginOtp({ email }));
    setTimer(30);
  };

  if (!email) return null;

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
          Verify OTP
        </h1>

        <p className="text-sm opacity-90">
          Enter the 6-digit code sent to your email
        </p>

        <p className="text-sm mt-1 opacity-80">
          {email.replace(/(.{1}).+(@.+)/, "$1****$2")}
        </p>

        {/* OTP INPUT */}
        <div className="mt-8">
          <MuiOtpInput
            value={otp}
            onChange={setOtp}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-200 text-sm mt-5">
            {error}
          </p>
        )}

        {/* RESEND */}
        <div className="mt-8">
          {timer > 0 ? (
            <p className="text-xs opacity-75">
              Resend OTP in 00:{timer.toString().padStart(2, "0")}
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-sm font-medium underline underline-offset-4"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* VERIFY BUTTON */}
        <div className="mt-10">
          <MuiButton
            loading={loading}
            onClick={handleVerify}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              "&:hover": { backgroundColor: "#000" },
            }}
          >
            Verify & Login
          </MuiButton>
        </div>
      </div>
    </div>
  );
};

export default ParentVerifyLoginOtp;
