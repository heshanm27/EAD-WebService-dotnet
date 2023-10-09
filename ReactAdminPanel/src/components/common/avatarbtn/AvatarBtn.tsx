import React from "react";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useAppDispatch, useAppSelector } from "../../../redux/redux-hooks";
import { pascalCase } from "change-case";
import { logOut } from "../../../redux/auth/authslice";
import { useNavigate } from "react-router-dom";

export default function AvatarBtn() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { firstName, avatar, role } = useAppSelector((state) => state.authSlice);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    switch (role) {
      case "seller":
        navigate("/seller/orders/live", { replace: true });
        break;
      case "admin":
        navigate("/admin/orders/live", { replace: true });
        break;
      default:
        navigate("/user/orders", { replace: true });
        break;
    }
    setAnchorEl(null);
  };

  const hadnleLogout = () => {
    dispatch(logOut("logout"));
    navigate("/signin", { replace: true });
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        variant="text"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={<Avatar alt="Remy Sharp" src={avatar} />}
        endIcon={<ArrowDropDownIcon />}
      >
        {pascalCase(firstName) || "User"}
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>Dashboard</MenuItem>
        <MenuItem onClick={hadnleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}
