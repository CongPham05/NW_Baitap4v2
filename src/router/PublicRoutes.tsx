import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { authSelector } from '../redux/selectors';

const PublicRoutes: React.FC = () => {
    const token = localStorage.getItem('access_token') || null;
    const user = useSelector(authSelector);
    const roleUser = user.roles;

    const isAuthenticated = !!token;
    const isAdmin = roleUser === 'admin';
    const redirectPath = isAdmin ? '/admin' : '/view';

    return isAuthenticated ? <Navigate to={redirectPath} /> : <Outlet />;
};

export default PublicRoutes;
