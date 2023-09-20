import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Board from '../pages/Board';
import Table from '../pages/Table';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../component/NotFound/NotFound';


const Routers: React.FC = () => {

    return (
        <Routes>
            <Route path='/' element={<Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/board' element={<Board />} />
            <Route path='/table' element={<Table />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default Routers;