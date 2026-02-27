
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import MuiInput from "../../components/common/input";
import MuiButton from "../../components/common/button";
import MuiRadioGroup from "../../components/common/Radio";

import { verifyParentSignupOtp } from "../../features/parent/auth/parentAuthSlice";

const ParentChildDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.parentAuth);

  const { fullName, email, mobile, otp } = state;

  const [child, setChild] = useState({
    name: "",
    grade: "",
    board: "STATE", // ✅ default board
  });

  const handleSubmit = async () => {
    const payload = {
      fullName,
      email,
      mobile,
      otp,
      child: child.name ? child : undefined,
    };

    const res = await dispatch(verifyParentSignupOtp(payload));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/parent/dashboard", { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-sky-400 flex items-center justify-center px-4">
      <div className="w-full max-w-[360px] text-white">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <span className="text-2xl">🎓</span>
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold text-center mb-1">
          Child Details 👶
        </h2>
        <p className="text-sm text-center opacity-90 mb-8">
          You can skip this step and add later
        </p>

        {/* FORM */}
        <div className="mt-6">

          {/* Name */}
          <div className="mb-6">
            <MuiInput
              label="Child's Name"
              value={child.name}
              onChange={(e) =>
                setChild({ ...child, name: e.target.value })
              }
              sx={glassInputSx}
            />
          </div>

          {/* Grade */}
          <div className="mb-6">
            <MuiInput
              label="Class / Grade"
              value={child.grade}
              onChange={(e) =>
                setChild({ ...child, grade: e.target.value })
              }
              sx={glassInputSx}
            />
          </div>

          {/* BOARD (REPLACED MEDIUM) */}
          <div className="mt-4">
            <p className="text-sm mb-3 opacity-90">
              Board
            </p>

            <MuiRadioGroup
              value={child.board}
              onChange={(val) =>
                setChild({ ...child, board: val })
              }
              options={[
                { label: "STATE", value: "STATE" },
                { label: "CBSE", value: "CBSE" },
                { label: "ICSE", value: "ICSE" },
              ]}
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-10 space-y-4">

          <MuiButton
            loading={loading}
            onClick={handleSubmit}
            sx={{
              height: 52,
              borderRadius: "999px",
              backgroundColor: "#000",
              fontSize: "1rem",
              "&:hover": {
                backgroundColor: "#000",
              },
            }}
          >
            Create Account
          </MuiButton>

          <button
            onClick={handleSubmit}
            className="w-full text-sm text-white/90 underline underline-offset-4"
          >
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
};

export default ParentChildDetails;

/* ===== GLASS INPUT STYLE ===== */
const glassInputSx = {
  "& .MuiOutlinedInput-root": {
    height: 52,
    borderRadius: "16px",
    backgroundColor: "rgba(255,255,255,0.25)",
    backdropFilter: "blur(10px)",
    color: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(255,255,255,0.45)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#fff",
    borderWidth: "2px",
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255,255,255,0.9)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#fff",
  },
};