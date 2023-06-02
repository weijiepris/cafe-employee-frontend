import { Typography } from "@mui/material";
import React from "react";

const Header = ({ children }) => {
  return (
    <>
      <Typography variant="h4" component="div">
        {children}
      </Typography>
      <br />
    </>
  );
};

export default Header;
