package com.travel_agent.services;

import com.travel_agent.models.entity.AccountEntity;
import com.travel_agent.models.entity.CompanyEntity;
import com.travel_agent.repositories.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final AccountService accountService;
    private final CompanyRepository companyRepository;

    // CREATE: Create a new Company
    public CompanyEntity createCompany(String username, String password, String role, String companyName) {
        // Tạo Account thông qua AccountService
        AccountEntity account = accountService.createAccount(username, password, role);

        // Tạo CompanyEntity liên kết với Account
        CompanyEntity company = new CompanyEntity();
        company.setAccount(account);
        company.setCompanyName(companyName);

        companyRepository.save(company);
        return company;
    }

    // READ: Find Company by ID
    public CompanyEntity getCompanyById(Integer companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + companyId));
    }

    // UPDATE: Update Company
    public CompanyEntity updateCompany(Integer companyId, String companyName) {
        CompanyEntity company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + companyId));

        company.setCompanyName(companyName);
        return companyRepository.save(company);
    }

    // DELETE: Delete Company
    public void deleteCompany(Integer companyId) {
        CompanyEntity company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found with ID: " + companyId));
        companyRepository.delete(company);
    }

    // LIST ALL: Find all companies
    public List<CompanyEntity> getAllCompanies() {
        return companyRepository.findAll();
    }
}
