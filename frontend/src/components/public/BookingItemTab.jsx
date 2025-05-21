export default function BookingItemCard({ booking, onClick, specificInfo }) {
    return (
      <div
        className="flex border p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => onClick(booking)}
      >
        <img src={specificInfo.thumbnail} alt="Ảnh" className="w-24 h-24 object-cover rounded mr-4" />
        <div>
          <h3 className="font-semibold">{specificInfo.shipName}</h3>
          <p>{specificInfo.address}</p>
          <p>Ngày: {booking.startDate}</p>
          <p>Số người: {booking.adults + booking.children}</p>
        </div>
      </div>
    );
  }
  