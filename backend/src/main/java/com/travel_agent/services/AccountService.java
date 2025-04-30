package com.travel_agent.services;

import com.travel_agent.models.entity.AccountEntity;
import com.travel_agent.repositories.AccountRepository;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;

    // CREATE
    public AccountEntity createAccount(String username, String password, String role) {
        AccountEntity account = new AccountEntity();
        account.setUsername(username);
        account.setPassword(password);
        account.setRole(role);

        // Gọi generateId() để tạo accountId
        account.generateId();

        // Kiểm tra nếu accountId đã tồn tại
        if (accountRepository.existsById(account.getAccountId())) {
            throw new IllegalArgumentException("Account already exists with ID: " + account.getAccountId());
        }

        return accountRepository.save(account);
    }

    // READ: Find Account by ID
    public AccountEntity getAccountById(String accountId) {
        return accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found with ID: " + accountId));
    }

    // UPDATE: Update Account
    public AccountEntity updateAccount(String accountId, String username, String password, String role) {
        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found with ID: " + accountId));

        account.setUsername(username);
        account.setPassword(password);
        account.setRole(role);

        return accountRepository.save(account);
    }

    // DELETE: Delete Account
    public void deleteAccount(String accountId) {
        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found with ID: " + accountId));
        accountRepository.delete(account);
    }

    // LIST ALL: Find all accounts
    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findAll();
    }
}
