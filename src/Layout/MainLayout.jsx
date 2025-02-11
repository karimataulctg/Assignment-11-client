import React from 'react';
import Navbar from '../components/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import DynamicTitle from '../components/DynamicTitle';





const MainLayout = () => {
    return (
        <div>
            <div className="mb-10">
                <Navbar />
            </div>
            <DynamicTitle />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
