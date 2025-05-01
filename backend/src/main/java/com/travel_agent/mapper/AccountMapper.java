package com.travel_agent.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.travel_agent.dto.AccountDTO;
import com.travel_agent.models.entity.AccountEntity;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountDTO accountToAccountDTO (AccountEntity account);
    List<AccountDTO> accountsToAccountDTOs (List<AccountEntity> accounts);
}
