
package com.travel_agent.controllers;

import com.travel_agent.services.CompanyService;
import com.travel_agent.dto.CompanyDTO;
import com.travel_agent.dto.ResponseObject;
import com.travel_agent.exceptions.ReflectionException;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<ResponseObject> createCompany(@RequestBody CompanyDTO companyDTO) {

        String username = companyDTO.getUsername();
        String password = companyDTO.getPassword();
        String role = companyDTO.getRole() == null ? "company" : companyDTO.getRole();
        String companyName = companyDTO.getCompanyName();
        System.out.println("Information: " + username + " " + password + " " + role + " " + companyName);
        if (username == null || password == null || companyName == null || !role.equals("company")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseObject.builder()
                    .message("Invalid input data")
                    .responseCode(HttpStatus.BAD_REQUEST.value())
                    .build());
        }

        CompanyDTO createdCompany = companyService.createCompany(
                username, password, role, companyName);

        return ResponseEntity.status(HttpStatus.CREATED).body(ResponseObject.builder()
                .message("Company created successfully")
                .data(createdCompany)
                .responseCode(HttpStatus.CREATED.value())
                .build());
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<ResponseObject> getCompanyById(@PathVariable Integer companyId) {
        CompanyDTO company = companyService.getCompanyById(companyId);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Company retrieved successfully")
                .data(company)
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<ResponseObject> updateCompany(@PathVariable Integer companyId, @RequestBody CompanyDTO companyDTO)throws ReflectionException{
        CompanyDTO updatedCompany = companyService.updateCompany(companyId, companyDTO);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Company updated successfully")
                .data(updatedCompany)
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<ResponseObject> deleteCompany(@PathVariable Integer companyId) {
        companyService.deleteCompany(companyId);
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Company deleted successfully")
                .responseCode(HttpStatus.OK.value())
                .build());
    }

    @GetMapping
    public ResponseEntity<ResponseObject> getAllCompanies() {
        List<CompanyDTO> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(ResponseObject.builder()
                .message("List of companies retrieved successfully")
                .data(companies)
                .responseCode(HttpStatus.OK.value())
                .build());
    }
}
