import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';



const PublicRoutes: React.FC = () => {
    const token = localStorage.getItem('access_token') || false;
    return (
        !token ? <Outlet /> : <Navigate to='/view' />
    );
};

export default PublicRoutes;



