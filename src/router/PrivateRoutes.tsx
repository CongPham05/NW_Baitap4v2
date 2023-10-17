import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';



const PrivateRoutes: React.FC = () => {
    const token = localStorage.getItem('access_token') || null;
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    );
};

export default PrivateRoutes;



