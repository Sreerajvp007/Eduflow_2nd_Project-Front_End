import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ParentVerifySignupOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); 

  const { email, fullName, mobile } = state || {};

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const inputsRef = useRef([]);


  useEffect(() => {
    if (timer === 0) return;
    const t = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

 
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    if (!pasted.length) return;

    const newOtp = [...otp];
    pasted.forEach((v, i) => (newOtp[i] = v));
    setOtp(newOtp);

    inputsRef.current[pasted.length - 1]?.focus();
  };

 
  const handleVerify = () => {
    const code = otp.join("");
    if (code.length !== 6) return;

    navigate("/parent/child-details", {
      state: {
        fullName,
        email,
        mobile,
        otp: code,
      },
    });
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

        <h1 className="text-2xl font-semibold mb-2">Verify OTP</h1>
        <p className="text-sm opacity-90 mb-1">
          Enter the 6-digit code sent to your email
        </p>
        <p className="text-sm opacity-80 mb-8">
          {email.replace(/(.{1}).+(@.+)/, "$1****$2")}
        </p>

        {/* OTP INPUTS */}
        <div
          onPaste={handlePaste}
          className="flex justify-center gap-3 mb-6"
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              variant="outlined"
              inputProps={{
                maxLength: 1,
                inputMode: "numeric",
                style: {
                  textAlign: "center",
                  fontSize: "1.25rem",
                  padding: 0,
                },
              }}
              sx={{
                width: 44,
                "& .MuiOutlinedInput-root": {
                  height: 48,
                  borderRadius: "12px",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.4)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
              }}
            />
          ))}
        </div>

        {/* RESEND */}
        <div className="text-sm opacity-80 mb-8">
          {timer > 0 ? (
            <>Resend OTP in 00:{timer.toString().padStart(2, "0")}</>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="underline underline-offset-4"
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* NEXT BUTTON */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleVerify}
          sx={{
            height: 48,
            borderRadius: "14px",
            backgroundColor: "#000",
            textTransform: "none",
            fontSize: "0.95rem",
            "&:hover": {
              backgroundColor: "#000",
            },
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ParentVerifySignupOtp;
