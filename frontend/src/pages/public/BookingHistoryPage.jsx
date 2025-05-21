import { useState } from "react";
//import { bookings } from "../data/mockBookings";
import BookingHistoryTabs from "../../components/public/BookingHistoryTab";
import BookingList from "../../components/public/BookingList";
import BookingDetailModal from "../../components/public/BookingDetailModal";
import config from "../../config";
import { useAuth } from "../../contexts/AuthProvider";
import { useEffect } from "react";
import axios from "axios";

export default function BookingHistoryPage() {
    const [selectedType, setSelectedType] = useState("ship");
    const [bookingList, setBookingList] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { token } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setIsLoading(true);
      if (!token) return; // Đợi token có

      const fetchBookings = async () => {
          try {
              console.log(selectedType);
              const response = await axios.get(`${config.api.baseUrl}/api/booking/my-bookings/${selectedType}`, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              });

              console.log(response.data.data);
              setBookingList(response.data.data);
          } catch (error) {
              console.error("Error fetching bookings:", error);
          } finally {
              setIsLoading(false);
          }
      };

      fetchBookings();
  }, [token, selectedType]);

    return (
        <div className="p-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            ) : (
                <>
                    <BookingHistoryTabs onTypeChange={setSelectedType} isLoading={isLoading} />
                    <BookingList bookings={bookingList} onItemClick={setSelectedBooking} type={selectedType}/>
                    <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} type={selectedType}/>
                </>
            )}
        </div>
    );
}
