package com.travel_agent.services;

import com.travel_agent.dto.UserDTO;
import com.travel_agent.exceptions.ReflectionException;
import com.travel_agent.mapper.UserMapper;
import com.travel_agent.models.entity.AccountEntity;
import com.travel_agent.models.entity.UserEntity;
import com.travel_agent.repositories.UserRepository;
import com.travel_agent.utils.ReflectionUtils;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final AccountService accountService;
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    // CREATE: Tạo mới User
    public UserDTO createUser(String username, String password, String role, LocalDate dob) {
        // Tạo Account thông qua AccountService
        AccountEntity account = accountService.createAccount(username, password, role);

        // Tạo UserEntity liên kết với Account
        UserEntity user = new UserEntity();
        user.setAccount(account);
        user.setDob(dob);

        userRepository.save(user);

        return userMapper.UserToUserDTO(user);
    }

    // READ: Tìm User theo ID
    public UserDTO getUserById(Integer userId) {
        UserEntity user= userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        return userMapper.UserToUserDTO(user);
    }

    // UPDATE: Cập nhật thông tin User
    public UserDTO updateUser(Integer userId, UserDTO userDTO) throws ReflectionException {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        ReflectionUtils.updateEntityFields(user, userDTO);
        userRepository.save(user);
        return userMapper.UserToUserDTO(user);
    }

    // DELETE: Xóa User theo ID
    public void deleteUser(Integer userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
        userRepository.delete(user);
    }

    // LIST ALL: Lấy tất cả User
    public List<UserDTO> getAllUsers() {
        List<UserEntity> users =  userRepository.findAll();
        return userMapper.UsersToUserDTOs(users);
    }
}
