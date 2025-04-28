package com.travel_agent.services;

import com.travel_agent.dto.HotelLongDescriptionDTO;
import com.travel_agent.models.entity.hotel.HotelFeatureEntity;
import com.travel_agent.models.entity.hotel.HotelLongDescriptionEntity;
import com.travel_agent.repositories.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.travel_agent.dto.HotelDTO;
import com.travel_agent.dto.Meta;
import com.travel_agent.dto.ResultPaginationDTO;
import com.travel_agent.mapper.HotelMapper;
import com.travel_agent.models.entity.hotel.HotelEntity;
import com.travel_agent.models.entity.hotel.HotelShortDescriptionEntity;
import com.travel_agent.models.entity.Company;
import lombok.RequiredArgsConstructor;

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
            Company company = companyRepository.findById(hotelDto.getCompanyId())
                    .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + hotelDto.getCompanyId()));
            hotelEntity.setCompanyId(company);
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
    public void deleteHotels(List<Integer> hotelIds) {
        for (Integer hotelId : hotelIds) {
            HotelEntity hotelEntity = hotelRepository.findById(hotelId)
                    .orElseThrow(() -> new IllegalArgumentException("Hotel not found with ID: " + hotelId));

            // Delete associated features
            List<HotelFeatureEntity> hotelFeatures = hotelFeatureRepository.findByHotelId(hotelId);
            hotelFeatureRepository.deleteAll(hotelFeatures);

            // Delete associated short descriptions
            List<HotelShortDescriptionEntity> hotelShortDescriptions = hotelShortDescriptionRepository.findByHotelId(hotelId);
            hotelShortDescriptionRepository.deleteAll(hotelShortDescriptions);

            // Delete associated long descriptions
            List<HotelLongDescriptionEntity> hotelLongDescriptions = hotelLongDescriptionRepository.findByHotelId(hotelId);
            hotelLongDescriptionRepository.deleteAll(hotelLongDescriptions);

            hotelRepository.delete(hotelEntity);
        }
    }
}
