
import { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Eye, EyeOff } from "lucide-react";

import MuiInput from "./input";

const MuiPasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error = false,
  helperText = "",
  sx = {},
}) => {
  const [show, setShow] = useState(false);

  return (
    <MuiInput
      label={label}
      name={name}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      rightIcon={
        <IconButton
          edge="end"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          sx={{ color: "inherit" }}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </IconButton>
      }
      sx={{
        "& .MuiOutlinedInput-root": {
          pr: 1, 
        },
        ...sx,
      }}
    />
  );
};

export default MuiPasswordInput;
