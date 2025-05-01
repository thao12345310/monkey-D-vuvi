
package com.travel_agent.controllers;

import com.travel_agent.services.UserService;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.dto.UserDTO;
import com.travel_agent.exceptions.ReflectionException;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ResponseObject> createUser(@RequestBody UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        String role = userDTO.getRole() == null ? "user" : userDTO.getRole();
        LocalDate dob = userDTO.getDob();
        if (username == null || password == null || dob == null || !role.equals("user")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder()
                    .message("Invalid input data")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }
        
        UserDTO createdUser = userService.createUser(
            username, password, role, dob);


        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseObject.builder()
                .message("User created successfully")
                .data(createdUser)
                .responseCode(HttpStatus.CREATED.value())
                .build());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ResponseObject> getUserById(@PathVariable Integer userId) {
        UserDTO user = userService.getUserById(userId);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("User retrieved successfully")
                .data(user)
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ResponseObject> updateUser(@PathVariable Integer userId, @RequestBody UserDTO userDTO) throws ReflectionException{
        UserDTO updatedUser = userService.updateUser(userId, userDTO);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("User updated successfully")
                .data(updatedUser)
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ResponseObject> deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("User deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(ResponseObject.builder()
                .message("List of users retrieved successfully")
                .data(users)
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}
