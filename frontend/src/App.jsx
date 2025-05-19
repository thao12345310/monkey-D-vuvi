import React, { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/public/NavBar";
import ScrollToTop from "./components/public/ScrollToTop";
import Home from "./pages/public/Home";
import TimDuThuyen from "./pages/public/TimDuThuyen";
import TimKhachSan from "./pages/public/TimKhachSan";
import ChiTietKhachSan from "./pages/public/ChiTietKhachSan";
import DoanhNghiep from "./pages/public/DoanhNghiep";
import DuThuyen from "./pages/public/DuThuyen";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import ChatBotWidget from "./components/public/ChatBotWidget";
import Footer from "./components/public/Footer";
import "./App.css";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/DashBoard";
import ManageBooking from "./pages/admin/ManageBooking";
import ManageRoom from "./pages/admin/ManageRoom";
import { AuthProvider } from "./contexts/AuthContext";
import UserBookings from "./components/UserBookings";
import BookingHistoryPage from "./pages/public/BookingHistoryPage";

const AppRoutes = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      <div className="app min-h-screen flex flex-col">
        {!isAdminPath && <NavBar />}

        <div className="flex-1 flex transition-all duration-300 ease-in-out">
          <div
            className={`w-full ${
              !isAdminPath && isChatOpen ? "lg:w-2/3" : "w-full"
            } transition-all duration-300 ease-in-out`}
          >
            <Routes>
              {/* Admin */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                {/* <Route path="/booking" element={<Booking />} /> */}
                {/* <Route path="/manage-room" element={<ManageRoom />} /> */}
              </Route>

              {/* User */}
              <Route path="/" element={<Home />} />
              <Route path="/tim-du-thuyen" element={<TimDuThuyen />} />
              <Route path="/tim-khach-san" element={<TimKhachSan />} />
              <Route path="/khach-san/:id" element={<ChiTietKhachSan />} />
              <Route path="/doanh-nghiep" element={<DoanhNghiep />} />
              <Route path="/blog" element={<div>Blog</div>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/du-thuyen/:id" element={<DuThuyen />} />

              {/* User Profile Routes */}
              <Route path="/profile" element={<div>Thông tin cá nhân</div>} />
              <Route path="/bookings" element={<BookingHistoryPage />} />
            </Routes>
          </div>

          {!isAdminPath && (
            <ChatBotWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
          )}
        </div>

        {!isAdminPath && <Footer />}
      </div>
    </>
  );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );

};

export default App;
