import { useState } from "react";
//import { bookings } from "../data/mockBookings";
import BookingHistoryTabs from "../../components/public/BookingHistoryTab";
import BookingList from "../../components/public/BookingList";
import BookingDetailModal from "../../components/public/BookingDetailModal";

export default function BookingHistoryPage() {
  const [selectedType, setSelectedType] = useState("cruise");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = bookings.filter((b) => b.type === selectedType);

  return (
    <div className="p-6">
      <BookingHistoryTabs onTypeChange={setSelectedType} />
      <BookingList bookings={filteredBookings} onItemClick={setSelectedBooking} />
      <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </div>
  );
}
