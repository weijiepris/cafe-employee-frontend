import { TextField } from "@mui/material";
import React from "react";

const TextBox = ({
  label,
  inputRef,
  type,
  InputLabelProps,
  onChange,
  value,
  disabled,
  onKeyDown,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      defaultValue={value}
      inputRef={inputRef}
      InputLabelProps={InputLabelProps}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={disabled}
    />
  );
};

export default TextBox;
