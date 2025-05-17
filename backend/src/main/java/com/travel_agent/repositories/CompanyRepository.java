package com.travel_agent.repositories;

import com.travel_agent.models.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer> {
    Optional<CompanyEntity> findByUsername(String username);
    Optional<CompanyEntity> findByUsernameAndPassword(String username, String password);
}