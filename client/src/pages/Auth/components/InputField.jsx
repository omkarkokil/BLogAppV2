import { FormControl, InputAdornment, TextField } from "@mui/material";

const InputField = ({
  type = "text",
  label,
  icon: Icon,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <FormControl margin="dense">
        <TextField
          type={type}
          id="filled-basic"
          label={label}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {type !== "file" && <Icon />}
              </InputAdornment>
            ),
          }}
          margin="dense"
          variant="outlined"
          name={name}
          value={value}
          onChange={onChange}
          sx={{ width: "400px" }}
        />
      </FormControl>
    </>
  );
};

export default InputField;
