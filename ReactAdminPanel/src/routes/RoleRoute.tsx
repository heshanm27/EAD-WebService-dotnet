import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppSelector } from "../redux/redux-hooks";

interface RoleRouteProps {
  allowedRoles: string[];
}

const ROLES = ["user", "user-agent", "admin"];

export default function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { accessToken, role } = useAppSelector((state) => state.authSlice);
  console.log("role", allowedRoles);
  console.log("roles", ROLES.includes(role) && allowedRoles.includes(role));
  const location = useLocation();
  return ROLES.includes(role) && allowedRoles.includes(role) ? (
    <Outlet />
  ) : !accessToken ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
