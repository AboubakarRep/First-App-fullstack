import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees"
class EmployeeService{

    saveEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL, employee) //we have to pass url and entire object for post
    }

    //for getting all employees for useEffect so for show in ui 
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL)
    }

    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL + "/" + id) //for this particular id i want to delete data
    }

    //api, methods for edit page
    getEmployeeById(id){
        return axios.get(EMPLOYEE_API_BASE_URL + "/" + id)
    }

    updateEmployee(employee, id){
        return axios.put(EMPLOYEE_API_BASE_URL + "/" + id, employee)
    }
}

export default new EmployeeService();