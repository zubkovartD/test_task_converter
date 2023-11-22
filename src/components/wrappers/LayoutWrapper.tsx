import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

interface LayoutWrapperProps {
  text: string;
}

const LayoutWrapper = ({ text }: LayoutWrapperProps) => {
  return (
    <AppBar position="static" sx={{ top: "auto", bottom: 0, height: 100 }}>
      <Container>
        <Toolbar sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {text}
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default LayoutWrapper;
