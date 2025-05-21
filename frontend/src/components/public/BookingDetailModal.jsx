export default function BookingDetailModal({ booking, onClose, type }) {
    if (!booking) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded w-full max-w-3xl relative">
          <button className="absolute top-2 right-2 text-xl" onClick={onClose}>×</button>
          <h2 className="text-xl font-bold mb-4">Chi tiết đặt phòng:</h2>
  
          <div className="space-y-4">
            {booking.rooms.map((roomData, i) => (
              <div key={i} className="flex border p-3 rounded shadow-sm">
                <img
                  src={roomData.room.images[0]}
                  alt={roomData.room.roomName}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-semibold">{roomData.room.roomName}</h3>
                  <p>Số lượng: {roomData.quantity}</p>
                  <p>Giá: {roomData.room.roomPrice} đ</p>
                </div>
              </div>
            ))}
          </div>
  
          <hr className="my-4" />
  
          <div className="space-y-2 text-sm">
            <p><strong>Ngày khởi hành:</strong> {booking.startDate}</p>
            <p><strong>Họ tên:</strong> {booking.customerName}</p>
            <p><strong>SĐT:</strong> {booking.phone}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Số lượng khách:</strong> {booking.adults + booking.children}</p>
            <p><strong>Lưu ý:</strong> {booking.specialRequest || "Không có"}</p>
          </div>
        </div>
      </div>
    );
  }
  