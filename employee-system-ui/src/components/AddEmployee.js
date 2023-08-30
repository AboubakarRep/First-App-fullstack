import React, { useState } from 'react'
import EmployeeService from '../services/EmployeeService';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {

    //we have to create a state for save data and we use axios with npm install axios for interact with databases
    const [employee, setEmployee] = useState(/*we need to define defaults values*/
    {
        "id": "",
        "firstName" : "",
        "lastName": "",
        "emailId": ""
    }) //using deconstruction from this useState


    //for redirect to main page after save data
    const navigate = useNavigate();


    const handleChange = (e) => {
        const value = e.target.value; //for getting value, e.target.name "name can be firstName, lastName..." target is input field
        //we want to state the value getting
        setEmployee({...employee, [e.target.name]: value}) //we want to set employee with the existing employee so with existing others parameters values
    }

    //create function for save Data
    const saveEmployee = (e) => {
        e.preventDefault() //disable the refreshing of the page

        //call api and don't forget i install axis for that, for that we have to create one service folder 
        EmployeeService.saveEmployee(employee).then((Response) => {
            console.log(Response) //we want to show Response

            //we have to use useNavigate to navigate for other route for redirect to the main pages
            navigate("/employeeList")
        }) //we will pass employee Object, is the state
        .catch((error) =>{
            console.log(error);
        });
    }

    //for rest button
    const reset = (e) => {
        e.preventDefault(); //because i don't want to refresh the page
        setEmployee(
            {
                "id": "",
                "firstName" : "",
                "lastName": "",
                "emailId": ""
            }
        );

    }

  return (
    <div className='flex max-w-2xl shadow border-b mx-auto'>
        <div className='px-8 py-8'>
        <div className="font-thin text-2xl tracking-wider"> {/**tracking wider is for space between letters */}
            <h1>Add New Employee</h1>
        </div>
        <div className='item-center justify-center h-14 w-full my-6'>
            <label className='block text-gray-900 text-sm font-normal'>First Name</label> 
            <input type='text' className='h-9 w-96 border mt-2 px-2 py-2'/**fo use useState */ name='firstName' value={employee.firstName} onChange={(e) => handleChange(e)}></input> 
        </div>

        <div className='item-center justify-center h-14 w-full my-6'>
            <label className='block text-gray-900 text-sm font-normal'>Last Name</label> 
            <input type='text' className='h-9 w-96 border mt-2 px-2 py-2' name='lastName' value={employee.lastName} onChange={(e) => handleChange(e)} ></input> 
        </div>

        <div className='item-center justify-center h-14 w-full my-6'>
            <label className='block text-gray-900 text-sm font-normal'>Email</label> 
            <input type='email' className='h-9 w-96 border mt-2 px-2 py-2' name='emailId' value={employee.emailId} onChange={(e) => handleChange(e)}></input>
        </div>

        <div className='item-center justify-center h-14 w-full my-6 space-x-4 pt-4'> {/**space x permit to separate the both buttons */}
            <button className='rounded text-white font-semibold bg-green-500 px-6 py-2 hover:bg-green-800'
           //save data so interact with database 
           onClick={saveEmployee}  
           >
                Save</button>
            <button onClick={reset} className='rounded text-white font-semibold bg-red-500 px-6 py-2 hover:bg-red-800'>Clear</button>
        </div>
        </div>

        
    </div>
  )
}

export default AddEmployee