import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AddEmployee from './components/AddEmployee';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import UpdateEmployee from './components/UpdateEmployee';

function App() {
  return (
    <>

    <BrowserRouter>
    <Navbar /> {/**navBar can show all times */}
    {/**we have separate nav bar of others diffferents routes */}
    <Routes>
      <Route index element={<EmployeeList/>}/>
      <Route path='/' element={<EmployeeList/>}/>{/**if application goes to "/" i need to show EmployeeList */}
      <Route path='/employeeList' element={<EmployeeList/>}/>
      <Route path='/addEmployee' element={<AddEmployee/>}/>
      <Route path='/editEmployee/:id' element={<UpdateEmployee/>}/>
    </Routes>
    {/* <AddEmployee/>
    <EmployeeList/> */} {/** i don't need because i set routes */}
    </BrowserRouter>
    </>
  );
}

export default App;
