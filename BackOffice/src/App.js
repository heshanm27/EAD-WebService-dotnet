import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/login";
import Sidebar from "./Components/Dashboard";
import AllCustomers from "./Components/AllCustomers";
import AllBookings from "./Components/AllBookings";
import AllSchedule from "./Components/AllSchedule";
import NewCustomers from "./Components/NewCustomers";
import Newlogin from "./Components/Newlogin";
import AddSchedule from "./Components/AddSchedule";
import AddBooking from "./Components/AddBooking";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/sidebar" exact element={<Sidebar />} />
          <Route path="/customers" exact element={<AllCustomers />} />
          <Route path="/bookings" exact element={<AllBookings />} />
          <Route path="/schedules" exact element={<AllSchedule />} />
          <Route path="/newusers" exact element={<NewCustomers />} />
          <Route path="/newlogin" exact element={<Newlogin />} />
          <Route path="/addschedule" exact element={<AddSchedule />} />
          <Route path="/addbooking" exact element={<AddBooking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
