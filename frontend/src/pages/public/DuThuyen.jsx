import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import {
    FaStar,
    FaSwimmingPool,
    FaCocktail,
    FaUtensils,
    FaConciergeBell,
    FaBath,
    FaWifi,
    FaSnowflake,
    FaTv,
    FaCoffee,
    FaUmbrellaBeach,
    FaParking,
    FaShuttleVan,
    FaWater,
    FaDumbbell,
    FaSpa,
    FaMobileAlt,
    FaWindowMaximize,
    FaHotTub,
    FaShip,
    FaLock,
    FaSmokingBan,
    FaMinus,
    FaDeskpro,
    FaDoorOpen,
    FaShower,
    FaBed,
    FaWineGlassAlt,
    FaWind
} from "react-icons/fa";
import {
    IoWaterOutline,
    IoRestaurantOutline,
    IoFitnessOutline,
    IoWifiOutline,
    IoWaterOutline as IoPoolOutline,
    IoBoatOutline,
    IoShieldCheckmarkOutline,
} from "react-icons/io5";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import RoomItem from "../../components/public/RoomItem";
import axios from "axios";
import ReviewsShip from "../../components/public/ReviewsShip";
import BookModal from "../../components/public/BookModal";
import config from "../../config";

// Feature Icon Mapping
const featureIcons = {
    "Bồn tắm/Cabin tắm đứng": FaShower,
    "Phòng không hút thuốc": FaSmokingBan,
    Minibar: FaWineGlassAlt,
    "Trà/cà phê trong tất cả các phòng": FaCoffee,
    "Bàn làm việc": FaDeskpro,
    "Ban công riêng": FaDoorOpen,
    "Ban công/Cửa sổ": FaWindowMaximize,
    "Miễn phí xe đưa đón": FaShuttleVan,
    "Chỗ đỗ xe": FaParking,
    "Giáp biển": FaUmbrellaBeach,
    "Nước đóng chai miễn phí": FaWater,
    "Lễ tân 24 giờ": FaConciergeBell,
    "Máy sấy tóc": FaWind,
    "Quầy bar": FaCocktail,
    "Bể bơi ngoài trời": FaSwimmingPool,
    Tivi: FaTv,
    "Phòng có bồn tắm": FaBath,
    "Wi-Fi miễn phí": FaWifi,
    "Điều hòa": FaSnowflake,
    "Nhà hàng": FaUtensils,
    "Wi-Fi": FaWifi,
    "Đi tuyến Lan Hạ": FaShip,
    "Lễ tân 24h": FaConciergeBell,
    "Wifi miễn phí": FaWifi,
    "Miễn phí kayaking": IoWaterOutline,
    "Bao gồm tất cả các bữa ăn": FaUtensils,
    "Nhà hàng": FaUtensils,
    "Trung tâm thể dục": FaDumbbell,
    "Trung tâm Spa & chăm sóc sức khoẻ": FaSpa,
    "Sạc điện thoại": FaMobileAlt,
    "Nhìn ra biển": FaUmbrellaBeach,
    "Phòng gia đình": FaBed,
    "Có bể bơi ngoài trời": FaSwimmingPool,
    "Chỗ đỗ xe miễn phí": FaParking,
    "Cửa sổ từ sàn đến trần": FaWindowMaximize,
    "Khu vực bãi tắm riêng": FaUmbrellaBeach,
    "Có bể sục": FaHotTub,
    "Hồ bơi có tầm nhìn": IoPoolOutline,
    "Két an toàn": FaLock,
    "Du thuyền 5 sao": FaShip,
};

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
                            className="w-full h-20 object-cover rounded-md border-2 border-transparent hover:border-pink-400 cursor-pointer"
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
        <div className="sticky top-0 z-10 bg-white border-b border-pink-100 pb-2">
            <div className="flex space-x-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`pb-2 border-b-2 ${
                            activeTab === tab.id
                                ? "border-pink-500 text-pink-600 font-semibold"
                                : "border-transparent text-gray-500 hover:text-pink-500"
                        } transition-all`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

// ================= HIGHLIGHTS TAB =================
const Highlights = ({ shipData }) => {
    const cruiseInfo = [
        { label: "Hạ thủy", value: shipData.launch },
        { label: "Cabin", value: shipData.cabin },
        { label: "Thân vỏ", value: shipData.shell },
        { label: "Hành trình", value: shipData.trip },
        { label: "Điều hành", value: shipData.companyName },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {/* Left */}
            <div className="md:col-span-2 space-y-6">
                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {shipData.features.map((feature, index) => {
                        const Icon = featureIcons[feature] || FaMinus; // Fallback icon if not found
                        return (
                            <div key={index} className="flex items-center space-x-2">
                                <div className="text-gray-700">
                                    <Icon size={24} />
                                </div>
                                <span className="text-gray-700">{feature}</span>
                            </div>
                        );
                    })}
                </div>

                {/* Description */}
                <div className="space-y-3">
                    {shipData.shortDescriptions.map((desc, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                            <span className="text-gray-700">✔️</span>
                            <p className="text-gray-700">{desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right */}
            <div className="border border-gray-100 p-4 rounded-xl shadow-md bg-white h-fit">
                <h3 className="text-lg font-semibold mb-4 text-pink-600">Thông tin du thuyền</h3>
                <div className="space-y-3">
                    {cruiseInfo.map((info, idx) => (
                        <div key={idx} className="flex justify-between gap-20 text-sm">
                            <span className="text-gray-600 w-30">{info.label}</span>
                            <span className="font-semibold text-gray-800 text-right">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ================= ROOMS TAB =================
const Rooms = ({ shipData }) => {
    const [quantities, setQuantities] = useState({});
    const [showBookModal, setShowBookModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const handleQuantityChange = (roomId, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [roomId]: Math.max(0, (prev[roomId] || 0) + delta),
        }));
    };

    const handleBookRoom = () => {
        let bookedRooms = [];
        shipData.rooms.forEach((room) => {
            if (quantities[room.roomId] > 0) {
                bookedRooms.push({
                    roomInfo: room,
                    quantity: quantities[room.roomId],
                });
            }
        });

        if (bookedRooms.length > 0) {
            setSelectedRoom(bookedRooms);
            setShowBookModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowBookModal(false);
        setSelectedRoom(null);
    };

    const resetSelections = () => {
        setQuantities({});
    };

    const totalPrice = shipData.rooms.reduce((sum, room) => {
        const qty = quantities[room.roomId] || 0;
        return sum + qty * room.roomPrice;
    }, 0);

    return (
        <div className="space-y-6 py-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Các loại phòng & giá</h2>
                <button onClick={resetSelections} className="text-sm text-gray-500 hover:text-gray-700 flex items-center">
                    ❌ Xoá lựa chọn
                </button>
            </div>

            <div className="bg-white p-6 rounded-2xl space-y-4 border border-gray-100">
                {shipData.rooms.map((room) => (
                    <RoomItem
                        key={room.roomId}
                        room={room}
                        quantity={quantities[room.roomId] || 0}
                        onQuantityChange={(delta) => handleQuantityChange(room.roomId, delta)}
                    />
                ))}

                {/* Tổng tiền */}
                <div className="flex justify-between items-center mt-6">
                    <div className="text-lg">
                        Tổng tiền: <span className="font-bold text-gray-800">{totalPrice.toLocaleString("vi-VN")} đ</span>
                    </div>

                    <div className="space-x-4">
                        <button className="border-2 border-gray-800 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-50 transition-all duration-300">
                            Thuê trọn tàu
                        </button>

                        <button
                            onClick={handleBookRoom}
                            disabled={totalPrice === 0}
                            className={`px-4 py-2 rounded-full text-white transition-colors ${
                                totalPrice === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
                            }`}
                        >
                            Đặt ngay
                        </button>
                    </div>
                </div>
            </div>

            {showBookModal && selectedRoom && <BookModal roomsData={selectedRoom} onClose={handleCloseModal} type="ship" shipId={shipData.shipId} />}
        </div>
    );
};

// ================= INTRODUCTION TAB =================
const Introduction = ({ shipData }) => {
    return (
        <div className="py-10 space-y-8">
            <h2 className="text-3xl font-bold mb-6">Giới thiệu</h2>
            <div className="space-y-8">
                {shipData.longDescriptions.map((block) => {
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
const DuThuyen = () => {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(1);
    const [shipData, setShipData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showBookModal, setShowBookModal] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const fetchShipData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${config.api.url}/api/ship/${id}`);
                setShipData(response.data.data);
                console.log("Dữ liệu du thuyền:", response.data.data);
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
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
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
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* ===== Title + Rating Section ===== */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2 text-gray-800">{shipData.shipName}</h1>
                    <div className="flex items-center space-x-4 text-gray-600 text-sm">
                        <div className="flex items-center space-x-1 text-pink-500">
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
                <div className="mb-8">
                    <GallerySlider images={shipData.images} />
                </div>

                {/* ===== Tab Navigation and Content ===== */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <TabNav activeTab={activeTab} setActiveTab={setActiveTab} />

                    <div className="mt-6">
                        {activeTab === 1 && <Highlights shipData={shipData} />}
                        {activeTab === 2 && <Rooms shipData={shipData} />}
                        {activeTab === 3 && <Introduction shipData={shipData} />}
                        {activeTab === 4 && <ReviewsShip shipId={id} />}
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showBookModal && selectedRoom && (
                <BookModal
                    roomsData={selectedRoom}
                    onClose={() => {
                        setShowBookModal(false);
                        setSelectedRoom(null);
                    }}
                    type="ship"
                    shipId={shipData.shipId}
                />
            )}
        </div>
    );
};

export default DuThuyen;
