import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const hotelId = 1; // test data

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`/api/hotels/${hotelId}/rooms`);
      setRooms(response.data.data);
    } catch (error) {
      console.error("Failed to fetch rooms", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Hotel Rooms</h1>

      {loading ? (
        <p className="text-gray-500">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <p className="text-red-500">No rooms found for this hotel.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Room Name</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Size</th>
                <th className="py-2 px-4 text-left">Max Persons</th>
                <th className="py-2 px-4 text-left">Bed Type</th>
                <th className="py-2 px-4 text-left">View</th>
                <th className="py-2 px-4 text-left">Features</th>
                <th className="py-2 px-4 text-left">Images</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.hotelRoomId} className="border-t">
                  <td className="py-2 px-4">{room.roomName}</td>
                  <td className="py-2 px-4">${room.roomPrice}</td>
                  <td className="py-2 px-4">{room.size} m²</td>
                  <td className="py-2 px-4">{room.maxPersons}</td>
                  <td className="py-2 px-4">{room.bedType}</td>
                  <td className="py-2 px-4">{room.view}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc list-inside text-sm">
                      {room.features?.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {room.images?.slice(0, 2).map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="Room"
                          className="w-14 h-14 object-cover rounded"
                        />
                      ))}
                      {room.images?.length > 2 && (
                        <span className="text-sm text-gray-500">
                          +{room.images.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 hover:underline mr-2">
                      Edit
                    </button>
                    <button className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
