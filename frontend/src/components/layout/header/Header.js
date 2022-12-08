import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import {
  ShoppingCart,
  AccountCircle,
  Search as SearchIcon,
  MoreVert,
  ListAlt,
  Home,
  ExitToApp,
  Checkroom,
} from "@mui/icons-material";
import logo from "../../../images/logo.jpg";
import UserOptions from "./UserOptions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import store from "../../../store";
import { loadUser, logout } from "../../../actions/UserAction";

const Search = styled("form")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [value, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate(`/products`);
    }
  };

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const mobileMenu = [
    { url: "/", icon: <Home />, text: "Home" },
    { url: "/products", icon: <Checkroom />, text: "Products" },
    { url: "/orders", icon: <ListAlt />, text: "Bag" },
    { url: "/cart", icon: <ShoppingCart />, text: "Orders" },
  ];
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {mobileMenu.map((item, i) => (
        <Link to={item.url}>
          <MenuItem>
            <IconButton size="large" color="inherit">
              {item.icon}
            </IconButton>
            <p>{item.text}</p>
          </MenuItem>
        </Link>
      ))}
      {isAuthenticated ? (
        <MenuItem onClick={logoutUser}>
          <IconButton size="large" color="inherit">
            <ExitToApp />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <Link to="/login">
          <MenuItem>
            <IconButton size="large" color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Login</p>
          </MenuItem>
        </Link>
      )}
    </Menu>
  );

  const bottonNavigationActionList = [
    { label: "Home", icon: <Home />, func: toHome },
    { label: "Products", icon: <Checkroom />, func: toProduct },
    { label: "Orders", icon: <ListAlt />, func: toOrder },
    { label: "Bag", icon: <ShoppingCart />, func: toCart },
  ];

  if (!isAuthenticated) {
    bottonNavigationActionList.push({
      label: "Login",
      icon: <AccountCircle />,
      func: toLogin,
    });
  }
  function toHome() {
    navigate("/");
  }
  function toProduct() {
    navigate("/products");
  }
  function toOrder() {
    navigate("/orders");
  }
  function toCart() {
    navigate("/cart");
  }
  function toLogin() {
    navigate("/login");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: { xs: "sticky" },
        width: "100%",
        top: 0,
        zIndex: 1,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link to="/">
              <img src={logo} alt="IndiaKart" />
            </Link>
          </Typography>
          <Search onSubmit={searchSubmitHandler}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <BottomNavigation
              sx={{ backgroundColor: "inherit" }}
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              {bottonNavigationActionList.map((item, i) => (
                <BottomNavigationAction
                  sx={{ minWidth: "50px", color: "white" }}
                  label={item.label}
                  icon={item.icon}
                  onClick={item.func}
                />
              ))}
            </BottomNavigation>
            {isAuthenticated && <UserOptions user={user} />}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}

// {/* <Tooltip title="Login/Register">
//   <Link className="loginHover" to="/login">
//     <AccountCircle />
//   </Link>
// </Tooltip> */}
