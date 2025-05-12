import React, { useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import TimDuThuyen from "./pages/TimDuThuyen";
import TimVeMayBay from "./pages/TimVeMayBay";
import TimKhachSan from "./pages/TimKhachSan";
import ChiTietKhachSan from "./pages/ChiTietKhachSan";
import DoanhNghiep from "./pages/DoanhNghiep";
import DuThuyen from "./pages/DuThuyen";
import LoginPage from "./pages/LoginPage";
import ChatBotWidget from "./components/ChatBotWidget";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-gray-50 flex flex-col">
        <NavBar />

        <div className={`flex-1 flex transition-all duration-300 ease-in-out`}>
          {/* Main content */}
          <div
            className={`w-full ${
              isChatOpen ? "lg:w-2/3" : "w-full"
            } transition-all duration-300 ease-in-out`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tim-du-thuyen" element={<TimDuThuyen />} />
              <Route path="/tim-ve-may-bay" element={<TimVeMayBay />} />
              <Route path="/tim-khach-san" element={<TimKhachSan />} />
              <Route path="/khach-san/:id" element={<ChiTietKhachSan />} />
              <Route path="/doanh-nghiep" element={<DoanhNghiep />} />
              <Route path="/blog" element={<div>Blog</div>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/du-thuyen/:id" element={<DuThuyen />} />
            </Routes>
          </div>

          {/* ChatBot sidebar */}
          <ChatBotWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
        </div>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
