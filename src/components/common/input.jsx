import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const MuiInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error = false,
  helperText = "",
  rightIcon,
  fullWidth = true,
  sx = {},
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      variant="outlined"
      InputProps={{
        endAdornment: rightIcon ? (
          <InputAdornment position="end">
            {rightIcon}
          </InputAdornment>
        ) : null,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 48,
          borderRadius: "12px",
          backgroundColor: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          color: "#fff",
        },
        "& .MuiInputLabel-root": {
          color: "rgba(255,255,255,0.8)",
        },
        "& .MuiInputLabel-root.Mui-focused": {
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
        "& .MuiFormHelperText-root": {
          color: error ? "#fecaca" : "rgba(255,255,255,0.7)",
        },
        ...sx,
      }}
    />
  );
};

export default MuiInput;
