import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { createElement } from "react";
import { ROUTE_CONSTANT } from "../../../routes/Constatnt";

type LinkRoute = {
  path: string;
  name: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
};

export const ADMIN_ROUTES: LinkRoute[] = [
  {
    path: ROUTE_CONSTANT.TRAIN_MANAGEMENT_DASHBOARD,
    name: "Train Management",
    icon: createElement(WorkHistoryOutlinedIcon),
    activeIcon: createElement(WorkHistoryIcon),
  },
  {
    path: ROUTE_CONSTANT.USER_MANAGEMENT_DASHBOARD,
    name: "User Management",
    icon: createElement(ShoppingBagOutlinedIcon),
    activeIcon: createElement(ShoppingBagIcon),
  },
  {
    path: ROUTE_CONSTANT.BOOKING_DASHBOARD,
    name: "Booking Management",
    icon: createElement(CategoryOutlinedIcon),
    activeIcon: createElement(CategoryIcon),
  },
];

export const TRAVELER_ROUTES: LinkRoute[] = [
  {
    path: ROUTE_CONSTANT.BOOKING_DASHBOARD,
    name: "Booking Management",
    icon: createElement(WorkHistoryOutlinedIcon),
    activeIcon: createElement(WorkHistoryIcon),
  },
];

// export const USER_ROUTES: LinkRoute[] = [
//   {
//     path: "/user/orders",
//     name: "Orders",
//     icon: createElement(AllInboxOutlinedIcon),
//     activeIcon: createElement(AllInboxIcon),
//   },
//   {
//     path: "/user/profile",
//     name: "Profile",
//     icon: createElement(AllInboxOutlinedIcon),
//     activeIcon: createElement(AllInboxIcon),
//   },
// ];
