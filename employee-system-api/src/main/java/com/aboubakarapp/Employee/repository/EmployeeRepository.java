package com.aboubakarapp.Employee.repository;

import com.aboubakarapp.Employee.entity.EmployeeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<EmployeeEntity, Long> { /*this jpa repository is of type
EmployeeEntity and the type of id is Long*/
}
