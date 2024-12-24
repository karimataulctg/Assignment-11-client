import React from 'react';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import DynamicTitle from '../components/DynamicTitle';





const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <DynamicTitle></DynamicTitle>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;