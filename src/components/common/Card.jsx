import { Box } from "@mui/material";
import React from "react";

const Card = ({ children }) => {
  return (
    <Box sx={{ marginTop: "100px", textAlign: "center", width: "99vw" }}>
      {children}
    </Box>
  );
};

export default Card;
