package com.travel_agent.services;

import com.travel_agent.dto.booking.BookingHotelRequestDTO;
import com.travel_agent.dto.booking.BookingShipRequestDTO;
import com.travel_agent.dto.booking.BookingHotelResponseDTO;
import com.travel_agent.dto.booking.BookingRequestDTO.RoomBooking;
import com.travel_agent.dto.booking.BookingShipResponseDTO;
import com.travel_agent.dto.ship.ShipRoomDTO;
import com.travel_agent.models.entity.booking.BookingHotelEntity;
import com.travel_agent.models.entity.booking.BookingHotelRoomEntity;
import com.travel_agent.models.entity.booking.BookingShipEntity;
import com.travel_agent.models.entity.booking.BookingShipRoomEntity;
import com.travel_agent.models.entity.hotel.HotelEntity;
import com.travel_agent.models.entity.ship.ShipEntity;
import com.travel_agent.repositories.booking.BookingHotelRepository;
import com.travel_agent.repositories.booking.BookingShipRepository;
import com.travel_agent.repositories.booking.BookingHotelRoomRepository;
import com.travel_agent.repositories.booking.BookingShipRoomRepository;
import com.travel_agent.repositories.hotel.HotelRepository;
import com.travel_agent.repositories.ship.ShipRepository;
import com.travel_agent.repositories.ship.ShipRoomRepository;
import com.travel_agent.models.entity.ship.ShipRoomEntity;  
import com.travel_agent.models.entity.hotel.HotelRoomEntity;
import com.travel_agent.repositories.hotel.HotelRoomRepository;
import com.travel_agent.dto.hotel.HotelRoomDTO;
import com.travel_agent.mappers.BookingMapper;
import com.travel_agent.mappers.ShipMapper;
import com.travel_agent.mappers.HotelMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final BookingMapper bookingMapper;
    private final ShipMapper shipMapper;
    private final BookingHotelRepository bookingHotelRepository;
    private final BookingShipRepository bookingShipRepository;
    private final HotelRepository hotelRepository;
    private final ShipRepository shipRepository;
    private final BookingHotelRoomRepository bookingHotelRoomRepository;
    private final BookingShipRoomRepository bookingShipRoomRepository;
    private final ShipRoomRepository shipRoomRepository;
    private final HotelRoomRepository hotelRoomRepository;
    private final HotelMapper hotelMapper;
    private final ShipService shipService;
    private final HotelService hotelService;

    public BookingHotelResponseDTO createHotelBooking(BookingHotelRequestDTO request, Integer userId) {
        BookingHotelEntity booking = new BookingHotelEntity();
        HotelEntity hotel = hotelRepository.findById(request.getHotelId())
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found"));

        booking.setHotel(hotel);
        booking.setUserId(userId);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setAdults(request.getAdults());
        booking.setChildren(request.getChildren());
        booking.setSpecialRequest(request.getSpecialRequest());
        booking.setState("PENDING");

        booking = bookingHotelRepository.save(booking);

        BookingHotelRoomEntity bookingRoom = new BookingHotelRoomEntity();
        for (RoomBooking roomBooking : request.getRoomList()) {
            bookingRoom.setBookingId(booking.getBookingId());
            bookingRoom.setRoomId(roomBooking.getRoomId());
            bookingRoom.setQuantity(roomBooking.getQuantity());
            bookingRoom.setHotelId(request.getHotelId());
            bookingHotelRoomRepository.save(bookingRoom);
        }
        return bookingMapper.convertToHotelResponseDTO(booking);
    }

    public BookingShipResponseDTO createShipBooking(BookingShipRequestDTO request, Integer userId) {
        BookingShipEntity booking = new BookingShipEntity();
        ShipEntity ship = shipRepository.findById(request.getShipId())
                .orElseThrow(() -> new IllegalArgumentException("Ship not found"));
        booking.setShip(ship);
        booking.setUserId(userId);
        booking.setStartDate(request.getStartDate());
        booking.setEndDate(request.getEndDate());
        booking.setAdults(request.getAdults());
        booking.setChildren(request.getChildren());
        booking.setSpecialRequest(request.getSpecialRequest());
        booking.setState("PENDING");

        booking = bookingShipRepository.save(booking);

        BookingShipRoomEntity bookingRoom = new BookingShipRoomEntity();
        for (RoomBooking roomBooking : request.getRoomList()) {
            bookingRoom.setBookingId(booking.getBookingId());
            bookingRoom.setRoomId(roomBooking.getRoomId());
            bookingRoom.setQuantity(roomBooking.getQuantity());
            bookingRoom.setShipId(request.getShipId());
            bookingShipRoomRepository.save(bookingRoom);
        }
        
        return bookingMapper.convertToShipResponseDTO(booking);
    }

    public List<BookingShipResponseDTO> getUserShipBookings(Integer userId) {
        List<BookingShipEntity> shipBookings = bookingShipRepository.findByUserId(userId);
        List<BookingShipResponseDTO> bookingShipResponseDTOs = new ArrayList<>();

        for (BookingShipEntity booking : shipBookings) {
            List<BookingShipRoomEntity> bookingRooms = bookingShipRoomRepository.findByBookingId(booking.getBookingId());
            List<ShipRoomDTO> shipRooms = bookingRooms.stream()
            .map(room -> shipService.getShipRoomDetails(room.getRoomId()))
            .toList();
        
            BookingShipResponseDTO bookingShipResponseDTO = bookingMapper.convertToShipResponseDTO(booking);
            bookingShipResponseDTO.setRooms(shipRooms);
            bookingShipResponseDTOs.add(bookingShipResponseDTO);
        }
        return bookingShipResponseDTOs;
    }

    public List<BookingHotelResponseDTO> getUserHotelBookings(Integer userId) {
        List<BookingHotelEntity> hotelBookings = bookingHotelRepository.findByUserId(userId);
        List<BookingHotelResponseDTO> bookingHotelResponseDTOs = new ArrayList<>();

        for (BookingHotelEntity booking : hotelBookings) {
            List<BookingHotelRoomEntity> bookingRooms = bookingHotelRoomRepository.findByBookingId(booking.getBookingId());
            List<HotelRoomDTO> hotelRooms = bookingRooms.stream()
            .map(room -> hotelService.getHotelRoomDetails(room.getRoomId()))
            .toList();

            BookingHotelResponseDTO bookingHotelResponseDTO = bookingMapper.convertToHotelResponseDTO(booking);
            bookingHotelResponseDTO.setRooms(hotelRooms);
            bookingHotelResponseDTOs.add(bookingHotelResponseDTO);
        }

        return bookingHotelResponseDTOs;
    }
}