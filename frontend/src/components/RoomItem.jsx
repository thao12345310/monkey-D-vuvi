// components/RoomItem.jsx
import React from 'react';
import { FaUserFriends, FaBed } from 'react-icons/fa';

const RoomItem = ({ room, quantity, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
      {/* Image + Info */}
      <div className="flex items-center space-x-4">
        <img src={room.image} alt={room.name} className="w-20 h-20 rounded-lg object-cover" />
        <div>
          <h3 className="font-semibold">{room.name}</h3>
          <div className="flex items-center text-gray-500 text-sm space-x-3 mt-1">
            <div className="flex items-center space-x-1">
              <FaBed />
              <span>{room.size} m²</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaUserFriends />
              <span>Tối đa: {room.maxGuests}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Price + Counter */}
      <div className="flex items-center space-x-6">
        <div className="text-right">
          <div className="text-primary font-bold text-lg">
            {room.price.toLocaleString('vi-VN')} đ
          </div>
          <div className="text-gray-500 text-xs">/khách</div>
        </div>

        <div className="flex items-center border rounded-full px-2 py-1 space-x-2">
          <button
            onClick={() => onQuantityChange(room.id, -1)}
            className="text-xl font-bold px-2"
          >
            -
          </button>
          <span>{quantity || 0}</span>
          <button
            onClick={() => onQuantityChange(room.id, 1)}
            className="text-xl font-bold px-2"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
