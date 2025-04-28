package com.travel_agent.repositories;

import com.travel_agent.models.entity.FeatureEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeatureRepository extends JpaRepository<FeatureEntity, Integer> {

}
