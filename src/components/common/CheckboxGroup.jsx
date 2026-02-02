import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const MuiCheckboxGroup = ({
  values = [],
  onChange,
  options = [],
  theme = "light",
}) => {
  const isDark = theme === "dark";

  const toggle = (val) => {
    onChange(
      values.includes(val)
        ? values.filter((v) => v !== val)
        : [...values, val]
    );
  };

  return (
    <div className="flex flex-wrap gap-4">
      {options.map((opt) => (
        <FormControlLabel
          key={opt.value}
          control={
            <Checkbox
              checked={values.includes(opt.value)}
              onChange={() => toggle(opt.value)}
              sx={{
                color: isDark ? "rgba(255,255,255,0.6)" : "#9ca3af",
                "&.Mui-checked": {
                  color: isDark ? "#fff" : "#4f46e5",
                },
              }}
            />
          }
          label={opt.label}
          sx={{
            color: isDark ? "#fff" : "#374151",
          }}
        />
      ))}
    </div>
  );
};

export default MuiCheckboxGroup;
