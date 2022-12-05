import { SpeedDial, SpeedDialAction } from "@mui/material";
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from "@mui/icons-material";
import { Backdrop } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import "./header.css";

const UserOptions = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);
  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function cart() {
    navigate("/cart");
  }
  function account() {
    navigate("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        style={{ zIndex: "11" }}
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/user-icon.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item, i) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
            key={i}
          />
        ))}
      </SpeedDial>{" "}
    </>
  );
};

export default UserOptions;
