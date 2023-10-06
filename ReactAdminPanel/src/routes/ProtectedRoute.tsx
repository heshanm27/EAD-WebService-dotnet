import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../redux/redux-hooks";

export default function ProtectedRoute() {
  const { accessToken } = useAppSelector((state) => state.authSlice);

  if (!accessToken) {
    return <Navigate to="/" replace={true} />;
  }
  return <Outlet />;
}
