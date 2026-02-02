import { useRef } from "react";
import TextField from "@mui/material/TextField";

const MuiOtpInput = ({
  value = [],
  length = 6,
  onChange,
}) => {
  const inputsRef = useRef([]);

 
  const handleChange = (val, index) => {
    if (!/^[0-9]?$/.test(val)) return;

    const newOtp = [...value];
    newOtp[index] = val;
    onChange(newOtp);

    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };


  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .slice(0, length)
      .split("");

    if (!pasted.every((c) => /^[0-9]$/.test(c))) return;

    const newOtp = [...value];
    pasted.forEach((char, i) => {
      newOtp[i] = char;
    });

    onChange(newOtp);
    inputsRef.current[pasted.length - 1]?.focus();
  };

  return (
    <div
      onPaste={handlePaste}
      className="flex justify-center gap-3"
    >
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          inputRef={(el) => (inputsRef.current[index] = el)}
          value={value[index] || ""}
          onChange={(e) =>
            handleChange(e.target.value, index)
          }
          onKeyDown={(e) =>
            handleKeyDown(e, index)
          }
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
              borderColor: "rgba(255,255,255,0.35)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.6)",
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff",
            },
          }}
        />
      ))}
    </div>
  );
};

export default MuiOtpInput;
