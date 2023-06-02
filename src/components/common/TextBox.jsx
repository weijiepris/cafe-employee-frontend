import { TextField } from "@mui/material";
import React from "react";

const TextBox = ({ label, inputRef, type, InputLabelProps, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      inputRef={inputRef}
      InputLabelProps={InputLabelProps}
      onChange={onChange}
    />
  );
};

export default TextBox;
