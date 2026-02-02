import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const MuiButton = ({
  children,
  loading = false,
  type = "button",
  onClick,
  disabled = false,
  fullWidth = true,
  color = "primary",
  variant = "contained",
  sx = {},
}) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      fullWidth={fullWidth}
      variant={variant}
      color={color}
      sx={{
        height: 48,
        borderRadius: 12,
        textTransform: "none",
        fontSize: "1rem",
        fontWeight: 500,
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress size={22} color="inherit" />
      ) : (
        children
      )}
    </Button>
  );
};

export default MuiButton;
