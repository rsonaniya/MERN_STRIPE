import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const { cartItems } = useSelector((state) => state.order);
  const navigate = useNavigate();
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ISHOP
          </Typography>
          <Badge badgeContent={cartItems.length} color="error">
            <IconButton onClick={() => navigate("/cart")}>
              <ShoppingCartIcon sx={{ color: "white" }} />
            </IconButton>
          </Badge>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
