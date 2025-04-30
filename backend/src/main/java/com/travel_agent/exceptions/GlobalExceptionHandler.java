package com.travel_agent.exceptions;

import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
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


    @ExceptionHandler(UnrecognizedPropertyException.class)
    public ResponseEntity<ResponseObject> handleUnrecognizedPropertyException(UnrecognizedPropertyException ex) {
        String unknownField = ex.getPropertyName();  // Tên field không hợp lệ

        return ResponseEntity.badRequest().body(ResponseObject.builder()
                .responseCode(HttpStatus.BAD_REQUEST.value())
                .message("Invalid field in request body: \"" + unknownField + "\"")
                .data(null)
                .build());
    }

    @ExceptionHandler(ReflectionException.class)
    public ResponseEntity<String> handleReflectionException(ReflectionException e) {
        // Log lỗi nếu cần
        e.printStackTrace();
        
        // Trả về thông báo lỗi
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An error occurred while processing your request: " + e.getMessage());
    }

    // Bạn có thể thêm các Exception khác tại đây nếu cần
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        // Log lỗi
        e.printStackTrace();
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred: " + e.getMessage());
    }
}
