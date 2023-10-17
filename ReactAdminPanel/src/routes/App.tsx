import { Routes, Route } from "react-router-dom";
import SideDrawer from "../components/drawer/SideDrawer";
import { ThemeProvider, createTheme } from "@mui/material";
import SignIn from "../pages/SignIn/Signin";
import SignUp from "../pages/SignUp/SignUp";
import UserManagmentPage from "../pages/AdminArea/UserManagment/UserManagmentPage";
import NotFound from "../pages/NotFound/NotFound";
import { ROUTE_CONSTANT } from "./Constatnt";
import TrainManagment from "../pages/AdminArea/TrainManagment/TrainManagment";
import Booking from "../pages/AdminArea/BookingManagement/Booking";
import AddBooking from "../pages/TravelerArea/AddBooking/AddBooking";
import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#3ccb5c",
      },
      secondary: {
        main: "#3ccb5c",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<SideDrawer />}>
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute allowedRoles={["admin", "user-agent"]} />}>
              <Route path={ROUTE_CONSTANT.TRAIN_MANAGEMENT_DASHBOARD} element={<TrainManagment />} />
              <Route path={ROUTE_CONSTANT.USER_MANAGEMENT_DASHBOARD} element={<UserManagmentPage />} />
              <Route path={ROUTE_CONSTANT.BOOKING_DASHBOARD} element={<Booking />} />
              <Route path={ROUTE_CONSTANT.ADD_BOOKING_DASHBOARD} element={<AddBooking />} />
            </Route>
          </Route>
        </Route>
        <Route path={ROUTE_CONSTANT.LOGIN} element={<SignIn />} />
        <Route path={ROUTE_CONSTANT.REGISTER} element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
