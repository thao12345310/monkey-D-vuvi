import React, { useState } from "react";

const BookModal = ({ room, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    request: "",
    date: new Date().toISOString().split("T")[0], // mặc định hôm nay
    guests: "1 Người lớn - 0 Trẻ em",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gửi dữ liệu form tới server hoặc xử lý theo yêu cầu
    console.log("Đặt phòng:", {
      room,
      ...formData,
    });

    alert("Đặt phòng thành công!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black"
        >
          ×
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4">Đặt khách sạn</h2>

        {/* Room Info */}
        <div className="flex items-center gap-4 border p-4 rounded-lg">
          <img
            src={room.image}
            alt={room.name}
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-lg">{room.name}</h3>
            <p className="text-sm text-gray-600">
              {room.area} m² · Tối đa {room.capacity} khách
            </p>
            <p className="text-pink-600 font-bold mt-1">
              {room.price.toLocaleString()} đ / KHÁCH
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm font-medium">Ngày nhận phòng</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Số lượng</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option>1 Người lớn - 0 Trẻ em</option>
              <option>2 Người lớn - 0 Trẻ em</option>
              <option>2 Người lớn - 1 Trẻ em</option>
              <option>2 Người lớn - 2 Trẻ em</option>
            </select>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Địa chỉ email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />

          <textarea
            name="request"
            placeholder="Yêu cầu của bạn"
            value={formData.request}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            rows={3}
          />

          <div className="flex justify-between items-center pt-4">
            <p className="text-lg font-bold text-pink-600">
              Tổng tiền: {(room.price).toLocaleString()} đ
            </p>
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-600"
            >
              Đặt ngay →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookModal;
