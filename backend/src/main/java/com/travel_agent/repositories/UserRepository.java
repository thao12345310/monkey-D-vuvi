package com.travel_agent.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.travel_agent.models.entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    Optional<UserEntity> findByUsername(String username);
    Optional<UserEntity> findByUsernameAndPassword(String username, String password);
}
