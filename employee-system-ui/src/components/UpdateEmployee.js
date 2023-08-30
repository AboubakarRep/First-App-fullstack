import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const UpdateEmployee = () => {

    //use Navigate for button cancel 
   const navigate =  useNavigate()

    //for handle id because it is with this parameter id we can fetch data in database for update fields
    const {id} = useParams(); //we deconstucted id from params

    //we need to handle one state
    const [employee, setEmployee] = useState({

        "id": id, //we fix id because we have already the id so let's update the id
        "firstName" : "",
        "lastName": "",
        "emailId": ""
    })

    //use useEffectSnippets
    useEffect(() => {
        //inside this useEffect we will create function
        const fetchData = async () => {
            try {
                const response = await EmployeeService.getEmployeeById(id) //this id got in const handleChange
                
                //once we get the response from the api, we need to update the state
                setEmployee(response.data) 
            } catch (error) {
                console.log(error)     
                  }
        };
        fetchData();
    },
    [id]);
    

    const handleChange = (e) => {
        const value = e.target.value; //for getting value, e.target.name "name can be firstName, lastName..." target is input field
        //we want to state the value getting
        setEmployee({...employee, [e.target.name]: value}) //we want to set employee with the existing employee so with existing others parameters values
    }

    const updateEmployee = (e) => {
            e.preventDefault();
            EmployeeService.updateEmployee(employee, id) //once we are update
            .then((response) => {
                navigate("/employeeList")
            })
            .catch((error) => console.log(error))
    }

  return (
    <div className='flex max-w-2xl shadow border-b mx-auto'>
    <div className='px-8 py-8'>
    <div className="font-thin text-2xl tracking-wider"> {/**tracking wider is for space between letters */}
        <h1>Update Employee</h1>
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
       onClick={updateEmployee}  
       >
            Update</button>
        <button onClick={() => navigate("/employeeList")} className='rounded text-white font-semibold bg-red-500 px-6 py-2 hover:bg-red-800'>Cancel</button>
    </div>
    </div> 
</div>
  )
}

export default UpdateEmployee