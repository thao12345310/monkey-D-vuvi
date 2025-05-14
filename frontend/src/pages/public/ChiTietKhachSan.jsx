import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import { FaStar, FaSwimmingPool, FaCocktail, FaUtensils, FaConciergeBell, FaBath } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import RoomItem from "../../components/public/RoomItem";
import axios from "axios";
import ReviewsShip from "../../components/public/ReviewsShip";
import config from "../../config";
// ================= GALLERY SLIDER =================
const GallerySlider = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
    { id: 4, label: "Đánh giá" },
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
const Highlights = ({ hotelData }) => {
    const hotelInfo = [
        { label: "Số phòng", value: hotelData.totalRooms },
        { label: "Điều hành", value: hotelData.companyName },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {/* Left */}
            <div className="md:col-span-2 space-y-6">
                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {hotelData.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <div className="text-primary">
                                {feature === "Nhà hàng" ? (
                                    <FaUtensils size={24} />
                                ) : feature === "Lễ tân 24h" ? (
                                    <FaConciergeBell size={24} />
                                ) : feature === "Phòng gia đình" ? (
                                    <FaBath size={24} />
                                ) : feature === "Hồ bơi" ? (
                                    <FaSwimmingPool size={24} />
                                ) : (
                                    <FaCocktail size={24} />
                                )}
                            </div>
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <div className="space-y-3">
                    {hotelData.shortDescriptions.map((desc, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                            <span className="text-primary">✔️</span>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right */}
            <div className="border p-4 rounded-xl shadow-md bg-gray-50 h-fit">
                <h3 className="text-lg font-semibold mb-4">Thông tin khách sạn</h3>
                <div className="space-y-3">
                    {hotelInfo.map((info, idx) => (
                        <div key={idx} className="flex justify-between text-sm gap-20">
                            <span className="text-gray-600 w-30">{info.label}</span>
                            <span className="font-semibold text-right w-full">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ================= ROOMS TAB =================
const Rooms = ({ hotelData }) => {
    const [quantities, setQuantities] = useState({});

    const handleQuantityChange = (id, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta),
        }));
    };

    const totalPrice = hotelData.rooms.reduce((sum, room) => {
        const qty = quantities[room.roomId] || 0;
        return sum + qty * room.roomPrice;
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
                {hotelData.rooms.map((room) => (
                    <RoomItem key={room.roomId} room={room} quantity={quantities[room.roomId]} onQuantityChange={handleQuantityChange} />
                ))}

                {/* Tổng tiền */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-lg">
                        Tổng tiền: <span className="font-bold text-primary">{totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>

                    <div className="space-x-4">
                        <button className="border-2 border-primary text-gray-500 px-4 py-2 rounded-full hover:bg-gray-300 transition-all duration-300">
                            Thuê trọn khách sạn
                        </button>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition-all duration-300">
                            Đặt ngay →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ================= INTRODUCTION TAB =================
const Introduction = ({ hotelData }) => {
    return (
        <div className="py-10 space-y-8">
            <h2 className="text-3xl font-bold mb-6">Giới thiệu</h2>
            <div className="space-y-8">
                {hotelData.longDescriptions.map((block, index) => {
                    if (block.type === "paragraph") {
                        return (
                            <div key={block.blockId} className="mb-6">
                                <p className="text-gray-700 leading-relaxed">{block.data}</p>
                            </div>
                        );
                    } else if (block.type === "image") {
                        return (
                            <div key={block.blockId} className="mb-6">
                                <img
                                    src={block.data}
                                    alt={`Introduction image ${block.blockId}`}
                                    className="w-full h-[400px] object-cover rounded-xl shadow-md"
                                />
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

// ================= MAIN PAGE =================
const ChiTietKhachSan = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(1);
    const [hotelData, setHotelData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${config.api.url}/api/hotel/${id}`);
                setHotelData(response.data.data);
            } catch (err) {
                console.error("Lỗi khi tải dữ liệu:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHotelData();
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

    if (!hotelData) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <p>Không tìm thấy thông tin khách sạn</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            {/* ===== Title + Rating Section ===== */}
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">{hotelData.hotelName}</h1>
                <div className="flex items-center space-x-4 text-gray-600 text-sm">
                    <div className="flex items-center space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, idx) => (
                            <FaStar key={idx} />
                        ))}
                    </div>
                    <span>5.0</span>
                    <span>• 200 đánh giá</span>
                    <span>• {hotelData.address}</span>
                </div>
            </div>

            {/* ===== GallerySlider Section ===== */}
            <div className="mb-10">
                <GallerySlider images={hotelData.images} />
            </div>

            {/* ===== Tab Navigation and Content ===== */}
            <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-6">
                {activeTab === 1 && <Highlights hotelData={hotelData} />}
                {activeTab === 2 && <Rooms hotelData={hotelData} />}
                {activeTab === 3 && <Introduction hotelData={hotelData} />}
                {activeTab === 4 && <ReviewsShip shipId={id} />}
            </div>
        </div>
    );
};

export default ChiTietKhachSan;
