import React, { useState } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaSwimmingPool,
  FaCocktail,
  FaUtensils,
  FaConciergeBell,
  FaBath,
} from "react-icons/fa";

import RoomItem from "../../components/public/RoomItem";
import roomsData from "./roomsData";
import AboutSection from "../../components/public/AboutSection";

const DuThuyen = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageList = [
    "./frontend/images/hotel1.webp",
    "./frontend/images/hotel2.webp",
    "./frontend/images/hotel3.webp",
    "./frontend/images/hotel4.webp",
    "./frontend/images/hotel5.webp",
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Title + Rating */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Heritage Cruises Binh Chuan</h1>
        <div className="flex items-center space-x-4 text-gray-600 text-sm">
          <div className="flex items-center space-x-1 text-yellow-400">
            {[...Array(5)].map((_, idx) => (
              <FaStar key={idx} />
            ))}
          </div>
          <span>5.0</span>
          <span>• 200 đánh giá</span>
          <span>• Vịnh Lan Hạ, Việt Nam</span>
        </div>
      </div>

      {/* GallerySlider */}
      <div className="mb-10">
        <div className="relative w-full overflow-hidden py-4">
          {/* Ảnh lớn trung tâm */}
          <div className="flex items-center justify-center relative h-[400px]">
            <button
              onClick={prevSlide}
              className="absolute left-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            >
              <FaChevronLeft />
            </button>

            <img
              src={imageList[currentIndex]}
              alt={`image-${currentIndex}`}
              className="h-full object-cover rounded-xl shadow-md"
            />

            <button
              onClick={nextSlide}
              className="absolute right-4 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Ảnh thu nhỏ */}
          <div className="flex justify-center space-x-2 mt-4">
            {imageList.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`w-20 h-16 object-cover rounded-lg border-2 cursor-pointer ${
                  idx === currentIndex
                    ? "border-blue-500"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-6 border-b pb-2">
        {[
          { id: 1, label: "Đặc điểm" },
          { id: 2, label: "Phòng & giá" },
          { id: 3, label: "Giới thiệu" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`pb-2 border-b-2 ${
              activeTab === tab.id
                ? "border-primary text-primary font-semibold"
                : "border-transparent text-gray-500"
            } transition-all`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 1 && <Highlights />}
        {activeTab === 2 && <Rooms />}
        {activeTab === 3 && <Introduction />}
      </div>
    </div>
  );
};

// Các component phụ
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
  {
    label: "Hành trình",
    value: "Vịnh Lan Hạ - Bãi tắm Ba Trái Đào - Hang Sáng Tối",
  },
  { label: "Điều hành", value: "Công ty cổ phần Heritage Cruises" },
];

const Highlights = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
    <div className="md:col-span-2 space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="text-primary">{item.icon}</div>
            <span>{item.text}</span>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {descriptionList.map((desc, idx) => (
          <div key={idx} className="flex items-start space-x-2">
            <span className="text-primary">✔️</span>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="border p-4 rounded-xl shadow-md bg-gray-50">
      <h1 className="text-lg font-semibold mb-4">Thông tin du thuyền</h1>
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

  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Các loại phòng & giá</h2>
        <button
          onClick={() => setQuantities({})}
          className="text-sm text-gray-500 hover:text-primary"
        >
          ❌ Xoá lựa chọn
        </button>
      </div>
      <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
        {roomsData.map((room) => (
          <RoomItem
            key={room.id}
            room={room}
            quantity={quantities[room.id]}
            onQuantityChange={handleQuantityChange}
          />
        ))}
        <div className="flex justify-between items-center mt-6">
          <div className="text-lg">
            Tổng tiền:{" "}
            <span className="font-bold text-primary">
              {totalPrice.toLocaleString("vi-VN")} đ
            </span>
          </div>
          <div className="space-x-4">
            <button className="border px-4 py-2 rounded-full hover:bg-primary hover:text-white">
              Thuê trọn tàu
            </button>
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-600">
              Đặt ngay →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const aboutSections = [
  {
    title: "Du thuyền tuyệt đẹp về đêm",
    image: "/frontend/images/image1.webp",
    description:
      "Du thuyền Heritage Cruises Binh Chuan có kiến trúc độc đáo, thiết kế mang đậm nét truyền thống và lịch sử...",
  },
  {
    title: "Bể bơi bốn mùa của du thuyền",
    image: "/frontend/images/image2.webp",
    description:
      "Đặc biệt, du thuyền có bể bơi bốn mùa mang lại cảm giác hài lòng cho những du khách đi vào mùa lạnh...",
  },
  {
    title: "Nhà hàng Tonkin",
    image: "/frontend/images/image3.webp",
    description:
      "Nhà hàng Tonkin thiết kế theo lối kiến trúc Đông Dương sẽ phục vụ du khách cao cấp...",
  },
];

const Introduction = () => (
  <div className="py-10 space-y-8">
    <h3 className="text-3xl font-bold mb-6">Giới thiệu</h3>
    <div className="space-y-8">
      {aboutSections.map((section, index) => (
        <AboutSection
          key={index}
          title={section.title}
          image={section.image}
          description={section.description}
        />
      ))}
    </div>
  </div>
);

export default DuThuyen;
