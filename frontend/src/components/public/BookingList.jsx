import BookingItemCard from "./BookingItemTab";

export default function BookingList({ bookings, onItemClick }) {
  return (
    <div className="mt-4 space-y-4">
      {bookings.map((booking) => (
        <BookingItemCard
          key={booking.id}
          booking={booking}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}
