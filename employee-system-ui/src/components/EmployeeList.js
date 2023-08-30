// import React , {useState, useEffect} from 'react'
// import EmployeeService from '../services/EmployeeService';
// import Employee from './Employee';
// import { useNavigate } from 'react-router-dom';

// const EmployeeList = () => {
//     //for navigate between routes we need to use useNavigate
//    const navigate =  useNavigate();

//    //for fetch all the data and show 
//    const [employees, setEmployees] = useState(null) //null for the start endpoint

//    //FOR HANDLING THE LOADING , default loading is true, checked if data is loaded or not
//    const [loading, setLoading] = useState(true)

//    //use useEffect , you need to call method for getting all employees from EMployeeService
//    useEffect(() => {
//     const fetchData = async () => {
//         setLoading(true)
//         try{
//             const Response = await EmployeeService.getEmployees(); //fetch data can take some times so we have to use await 
//             //when we have got reponse, i need to set the response to my state
//             setEmployees(Response.data)
//         }catch(error){
//             console.log(error)
//         }
//         setLoading(false) //if all is completed with some error show  setLoading(false) because we have loaded the data
//     }
//     fetchData();
//    }, [])

//    //for delete method
//    const deleteEmployee = (e, id) => { //when i click on delete, it will send the id
//     e.preventDefault(); //i preventing the default behavior that is refreshing
//     EmployeeService.deleteEmployee(id) //then i am deleting data from database
//     .then((res) => { 
//         if(employees){ //if there is a data in my state employees
//             setEmployees((prevElement) => {
//                 return prevElement.filter((employee) => employee.id !== id) //whatever id i passed i want to remove from the list, it will remove from the state
//             })
//         }
//     })
//    }
   

//   return (
//     <div className='container mx-auto my-8' > {/**mx is margin x */}
//     <div className='h-12'>
//         {/**button for redirect to addEmployee page */}
//         <button /*onClick for navigate for route*/onClick={() => navigate("addEmployee")} className='rounded bg-slate-600 text-white px-6 py-2 font-semibold' >Add Employee</button>
//     </div>
//     <div className='flex shadow border-b'>
//         <table className='min-w-full'> {/**to separate all th */}
//             <thead className='bg-gray-100'> 
//                 <tr>
//                     <th  className='text-left font-medium text-gray-600 uppercase tracking-wider py-3 px-6'>First Name</th>
//                     <th  className='text-left font-medium text-gray-600 uppercase tracking-wider py-3 px-6'>Last Name</th>
//                     <th  className='text-left font-medium text-gray-600 uppercase tracking-wider py-3 px-6'>Email ID</th>
//                     <th  className='text-right font-medium text-gray-600 uppercase tracking-wider py-3 px-6'>Action</th>
//                 </tr>
//             </thead>
//             {!loading && (
//             <tbody className='bg-white'>
//                 {employees.map((employee) => (
//                     <Employee/** i need employee data  as a propertie called employee*/ employee={employee} key={employee.id} deleteEmployee={deleteEmployee}></Employee>
//                 ))}
//             </tbody>)}
//         </table>
//     </div>
//     </div>
//   )
// }

// export default EmployeeList 






















import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import Employee from "./Employee";

const EmployeeList = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await EmployeeService.getEmployees();
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteEmployee = (e, id) => {
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res) => {
      if (employees) {
        setEmployees((prevElement) => {
          return prevElement.filter((employee) => employee.id !== id);
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          onClick={() => navigate("/addEmployee")}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
          Add Employee
        </button>
      </div>
      <div className="flex shadow border-b">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                First Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Last Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Email ID
              </th>
              <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          {!loading && (
            <tbody className="bg-white">
              {employees.map((employee) => (
                <Employee
                  employee={employee}
                  deleteEmployee={deleteEmployee}
                  key={employee.id}></Employee>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
