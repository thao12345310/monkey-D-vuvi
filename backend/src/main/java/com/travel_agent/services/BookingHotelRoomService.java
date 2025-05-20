package com.travel_agent.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.hotel.BookingHotelRoomDTO;
import com.travel_agent.models.entity.hotel.BookingHotelInfo;
import com.travel_agent.models.entity.hotel.BookingHotelRoom;
import com.travel_agent.models.entity.hotel.HotelRoomEntity;
import com.travel_agent.repositories.hotel.BookingHotelRoomRepository;
import com.travel_agent.repositories.hotel.BookingHotelInfoRepository;
import com.travel_agent.repositories.hotel.HotelRoomRepository;

import lombok.RequiredArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingHotelRoomService {
    private final BookingHotelInfoRepository bookingHotelInfoRepository;
    private final BookingHotelRoomRepository bookingHotelRoomRepository;
    private final HotelRoomRepository hotelRoomRepository;

    @Transactional
    public ResponseObject createBooking(BookingHotelRoomDTO bookingDTO) {
        // 1. Tạo booking info
        BookingHotelInfo bookingInfo = new BookingHotelInfo();
        bookingInfo.setUserId(bookingDTO.getUserId());
        bookingInfo.setHotelId(bookingDTO.getHotelId());
        bookingInfo.setStartDate(bookingDTO.getStartDate());
        bookingInfo.setEndDate(bookingDTO.getEndDate());
        bookingInfo.setAdults(bookingDTO.getAdults());
        bookingInfo.setChildren(bookingDTO.getChildren());
        bookingInfo.setState(bookingDTO.getState());
        
        // 2. Tính tổng tiền và tạo các booking room
        int totalAmount = 0;
        List<BookingHotelRoom> bookingRooms = new ArrayList<>();
        
        for (BookingHotelRoomDTO.RoomBookingDetail roomDetail : bookingDTO.getRoomBookings()) {
            HotelRoomEntity hotelRoom = hotelRoomRepository.findById(roomDetail.getHotelRoomId())
                .orElseThrow(() -> new RuntimeException("Hotel room not found"));
            
            // Tính tiền cho loại phòng này
            int roomTotal = hotelRoom.getRoomPrice() * roomDetail.getQuantity();
            totalAmount += roomTotal;
            
            // Tạo booking room
            BookingHotelRoom bookingRoom = new BookingHotelRoom();
            bookingRoom.setHotelRoomId(hotelRoom.getHotelRoomId());
            bookingRoom.setQuantity(roomDetail.getQuantity());
            bookingRooms.add(bookingRoom);
        }
        
        // 3. Lưu booking info với tổng tiền
        bookingInfo.setTotalAmount(totalAmount);
        bookingInfo = bookingHotelInfoRepository.save(bookingInfo);
        
        // 4. Lưu các booking room
        for (BookingHotelRoom bookingRoom : bookingRooms) {
            bookingRoom.setBookingId(bookingInfo.getBookingId());
            bookingHotelRoomRepository.save(bookingRoom);
        }

        return ResponseObject.builder()
                .message("Hotel rooms booking created successfully")
                .responseCode(200)
                .data(bookingInfo)
                .build();
    }
}
