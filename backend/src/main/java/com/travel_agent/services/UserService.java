package com.travel_agent.services;

import com.travel_agent.models.entity.AccountEntity;
import com.travel_agent.models.entity.UserEntity;
import com.travel_agent.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AccountService accountService;
    private final UserRepository userRepository;

    // CREATE: Tạo mới User
    public UserEntity createUser(String username, String password, String role, LocalDateTime dob) {
        // Tạo Account thông qua AccountService
        AccountEntity account = accountService.createAccount(username, password, role);

        // Tạo UserEntity liên kết với Account
        UserEntity user = new UserEntity();
        user.setAccount(account);
        user.setDob(dob);

        return userRepository.save(user);
    }

    // READ: Tìm User theo ID
    public UserEntity getUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
    }

    // UPDATE: Cập nhật thông tin User
    public UserEntity updateUser(Integer userId, LocalDateTime dob) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        user.setDob(dob);
        return userRepository.save(user);
    }

    // DELETE: Xóa User theo ID
    public void deleteUser(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        userRepository.delete(user);
    }

    // LIST ALL: Lấy tất cả User
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }
}
