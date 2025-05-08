import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { FaStar, FaSwimmingPool, FaCocktail, FaUtensils, FaConciergeBell, FaBath } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Fake data
import RoomItem from "../components/RoomItem";
import roomsData from "../pages/roomsData";
import AboutSection from "../components/AboutSection";
import axios from "axios";

// ================= GALLERY SLIDER =================
const GallerySlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    console.log(images);

    return (
        <div className="w-full">
            {/* Main Gallery */}
            <Swiper
                spaceBetween={10}
                navigation
                thumbs={{ swiper: thumbsSwiper }}
                modules={[Navigation, Thumbs]}
                className="mb-6 rounded-xl overflow-hidden"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img src={img} alt={`Slide ${index}`} className="w-full h-[500px] object-cover" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Thumbnails */}
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[Thumbs]}
                className="mt-4"
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={img}
                            alt={`Thumb ${index}`}
                            className="w-full h-20 object-cover rounded-md border-2 border-transparent hover:border-blue-400 cursor-pointer"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

// ================= TAB NAVIGATION =================
const tabs = [
    { id: 1, label: "Đặc điểm" },
    { id: 2, label: "Phòng & giá" },
    { id: 3, label: "Giới thiệu" },
];

const TabNav = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex space-x-6 border-b pb-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`pb-2 border-b-2 ${
                        activeTab === tab.id ? "border-primary text-primary font-semibold" : "border-transparent text-gray-500"
                    } transition-all`}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

// ================= HIGHLIGHTS TAB =================
const features = [
    { icon: <FaSwimmingPool size={24} />, text: "Có bể sục" },
    { icon: <FaCocktail size={24} />, text: "Quầy bar" },
    { icon: <FaUtensils size={24} />, text: "Nhà hàng" },
    { icon: <FaConciergeBell size={24} />, text: "Lễ tân 24 giờ" },
    { icon: <FaBath size={24} />, text: "Phòng có bồn tắm" },
];

const descriptionList = [
    "Du thuyền thiết kế sang trọng và truyền thống",
    "Phòng ngủ tiện nghi sang trọng với bồn tắm view vịnh",
    "Bể bơi 4 mùa rộng lớn checkin cực đẹp",
    "Nhiều lịch trình 2N1Đ, 3N2Đ, 4N3Đ trên vịnh Lan Hạ",
];

const cruiseInfo = [
    { label: "Hạ thủy", value: "2019" },
    { label: "Cabin", value: "20" },
    { label: "Thân vỏ", value: "Kim loại" },
    { label: "Hành trình", value: "Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối" },
    { label: "Điều hành", value: "Công ty cổ phần Heritage Cruises" },
];

const Highlights = () => {
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {/* Left */}
            <div className="md:col-span-2 space-y-6">
                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {features.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="text-primary">{item.icon}</div>
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div className="space-y-3">
                    {descriptionList.map((desc, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                            <span className="text-primary">✔️</span>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right */}
            <div className="border p-4 rounded-xl shadow-md bg-gray-50">
                <h3 className="text-lg font-semibold mb-4">Thông tin du thuyền</h3>
                <div className="space-y-3">
                    {cruiseInfo.map((info, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-600">{info.label}</span>
                            <span className="font-semibold">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ================= ROOMS TAB =================
const Rooms = () => {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta),
        }));
    };

    const totalPrice = roomsData.reduce((sum, room) => {
        const qty = quantities[room.id] || 0;
        return sum + qty * room.price;
    }, 0);

    const resetSelections = () => {
        setQuantities({});
    };

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Các loại phòng & giá</h2>
                <button onClick={resetSelections} className="text-sm text-gray-500 hover:text-primary flex items-center">
                    ❌ Xoá lựa chọn
                </button>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                {roomsData.map((room) => (
                    <RoomItem key={room.id} room={room} quantity={quantities[room.id]} onQuantityChange={handleQuantityChange} />
                ))}

                {/* Tổng tiền */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-lg">
                        Tổng tiền: <span className="font-bold text-primary">{totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>

                    <div className="space-x-4">
                        <button className="border px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-all">Thuê trọn tàu</button>
                        <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all">Đặt ngay →</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ================= INTRODUCTION TAB =================
const aboutSections = [
    {
        title: "Du thuyền tuyệt đẹp về đêm",
        image: "https://link.to.your.image1.jpg",
        description:
            "Du thuyền Heritage Cruises Binh Chuan có kiến trúc độc đáo, thiết kế mang đậm nét truyền thống và lịch sử. Với 20 phòng nghỉ riêng biệt...",
    },
    {
        title: "Bể bơi bốn mùa của du thuyền",
        image: "https://link.to.your.image2.jpg",
        description: "Đặc biệt, du thuyền có bể bơi bốn mùa mang lại cảm giác hài lòng cho những du khách đi vào mùa lạnh. Đây chính là điểm nhấn...",
    },
    {
        title: "Nhà hàng Tonkin",
        image: "https://link.to.your.image3.jpg",
        description: "Nhà hàng Tonkin của du thuyền thiết kế theo lối kiến trúc Đông Dương và đậm tính nghệ thuật sẽ phục vụ du khách cao cấp...",
    },
];

const Introduction = () => {
    return (
        <div className="py-10 space-y-8">
            <h2 className="text-3xl font-bold mb-6">Giới thiệu</h2>
            <div className="space-y-8">
                {aboutSections.map((section, index) => (
                    <AboutSection key={index} image={section.image} title={section.title} description={section.description} />
                ))}
            </div>
        </div>
    );
};

// ================= MAIN PAGE =================
const DuThuyen = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(1);
    const [shipData, setShipData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShipData = async () => {
            try {
                setLoading(true);
                console.log("Đang tải dữ liệu cho ship ID:", id);
                const response = await axios.get(`http://localhost:8080/api/ship/${id}`);
                console.log("Dữ liệu nhận được:", response.data.data);
                setShipData(response.data.data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchShipData();
    }, [id]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-500">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    if (!shipData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p>Không tìm thấy thông tin du thuyền</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* ===== Title + Rating Section ===== */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">{shipData["shipName"]}</h1>
                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                    <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} />
                        ))}
                    </div>
                    <span>5.0</span>
                    <span>• 200 đánh giá</span>
                    <span>• {shipData.address}</span>
                </div>
            </div>

            {/* ===== GallerySlider Section ===== */}
            <div className="mb-10">
                <GallerySlider images={[shipData.thumbnail]} />
            </div>

            {/* ===== Tab Navigation and Content ===== */}
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-6">
                {activeTab === 1 && <Highlights />}
                {activeTab === 2 && <Rooms />}
                {activeTab === 3 && <Introduction />}
            </div>
        </div>
    );
};

export default DuThuyen;
