import TextField from "@mui/material/TextField";

const MuiTextField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  error = false,
  helperText = "",
  multiline = false,
  rows = 4,
  fullWidth = true,
  variant = "outlined",
  sx = {},
}) => {
  return (
    <TextField
      fullWidth={fullWidth}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      variant={variant}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: multiline ? "auto" : 52,
          borderRadius: "14px",
          backgroundColor: "#fff",
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

        "& .MuiFormHelperText-root": {
          marginLeft: 0,
        },

        ...sx,
      }}
    />
  );
};

export default MuiTextField;
