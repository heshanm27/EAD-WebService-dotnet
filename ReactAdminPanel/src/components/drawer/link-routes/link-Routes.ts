import PhotoCamera from "@mui/icons-material/PhotoCamera";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import { createElement } from "react";
type LinkRoute = {
  path: string;
  name: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};

export const ADMIN_ROUTES: LinkRoute[] = [
  {
    path: "/admin/orders/live",
    name: "Live Orders",
    icon: createElement(WorkHistoryOutlinedIcon),
    activeIcon: createElement(WorkHistoryIcon),
  },
  {
    path: "/admin/orders/history",
    name: "Order History",
    icon: createElement(ShoppingBagOutlinedIcon),
    activeIcon: createElement(ShoppingBagIcon),
  },
  {
    path: "/admin/categories",
    name: "Categories",
    icon: createElement(CategoryOutlinedIcon),
    activeIcon: createElement(CategoryIcon),
  },
  {
    path: "/admin/usermangment",
    name: "User Management",
    icon: createElement(ManageAccountsOutlinedIcon),
    activeIcon: createElement(ManageAccountsIcon),
  },
];

export const SELLER_ROUTES: LinkRoute[] = [
  {
    path: "/seller/orders/live",
    name: "Live Orders",
    icon: createElement(WorkHistoryOutlinedIcon),
    activeIcon: createElement(WorkHistoryIcon),
  },
  {
    path: "/seller/orders/history",
    name: "Order History",
    icon: createElement(ShoppingBagOutlinedIcon),
    activeIcon: createElement(ShoppingBagIcon),
  },
  {
    path: "/seller/products",
    name: "Products",
    icon: createElement(AllInboxOutlinedIcon),
    activeIcon: createElement(AllInboxIcon),
  },
];

export const USER_ROUTES: LinkRoute[] = [
  {
    path: "/user/orders",
    name: "Orders",
    icon: createElement(AllInboxOutlinedIcon),
    activeIcon: createElement(AllInboxIcon),
  },
  {
    path: "/user/profile",
    name: "Profile",
    icon: createElement(AllInboxOutlinedIcon),
    activeIcon: createElement(AllInboxIcon),
  },
];
