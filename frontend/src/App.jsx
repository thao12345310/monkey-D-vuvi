import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import TimDuThuyen from "./pages/TimDuThuyen";
import TimVeMayBay from "./pages/TimVeMayBay";
import TimKhachSan from "./pages/TimKhachSan";
import ChiTietKhachSan from "./pages/ChiTietKhachSan";
import "./App.css";
import DoanhNghiep from "./pages/DoanhNghiep";
import Footer from "./components/Footer";
import DuThuyen from "./pages/DuThuyen";

const App = () => {
    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tim-du-thuyen" element={<TimDuThuyen />} />
                    <Route path="/tim-ve-may-bay" element={<TimVeMayBay />} />
                    <Route path="/tim-khach-san" element={<TimKhachSan />} />
                    <Route path="/khach-san/:id" element={<ChiTietKhachSan />} />
                    <Route path="/doanh-nghiep" element={<DoanhNghiep />} />
                    <Route path="/blog" element={<div>Blog</div>} />
                    <Route path="/lien-he" element={<div>Liên hệ</div>} />
                    <Route path="/du-thuyen/:id" element={<DuThuyen />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
