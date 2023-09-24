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

const Routers: React.FC = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route index element={<Navigate to="/login" />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoutes />}>
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
