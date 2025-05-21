import BookingItemCard from "./BookingItemTab";

export default function BookingList({ bookings, onItemClick, type }) {
  return (
    <div className="mt-4 space-y-4">
      {bookings.map((booking) => {
        // Lấy thông tin tương ứng theo loại booking
        const specificInfo = type === "ship" ? booking.ship : booking.hotel;

        // Nếu thiếu dữ liệu (có thể do API trả về null), thì bỏ qua
        if (!specificInfo) return null;

        return (
          <BookingItemCard
            key={booking.bookingId}
            booking={booking}
            specificInfo={specificInfo}
            onClick={onItemClick}
          />
        );
      })}
    </div>
  );
}
