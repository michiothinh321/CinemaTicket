import "./App.css";
import Home from "./component/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ticket from "./component/Ticket";
import Order from "./component/Order";
import Payment from "./component/Payment";
import Admin from "./component/Admin";
import User from "./component/admin/User";
import Film from "./component/admin/Film";
import History from "./component/history/History";
import Theater from "./component/admin/Theater";
import Login from "./component/Login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/order" element={<Order />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/film" element={<Film />} />
          <Route path="/history" element={<History />} />
          <Route path="/theater" element={<Theater />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
