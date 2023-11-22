import { Box, CssBaseline } from "@mui/material";
import Header from "../Header";
import Footer from "../Footer";
const Layout = ({ children }: any) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, mt: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
