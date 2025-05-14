import { Dialog } from '@headlessui/react';
import { useState } from 'react';

const RoomDetailModal = ({ room, isOpen, onClose, onQuantityChange, quantity }) => {
    if (!room) return null;

    return (
        <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-40 p-4">
                <Dialog.Panel className="bg-white rounded-3xl p-6 max-w-4xl w-full flex flex-col md:flex-row gap-6 shadow-xl">
                    {/* Left: Image & thumbnails */}
                    <div className="flex-1">
                        <img src={room.images?.[0]} alt={room.roomName} className="rounded-xl w-full h-60 object-cover" />
                        <div className="flex gap-2 mt-3">
                            {room.images?.map((img, i) => (
                                <img key={i} src={img} alt={`thumb-${i}`} className="w-14 h-14 rounded-lg object-cover border" />
                            ))}
                        </div>
                    </div>

                    {/* Right: Room Info */}
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold">{room.roomName}</h3>
                            <button onClick={onClose} className="text-gray-500 hover:text-red-500">✕</button>
                        </div>
                        <div className="text-gray-600 space-y-1 text-sm">
                            <p>📐 {room.roomSize} m²</p>
                            <p>🛏 {room.bedInfo}</p>
                            <p>👥 Tối đa: {room.maxGuests} khách</p>
                            <p>🌅 {room.view}</p>
                        </div>
                        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                            {room.facilities?.map((f, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    ✅ {f}
                                </li>
                            ))}
                        </ul>

                        {/* Quantity picker + chọn */}
                        <div className="flex justify-between items-center pt-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onQuantityChange(room.roomId, -1)}
                                    className="w-8 h-8 rounded-full border text-xl font-bold"
                                >−</button>
                                <span>{quantity || 0}</span>
                                <button
                                    onClick={() => onQuantityChange(room.roomId, 1)}
                                    className="w-8 h-8 rounded-full border text-xl font-bold"
                                >+</button>
                            </div>
                            <button className="bg-primary px-4 py-2 rounded-full text-white">Chọn phòng</button>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default RoomDetailModal;
