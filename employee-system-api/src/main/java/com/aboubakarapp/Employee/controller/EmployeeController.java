package com.aboubakarapp.Employee.controller;

import com.aboubakarapp.Employee.model.Employee;
import com.aboubakarapp.Employee.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000") // FOR ALLOW MY REACT APP SO MY UI APP FOR INTERACT WITH DATABASE APP SO SPRING BOOT APP
@RestController
@RequestMapping("/api/v1")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) { //constructor
        this.employeeService = employeeService;
    }

    @PostMapping("/employees")
    public Employee creEmployee(@RequestBody Employee employee){
      return   employeeService.createEmployee(employee);
    }

    //fetch all data so all employees
    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }


    //for delete employee
    @DeleteMapping("/employees/{id}") //delete base on a particular id
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
        boolean deleted = false;
        deleted = employeeService.deleteEmployee(id);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }

    //for edit profile
    //for get
    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee employee = null;
        employee = employeeService.getAllEmployeeById(id);

        return ResponseEntity.ok(employee);
    }

    //for edit page
    //for updating data in our database

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employee) { //i'll get
        //entire employee object and i'll also passed the id

        employee = employeeService.updateEmployee(id, employee);
        return ResponseEntity.ok(employee);
    }
}
