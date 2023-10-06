import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface INavBarMenuProps {
  menuItems: { icon?: JSX.Element; text: string; url: string }[];
  anchorEl: null | HTMLElement;
  setAnchorEl: any;
}

export default function NavBarMenu({ anchorEl, menuItems, setAnchorEl }: INavBarMenuProps) {
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClose = (name: any) => {
    menuItems.forEach((item) => {
      if (name === item.text) {
        navigate(item.url, { replace: true });
        setAnchorEl(null);
      }
    });
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
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
      {menuItems.map(({ icon, text, value }: any, index) => (
        <MenuItem key={index} onClick={handleClose}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          {text}
        </MenuItem>
      ))}
    </Menu>
  );
}
