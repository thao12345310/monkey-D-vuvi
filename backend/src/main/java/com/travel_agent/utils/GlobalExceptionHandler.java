package com.travel_agent.utils;

import com.travel_agent.dto.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Bắt các lỗi IllegalArgumentException như "Account not found" hoặc "already exists"
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ResponseObject> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ResponseObject.builder()
                        .message(ex.getMessage())
                        .responseCode(HttpStatus.BAD_REQUEST.value())
                        .build()
        );
    }

    // Bắt lỗi validation (nếu anh dùng @Valid sau này)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseObject> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldError().getDefaultMessage();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                ResponseObject.builder()
                        .message("Validation error: " + errorMessage)
                        .responseCode(HttpStatus.BAD_REQUEST.value())
                        .build()
        );
    }

    // Bắt tất cả các lỗi còn lại
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseObject> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                ResponseObject.builder()
                        .message("Unexpected error: " + ex.getMessage())
                        .responseCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .build()
        );
    }
}
