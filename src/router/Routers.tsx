import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Board from '../pages/Board';
import Table from '../pages/Table';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Layout from '../Layout/Layout';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import NotiReset from '../services/NotiReset';
import LayoutAdmin from '../LayoutAdmin/LayoutAdmin';
import Dashboard from '../dashboard';
import BodyUsers from '../component/BodyUsers';
import LayoutRouteChat from '../LayoutRouteChat/LayoutRouteChat';

const Routers: React.FC = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route index element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="password_reset/*" element={<ResetPassword />} />
                <Route path="notification-password" element={<NotiReset />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="admin" element={<LayoutAdmin />} >
                    <Route index element={<Navigate to="users" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<BodyUsers />} />
                    <Route path="chats" element={<LayoutRouteChat />} >
                    </Route>
                </Route>
                <Route path="view" element={<Layout />} >
                    <Route index element={<Navigate to="board" />} />
                    <Route path="board" element={<Board />} />
                    <Route path="table" element={<Table />} />
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default Routers;
