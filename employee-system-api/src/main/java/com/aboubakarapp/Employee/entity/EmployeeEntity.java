package com.aboubakarapp.Employee.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "employees")
public class EmployeeEntity {

    @Id // Annotation indiquant que c'est la clé primaire
    @GeneratedValue(strategy = GenerationType.IDENTITY )//the value will be incremented
    private long id;
    private String firstName;
    private String lastName;
    private String emailId;
}
