import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Board from '../pages/Board';
import Table from '../pages/Table';

interface RoutersProps {

}

const Routers: React.FC<RoutersProps> = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/board' />} />
            <Route path='/board' element={<Board />} />
            <Route path='/table' element={<Table />} />
        </Routes>
    );
};

export default Routers;