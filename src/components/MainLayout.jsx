import React from 'react';
// import Login from './Login';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import TaskManagementApp from '../taskManagement/TaskManagementApp';
import Home from './Home';
// import TaskBoard from '../taskManagement/TaskBoard';

const MainLayout = () => {
    return (
        <div>
        <Navbar></Navbar>
        {/* <Home></Home> */}
{/* <TaskManagementApp></TaskManagementApp> */}
{/* <TaskBoard></TaskBoard> */}
        {/* <Login></Login> */}
        <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;