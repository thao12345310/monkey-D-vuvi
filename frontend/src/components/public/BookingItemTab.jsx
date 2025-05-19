export default function BookingItemCard({ booking, onClick }) {
    return (
      <div
        className="flex border p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => onClick(booking)}
      >
        <img src={booking.image} alt="Ảnh" className="w-24 h-24 object-cover rounded mr-4" />
        <div>
          <h3 className="font-semibold">{booking.name}</h3>
          <p>{booking.address}</p>
          <p>Ngày: {booking.date}</p>
          <p>Số người: {booking.people}</p>
        </div>
      </div>
    );
  }
  