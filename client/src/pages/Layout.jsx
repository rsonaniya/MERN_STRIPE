import { Box } from "@mui/material";
import NavBar from "../components/NavBar";

export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <Box marginTop="64px">{children}</Box>
    </div>
  );
}
