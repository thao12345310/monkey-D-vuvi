
package com.travel_agent.models.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Company")
public class CompanyEntity {
    @Id
    @Column (name = "company_id")
    private Integer companyId;

    @OneToOne
    @JoinColumn (name = "account_id")
    private AccountEntity account;

    @Column(name = "company_name")
    private String companyName;
}
