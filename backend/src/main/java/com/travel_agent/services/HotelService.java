package com.travel_agent.services;

import com.travel_agent.dto.*;
import com.travel_agent.models.entity.hotel.*;
import com.travel_agent.repositories.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.travel_agent.mapper.HotelMapper;
import com.travel_agent.models.entity.CompanyEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelService {
    private final HotelRepository hotelRepository;
    private final HotelMapper hotelMapper;
    private final CompanyRepository companyRepository;
    private final FeatureRepository featureRepository;
    private final HotelFeatureRepository hotelFeatureRepository;
    private final HotelShortDescriptionRepository hotelShortDescriptionRepository;
    private final HotelLongDescriptionRepository hotelLongDescriptionRepository;
    private final HotelRoomRepository hotelRoomRepository;
    private final HotelRoomFeatureRepository hotelRoomFeatureRepository;
    private final HotelImageRepository hotelImageRepository;

    public ResultPaginationDTO getAllHotels(Pageable pageable) {
        Page<HotelEntity> pageHotel= hotelRepository.findAll(pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        Meta mt = new Meta();

        mt.setPage(pageHotel.getNumber());
        mt.setPageSize(pageHotel.getSize());
        mt.setPages(pageHotel.getTotalPages());
        mt.setTotal(pageHotel.getTotalElements());
        
        rs.setMeta((mt));
        rs.setResult(pageHotel.getContent());
        return rs;
    }

    public HotelDTO getHotelDetails(Integer hotelId) {
        HotelEntity hotelEntity = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

        HotelDTO hotelDto = hotelMapper.hotelToHotelDTO(hotelEntity);

        // Fetch featureIds and feature descriptions associated with the hotel
        List<HotelFeatureEntity> hotelFeatures = hotelFeatureRepository.findByHotelId(hotelId);
        List<Integer> featureIds = hotelFeatures.stream()
                .map(HotelFeatureEntity::getFeatureId)
                .toList();
        List<String> featureDescriptions = featureIds.stream()
                .map(featureId -> featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId))
                        .getFeatureDescription())
                .toList();

        hotelDto.setFeatureIds(featureIds.isEmpty() ? null : featureIds);
        hotelDto.setFeatures(featureDescriptions.isEmpty() ? null : featureDescriptions);

        // Fetch short descriptions
        List<String> shortDescriptions = hotelShortDescriptionRepository.findByHotelId(hotelId)
                .stream()
                .map(HotelShortDescriptionEntity::getDescription)
                .toList();
        hotelDto.setShortDescriptions(shortDescriptions.isEmpty() ? null : shortDescriptions);

        // Fetch long descriptions
        List<HotelLongDescriptionEntity> longDescriptions = hotelLongDescriptionRepository.findByHotelId(hotelId);
        List<HotelLongDescriptionDTO> longDescriptionDtos = longDescriptions.stream()
                .map(desc -> new HotelLongDescriptionDTO(desc.getBlockId(), desc.getType(), desc.getData()))
                .toList();
        hotelDto.setLongDescriptions(longDescriptionDtos.isEmpty() ? null : longDescriptionDtos);

        // Fetch rooms
        List<HotelRoom> hotelRooms = hotelRoomRepository.findByHotel_HotelId(hotelId);
        List<HotelRoomDTO> roomDtos = hotelRooms.stream()
                .map(room -> {
                    List<Integer> roomFeatureIds = hotelRoomFeatureRepository.findByHotelRoomId(room.getHotelRoomId())
                            .stream()
                            .map(HotelRoomFeatures::getRoomFeaturesId)
                            .toList();
                    List<String> roomFeatures = roomFeatureIds.stream()
                            .map(featureId -> featureRepository.findById(featureId)
                                    .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId))
                                    .getFeatureDescription())
                            .toList();
                    return new HotelRoomDTO(
                            room.getHotelRoomId(),
                            room.getRoomName(),
                            room.getRoomPrice(),
                            roomFeatureIds,
                            roomFeatures.isEmpty() ? null : roomFeatures,
                            room.getSize(),
                            room.getMaxPersons(),
                            room.getBedType(),
                            room.getView()
                    );
                })
                .toList();
        hotelDto.setRooms(roomDtos.isEmpty() ? null : roomDtos);

        // Fetch images
        List<String> images = hotelImageRepository.findByHotelId(hotelId)
                .stream()
                .map(HotelImageEntity::getImgUrl)
                .toList();
        hotelDto.setImages(images.isEmpty() ? null : images);

        return hotelDto;
    }

    private void populateHotelEntity(HotelEntity hotelEntity, HotelDTO hotelDto) {
        hotelEntity.setHotelName(hotelDto.getHotelName());
        hotelEntity.setTotalRooms(hotelDto.getTotalRooms());
        hotelEntity.setCompanyName(hotelDto.getCompanyName());
        hotelEntity.setHotelPrice(hotelDto.getHotelPrice());
        hotelEntity.setCity(hotelDto.getCity());
        hotelEntity.setAddress(hotelDto.getAddress());
        hotelEntity.setMapLink(hotelDto.getMapLink());
        hotelEntity.setThumbnail(hotelDto.getThumbnail());

        if (hotelDto.getCompanyId() != null) {
            CompanyEntity company = companyRepository.findById(hotelDto.getCompanyId())
                    .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + hotelDto.getCompanyId()));
            hotelEntity.setCompany(company);
        }

        hotelEntity = hotelRepository.save(hotelEntity);

        if (hotelDto.getFeatureIds() != null) {
            for (Integer featureId : hotelDto.getFeatureIds()) {
                featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId));

                HotelFeatureEntity hotelFeature = new HotelFeatureEntity();
                hotelFeature.setHotelId(hotelEntity.getHotelId());
                hotelFeature.setFeatureId(featureId);
                hotelFeatureRepository.save(hotelFeature);
            }
        }
    }

    // Add hotel
    public HotelDTO addHotel(HotelDTO hotelDto) {
        HotelEntity hotelEntity = new HotelEntity();
        populateHotelEntity(hotelEntity, hotelDto);
        hotelEntity = hotelRepository.save(hotelEntity);

        if (hotelDto.getShortDescriptions() != null) {
            int blockId = 1;
            for (String description : hotelDto.getShortDescriptions()) {
                HotelShortDescriptionEntity shortDescription = new HotelShortDescriptionEntity();
                shortDescription.setHotelId(hotelEntity.getHotelId());
                shortDescription.setBlockId(blockId++);
                shortDescription.setDescription(description);
                hotelShortDescriptionRepository.save(shortDescription);
            }
        }

        // Save images
        if (hotelDto.getImages() != null) {
            for (String imgUrl : hotelDto.getImages()) {
                HotelImageEntity hotelImage = new HotelImageEntity();
                hotelImage.setHotelId(hotelEntity.getHotelId());
                hotelImage.setImgUrl(imgUrl);
                hotelImageRepository.save(hotelImage);
            }
        }

        // Save long descriptions
        if (hotelDto.getLongDescriptions() != null) {
            for (HotelLongDescriptionDTO longDescriptionDto : hotelDto.getLongDescriptions()) {
                HotelLongDescriptionEntity longDescription = new HotelLongDescriptionEntity();
                longDescription.setHotelId(hotelEntity.getHotelId());
                longDescription.setBlockId(longDescriptionDto.getBlockId());
                longDescription.setType(longDescriptionDto.getType());
                longDescription.setData(longDescriptionDto.getData());
                hotelLongDescriptionRepository.save(longDescription);
            }
        }



        // Map the saved hotel entity to DTO
        HotelDTO savedHotelDto = hotelMapper.hotelToHotelDTO(hotelEntity);

        // Fetch and set featureIds and features
        List<HotelFeatureEntity> hotelFeatures = hotelFeatureRepository.findByHotelId(hotelEntity.getHotelId());
        List<Integer> featureIds = hotelFeatures.stream()
                .map(HotelFeatureEntity::getFeatureId)
                .toList();
        List<String> features = featureIds.stream()
                .map(featureId -> featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId))
                        .getFeatureDescription())
                .toList();

        savedHotelDto.setFeatureIds(featureIds.isEmpty() ? null : featureIds);
        savedHotelDto.setFeatures(features.isEmpty() ? null : features);

        savedHotelDto.setShortDescriptions(hotelDto.getShortDescriptions());
        savedHotelDto.setLongDescriptions(hotelDto.getLongDescriptions());
        savedHotelDto.setImages(hotelDto.getImages());

        return savedHotelDto;
    }

    // Update hotel
    public HotelDTO updateHotel(Integer hotelId, HotelDTO hotelDto) {
        HotelEntity hotelEntity = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

        // Update hotel entity fields
        populateHotelEntity(hotelEntity, hotelDto);

        // Clear existing features
        List<HotelFeatureEntity> existingFeatures = hotelFeatureRepository.findByHotelId(hotelId);
        hotelFeatureRepository.deleteAll(existingFeatures);

        // Add new features
        if (hotelDto.getFeatureIds() != null) {
            for (Integer featureId : hotelDto.getFeatureIds()) {
                featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId));

                HotelFeatureEntity hotelFeature = new HotelFeatureEntity();
                hotelFeature.setHotelId(hotelId);
                hotelFeature.setFeatureId(featureId);
                hotelFeatureRepository.save(hotelFeature);
            }
        }
        // Clear existing short descriptions
        List<HotelShortDescriptionEntity> existingDescriptions = hotelShortDescriptionRepository.findByHotelId(hotelId);
        hotelShortDescriptionRepository.deleteAll(existingDescriptions);

        // Add new short descriptions
        if (hotelDto.getShortDescriptions() != null) {
            int blockId = 1;
            for (String description : hotelDto.getShortDescriptions()) {
                HotelShortDescriptionEntity shortDescription = new HotelShortDescriptionEntity();
                shortDescription.setHotelId(hotelId);
                shortDescription.setBlockId(blockId++);
                shortDescription.setDescription(description);
                hotelShortDescriptionRepository.save(shortDescription);
            }
        }

        // Clear existing long descriptions
        List<HotelLongDescriptionEntity> existingLongDescriptions = hotelLongDescriptionRepository.findByHotelId(hotelId);
        hotelLongDescriptionRepository.deleteAll(existingLongDescriptions);

        // Add new long descriptions
        if (hotelDto.getLongDescriptions() != null) {
            for (HotelLongDescriptionDTO longDescriptionDto : hotelDto.getLongDescriptions()) {
                HotelLongDescriptionEntity longDescription = new HotelLongDescriptionEntity();
                longDescription.setHotelId(hotelId);
                longDescription.setBlockId(longDescriptionDto.getBlockId());
                longDescription.setType(longDescriptionDto.getType());
                longDescription.setData(longDescriptionDto.getData());
                hotelLongDescriptionRepository.save(longDescription);
            }
        }

        // Clear existing images
        hotelImageRepository.deleteAll(hotelImageRepository.findByHotelId(hotelId));

        // Add new images
        if (hotelDto.getImages() != null) {
            for (String imgUrl : hotelDto.getImages()) {
                HotelImageEntity hotelImage = new HotelImageEntity();
                hotelImage.setHotelId(hotelId);
                hotelImage.setImgUrl(imgUrl);
                hotelImageRepository.save(hotelImage);
            }
        }

        // Save updated hotel entity
        hotelEntity = hotelRepository.save(hotelEntity);

        // Map updated hotel entity to DTO
        HotelDTO updatedHotelDto = hotelMapper.hotelToHotelDTO(hotelEntity);

        // Fetch and set updated featureIds and features
        List<HotelFeatureEntity> updatedFeatures = hotelFeatureRepository.findByHotelId(hotelId);
        List<Integer> featureIds = updatedFeatures.stream()
                .map(HotelFeatureEntity::getFeatureId)
                .toList();
        List<String> features = featureIds.stream()
                .map(featureId -> featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId))
                        .getFeatureDescription())
                .toList();

        // Fetch and set updated short descriptions
        List<String> shortDescriptions = hotelShortDescriptionRepository.findByHotelId(hotelId)
                .stream()
                .map(HotelShortDescriptionEntity::getDescription)
                .toList();
        updatedHotelDto.setShortDescriptions(shortDescriptions.isEmpty() ? null : shortDescriptions);

        // Fetch and set updated long descriptions
        List<HotelLongDescriptionEntity> longDescriptions = hotelLongDescriptionRepository.findByHotelId(hotelId);
        List<HotelLongDescriptionDTO> longDescriptionDtos = longDescriptions.stream()
                .map(desc -> new HotelLongDescriptionDTO(desc.getBlockId(), desc.getType(), desc.getData()))
                .toList();
        updatedHotelDto.setLongDescriptions(longDescriptionDtos.isEmpty() ? null : longDescriptionDtos);

        updatedHotelDto.setFeatureIds(featureIds.isEmpty() ? null : featureIds);
        updatedHotelDto.setFeatures(features.isEmpty() ? null : features);

        return updatedHotelDto;
    }

    // Delete hotel
    @Transactional
    public void deleteHotels(List<Integer> hotelIds) {
        for (Integer hotelId : hotelIds) {
            HotelEntity hotelEntity = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

            // Delete associated rooms and their features
            List<HotelRoom> hotelRooms = hotelRoomRepository.findByHotel_HotelId(hotelId);
            for (HotelRoom room : hotelRooms) {
                hotelRoomFeatureRepository.deleteByHotelRoomId(room.getHotelRoomId());
            }
            hotelRoomRepository.deleteAll(hotelRooms);

            // Delete associated features
            List<HotelFeatureEntity> hotelFeatures = hotelFeatureRepository.findByHotelId(hotelId);
            hotelFeatureRepository.deleteAll(hotelFeatures);

            // Delete associated short descriptions
            List<HotelShortDescriptionEntity> hotelShortDescriptions = hotelShortDescriptionRepository.findByHotelId(hotelId);
            hotelShortDescriptionRepository.deleteAll(hotelShortDescriptions);

            // Delete associated long descriptions
            List<HotelLongDescriptionEntity> hotelLongDescriptions = hotelLongDescriptionRepository.findByHotelId(hotelId);
            hotelLongDescriptionRepository.deleteAll(hotelLongDescriptions);

            // Delete associated images
            List<HotelImageEntity> hotelImages = hotelImageRepository.findByHotelId(hotelId);
            hotelImageRepository.deleteAll(hotelImages);

            // Finally, delete the hotel
            hotelRepository.delete(hotelEntity);
        }
    }

    // View room
    public HotelRoomDTO getHotelRoom(Integer hotelId, Integer roomId) {
        // Fetch the room by roomId
        HotelRoom hotelRoomEntity = hotelRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + roomId));

        // Validate that the room belongs to the specified hotel
        if (!hotelRoomEntity.getHotel().getHotelId().equals(hotelId)) {
            throw new IllegalArgumentException("Room does not belong to the specified hotel");
        }

        // Fetch room features
        List<Integer> roomFeatureIds = hotelRoomFeatureRepository.findByHotelRoomId(roomId)
                .stream()
                .map(HotelRoomFeatures::getRoomFeaturesId)
                .toList();
        List<String> roomFeatures = roomFeatureIds.stream()
                .map(featureId -> featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId))
                        .getFeatureDescription())
                .toList();

        // Map the entity to DTO
        return new HotelRoomDTO(
                hotelRoomEntity.getHotelRoomId(),
                hotelRoomEntity.getRoomName(),
                hotelRoomEntity.getRoomPrice(),
                roomFeatureIds,
                roomFeatures.isEmpty() ? null : roomFeatures,
                hotelRoomEntity.getSize(),
                hotelRoomEntity.getMaxPersons(),
                hotelRoomEntity.getBedType(),
                hotelRoomEntity.getView()
        );
    }

    public HotelRoomDTO addHotelRoom(Integer hotelId, HotelRoomDTO roomDto) {
        HotelEntity hotelEntity = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

        HotelRoom hotelRoom = new HotelRoom();
        hotelRoom.setHotel(hotelEntity);
        hotelRoom.setRoomName(roomDto.getRoomName());
        hotelRoom.setRoomPrice(roomDto.getRoomPrice());
        hotelRoom.setSize(roomDto.getSize());
        hotelRoom.setMaxPersons(roomDto.getMaxPersons());
        hotelRoom.setBedType(roomDto.getBedType());
        hotelRoom.setView(roomDto.getView());

        hotelRoom = hotelRoomRepository.save(hotelRoom);

        for (Integer featureId : roomDto.getRoomFeatureIds()) {
            featureRepository.findById(featureId)
                    .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId));

            HotelRoomFeatures roomFeature = new HotelRoomFeatures();
            roomFeature.setHotelRoomId(hotelRoom.getHotelRoomId());
            roomFeature.setRoomFeaturesId(featureId);
            hotelRoomFeatureRepository.save(roomFeature);
        }

        List<String> roomFeatures = roomDto.getRoomFeatureIds().stream()
                .map(featureId -> featureRepository.findById(featureId)
                        .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId))
                        .getFeatureDescription())
                .toList();

        return new HotelRoomDTO(
                hotelRoom.getHotelRoomId(),
                hotelRoom.getRoomName(),
                hotelRoom.getRoomPrice(),
                roomDto.getRoomFeatureIds(),
                roomFeatures,
                hotelRoom.getSize(),
                hotelRoom.getMaxPersons(),
                hotelRoom.getBedType(),
                hotelRoom.getView()
        );
    }

    public HotelRoomDTO updateHotelRoom(Integer hotelId, Integer roomId, HotelRoomDTO roomDto) {
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

        HotelRoom hotelRoom = hotelRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + roomId));

        if (!hotelRoom.getHotel().getHotelId().equals(hotelId)) {
            throw new IllegalArgumentException("Room does not belong to the specified hotel");
        }

        // Update room details
        hotelRoom.setRoomName(roomDto.getRoomName());
        hotelRoom.setRoomPrice(roomDto.getRoomPrice());
        hotelRoom.setSize(roomDto.getSize());
        hotelRoom.setMaxPersons(roomDto.getMaxPersons());
        hotelRoom.setBedType(roomDto.getBedType());
        hotelRoom.setView(roomDto.getView());

        hotelRoom = hotelRoomRepository.save(hotelRoom);

        // Update room features
        List<HotelRoomFeatures> existingFeatures = hotelRoomFeatureRepository.findByHotelRoomId(roomId);
        hotelRoomFeatureRepository.deleteAll(existingFeatures);

        for (Integer featureId : roomDto.getRoomFeatureIds()) {
            featureRepository.findById(featureId)
                    .orElseThrow(() -> new IllegalArgumentException("Feature not found with ID: " + featureId));

            HotelRoomFeatures roomFeature = new HotelRoomFeatures();
            roomFeature.setHotelRoomId(hotelRoom.getHotelRoomId());
            roomFeature.setRoomFeaturesId(featureId);
            hotelRoomFeatureRepository.save(roomFeature);
        }

        return new HotelRoomDTO(
                hotelRoom.getHotelRoomId(),
                hotelRoom.getRoomName(),
                hotelRoom.getRoomPrice(),
                roomDto.getRoomFeatureIds(),
                null, // Room features descriptions can be fetched separately if needed
                hotelRoom.getSize(),
                hotelRoom.getMaxPersons(),
                hotelRoom.getBedType(),
                hotelRoom.getView()
        );
    }

    // Delete room
    @Transactional
    public void deleteHotelRooms(Integer hotelId, List<Integer> roomIds) {
        // Check if the hotel exists
        hotelRepository.findById(hotelId)
                .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

        // Fetch the rooms to delete
        List<HotelRoom> roomsToDelete = hotelRoomRepository.findAllById(roomIds);

        // Validate that all rooms belong to the specified hotel
        for (HotelRoom room : roomsToDelete) {
            if (!room.getHotel().getHotelId().equals(hotelId)) {
                throw new IllegalArgumentException("Room with ID " + room.getHotelRoomId() + " does not belong to the specified hotel");
            }
        }

        // Delete related records in hotel_room_features for each room
        for (HotelRoom room : roomsToDelete) {
            hotelRoomFeatureRepository.deleteByHotelRoomId(room.getHotelRoomId());
        }

        // Delete the hotel rooms
        hotelRoomRepository.deleteAll(roomsToDelete);
    }
}
