import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const MuiRadioGroup = ({
  value,
  onChange,
  options = [],
  direction = "row",
  theme = "dark", 
}) => {
  const isDark = theme === "dark";

  return (
    <RadioGroup
      row={direction === "row"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <FormControlLabel
          key={opt.value}
          value={opt.value}
          control={
            <Radio
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
            mr: 3,
          }}
        />
      ))}
    </RadioGroup>
  );
};

export default MuiRadioGroup;
