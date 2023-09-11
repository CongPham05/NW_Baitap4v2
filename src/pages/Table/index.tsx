import React from 'react'
import ViewTable from '../../component/ViewTable';

interface TableProps {
}
const Table: React.FC<TableProps> = () => {
    return (
        <div className='flex-1 flex flex-col w-full overflow-y-auto bg-white '>
            <ViewTable />
        </div>
    );
};

export default Table;

