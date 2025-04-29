package com.travel_agent.controllers;

import com.travel_agent.models.entity.CompanyEntity;
import com.travel_agent.services.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    // CREATE: Tạo mới Company
    @PostMapping
    public ResponseEntity<CompanyEntity> createCompany(
            @RequestParam String username,
            @RequestParam String password,
            @RequestParam String role,
            @RequestParam String companyName) {

        CompanyEntity createdCompany = companyService.createCompany(username, password, role, companyName);
        return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
    }

    // READ: Lấy thông tin Company theo ID
    @GetMapping
    public ResponseEntity<List<CompanyEntity>> getCompanyAll() {
        List<CompanyEntity> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<CompanyEntity> getCompanyById(@PathVariable Integer companyId) {
        CompanyEntity company = companyService.getCompanyById(companyId);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    // UPDATE: Cập nhật thông tin Company
    @PutMapping("/{companyId}")
    public ResponseEntity<CompanyEntity> updateCompany(
            @PathVariable Integer companyId,
            @RequestParam String companyName) {

        CompanyEntity updatedCompany = companyService.updateCompany(companyId, companyName);
        return new ResponseEntity<>(updatedCompany, HttpStatus.OK);
    }

    // DELETE: Xóa Company theo ID
    @DeleteMapping("/{companyId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Integer companyId) {
        companyService.deleteCompany(companyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // LIST ALL: Lấy tất cả Company
    @GetMapping
    public ResponseEntity<Iterable<CompanyEntity>> getAllCompanies() {
        Iterable<CompanyEntity> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }
}
