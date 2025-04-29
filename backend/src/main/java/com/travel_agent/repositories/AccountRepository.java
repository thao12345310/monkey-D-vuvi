package com.travel_agent.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travel_agent.models.entity.AccountEntity;

public interface AccountRepository extends JpaRepository<AccountEntity, String>{
}
