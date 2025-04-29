package com.travel_agent.repositories;
import org.springframework.data.jpa.repository.JpaRepository;
import com.travel_agent.models.entity.UserEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}
