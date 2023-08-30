package com.aboubakarapp.Employee.services;

import com.aboubakarapp.Employee.entity.EmployeeEntity;
import com.aboubakarapp.Employee.model.Employee;
import com.aboubakarapp.Employee.repository.EmployeeRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService{
    private EmployeeRepository employeeRepository;

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Override
    public Employee createEmployee(Employee employee) { //we are getting employee object but we need to convert
        //this employee to the employee entity to save to our database

        EmployeeEntity employeeEntity  = new EmployeeEntity();


        //we need to copy all values from employee to employee entity
        BeanUtils.copyProperties(employee, employeeEntity); //parameters(first is source and the second is destination)

        employeeRepository.save(employeeEntity);

        return employee;
    }

    //for getting all employees
    @Override
    public List<Employee> getAllEmployees() {
        List<EmployeeEntity> employeeEntities //getting list of employees from repository
                = employeeRepository.findAll();

        List<Employee> employees = employeeEntities //we have convert to list of employee for the ui employee
                .stream()
                .map(emp -> new Employee(emp.getId() //use map to convert employee entity to employee
                , emp.getFirstName(),
                        emp.getLastName(),
                        emp.getEmailId() ))
                .collect(Collectors.toList());
         //at the end we collected the entire of the list
        return employees;
    }

    //for deleted
    @Override
    public boolean deleteEmployee(Long id) {
        EmployeeEntity employee = employeeRepository.findById(id).get();
        employeeRepository.delete(employee);
        return true;
    }

    // for edit employee
    @Override
    public Employee getAllEmployeeById(Long id) {
        EmployeeEntity employeeEntity =
                employeeRepository.findById(id).get();
        Employee employee = new Employee();
        BeanUtils.copyProperties(employeeEntity, employee); //copy properties from employeeEntity to employee
        return employee;
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        EmployeeEntity employeeEntity
                = employeeRepository.findById(id).get();
        //i need to update all the records from employee with this particular entity

        employeeEntity.setEmailId(employee.getEmailId()); //for othe than id
        employeeEntity.setFirstName(employee.getFirstName());
        employeeEntity.setLastName(employee.getLastName());

        employeeRepository.save(employeeEntity);
        return employee;
    }


}
