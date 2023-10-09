import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Logo from "../../../assets/images/logoTest41.png";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AvatarBtn from "../avatarbtn/AvatarBtn";
import { Button, Container, Paper, useTheme } from "@mui/material";
import { useAppSelector } from "../../../redux/redux-hooks";
import { Typography, Link, Badge } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SearchField from "../SearchField/SearchField";
import { useEffect, useState } from "react";
export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.authSlice);
  const { items } = useAppSelector((state) => state.cartSlice);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "/list" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <Container maxWidth="xl" sx={{ height: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Link href="/">
              <img src={Logo} alt="logo" style={{ width: "100px", height: "50px" }} />
            </Link>

            <Box sx={{ width: "50%" }}>
              <SearchField />
            </Box>
            <Box>
              <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
                {isLoggedIn ? <AvatarBtn /> : <Login />}

                <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }} onClick={() => navigate("/cart")}>
                  <Badge badgeContent={items.length} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Stack>
            </Box>
            {/* <Box>
            <Button color="primary">Login</Button>
            <Button color="secondary">Signup</Button>
          </Box> */}

            {/* <img src={Logo} alt="logo" style={{ width: "100px", height: "100px" }} /> */}
          </Container>
        </Toolbar>
        <Toolbar>
          <Container maxWidth="xl">
            <Stack direction={"row"} justifyContent={"end"}>
              {menuItems.map((item) => (
                <Box key={item.label}>
                  <CustomLink label={item.label} url={item.link} />
                </Box>
              ))}
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <Box sx={{ ...theme.mixins.toolbar, mb: 5 }}></Box>
      <Box sx={{ ...theme.mixins.toolbar }}></Box>
    </>
  );
}

function Login() {
  return (
    <>
      <Typography variant="caption" component="h1">
        Hi!
      </Typography>
      <Typography variant="caption">
        <Link href="/signin" underline="hover">
          Sign in
        </Link>{" "}
        or{" "}
        <Link href="/register" underline="hover">
          register
        </Link>
      </Typography>
      <Typography variant="caption" component="h1">
        <Link href="/register/seller" underline="hover" color={"black"}>
          Sell
        </Link>
      </Typography>
    </>
  );
}
interface ICustomLink {
  label: string;
  url: string;
}
function CustomLink({ label, url }: ICustomLink) {
  const { pathname } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const theme = useTheme();
  useEffect(() => {
    if (pathname === url) {
      setIsActive(true);
    }
  }, [pathname]);

  return (
    <Link sx={{ ml: 4, mr: 4, fontSize: "18px" }} href={url} underline="hover" color={isActive ? theme.palette.primary.main : theme.palette.common.black}>
      {label}
    </Link>
  );
}
