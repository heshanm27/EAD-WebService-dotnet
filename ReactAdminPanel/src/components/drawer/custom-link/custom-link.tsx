import { ListItemButton, ListItemText, Tooltip, Typography, ListItem, ListItemIcon, useTheme, Stack } from "@mui/material";
import { pascalCase } from "change-case";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/redux-hooks";
import { logOut } from "../../../redux/auth/authslice";
type CustomLinkProps = {
  label: string;
  icon: ReactNode;
  activeIcon: ReactNode;
  drawerStatus: boolean;
  path: string;
};
export default function CustomLink({ drawerStatus, label, icon, path, activeIcon }: CustomLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isActive = location.pathname === path;

  const handleClick = () => {
    if (path === "/logout") {
      dispatch(logOut("logged out"));
      return;
    }
    navigate(path, { replace: true });
  };
  return (
    <Tooltip title={label} placement="right" arrow>
      <ListItem
        sx={{
          p: 0,
          m: 1,
          mt: 2,
          mb: 2,
          width: "calc(100% - 16px)",
        }}
      >
        <ListItemButton
          sx={{
            backgroundColor: isActive ? "#E9FBCD" : "",
            borderRadius: theme.spacing(1),
            display: "flex",
            justifyContent: "space-between",
          }}
          onClick={() => handleClick()}
        >
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={4}>
            <ListItemIcon
              sx={{
                color: isActive ? "#66A700" : "#878787",
                minWidth: "auto",
              }}
            >
              {isActive ? activeIcon : icon}
            </ListItemIcon>
            {drawerStatus ? (
              <ListItemText>
                <Typography
                  sx={{
                    color: isActive ? "#66A700" : "#878787",
                  }}
                >
                  {label}
                </Typography>
              </ListItemText>
            ) : null}
          </Stack>
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
