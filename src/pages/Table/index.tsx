import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {
    PlusIcon,
    ChartPieIcon
} from '@heroicons/react/24/outline'

import { todosRemainningSelector } from "../../redux/selectors";
import WrapOptions from '../../component/WrapOptions/WrapOptions';
import ColTable from '../../component/DropdownsTable/ColTable';
import TitleTable from '../../component/DropdownsTable/TitleTable';


interface TableProps {
}


const Table: React.FC<TableProps> = () => {

    const tasks = useSelector(todosRemainningSelector)
    const [isModal, setIsModal] = useState(false);
    const handleShowModal = () => { setIsModal(!isModal) }

    return (
        <div className="w-full mx-auto ">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="block w-full overflow-x-auto">
                    <table className="items-center bg-transparent w-full border-collapse font-semibold text-[#656d76]">
                        <thead >
                            <tr>
                                <th className="py-1 pr-6 pl-20 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-solid 
                                    border-blueGray-100  text-[14px]  border-l-0 border-r whitespace-nowrap font-semibold text-left">
                                    <div className='flex items-center justify-between'>
                                        <div>Title</div>
                                        <TitleTable />
                                    </div>
                                </th>
                                <th className="py-1 pr-6 pl-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-solid 
                                    border-blueGray-100  text-[14px]  border-l-0 border-r whitespace-nowrap font-semibold text-left">
                                    <div className='flex items-center justify-between'>
                                        <div>Status</div>
                                        <ColTable />
                                    </div>
                                </th>
                                <th className="py-1 pr-6 pl-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-solid 
                                    border-blueGray-100  text-[14px]  border-l-0 border-r whitespace-nowrap font-semibold text-left">
                                    <div className='flex items-center justify-between'>
                                        <div>Priority</div>
                                        <ColTable />
                                    </div>
                                </th>
                                <th className="py-1 pr-6 pl-6 bg-blueGray-50 text-blueGray-500 align-middle border-2 border-solid 
                                    border-blueGray-100  text-[14px]  border-l-0 border-r whitespace-nowrap font-semibold text-left">
                                    <div className='flex items-center justify-between'>
                                        <div>Size</div>
                                        <ColTable />
                                    </div>
                                </th>
                                <th className="bg-blueGray-50 text-blueGray-500 align-middle border-2 border-solid 
                                                border-blueGray-100  text-[14px]  border-l-0 border-r whitespace-nowrap font-semibold text-left">
                                    <div className='py-2 px-4 w-[52px]  hover:bg-[#eeeff2] '>
                                        <PlusIcon />
                                    </div>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={task.id} className='font-normal border-b border-[#d0d7de] text-[#656d76] hover:bg-[#f6f8fa] '>
                                    <th className=" flex justify-start px-2 py-2.5 font-normal border-t-0 
                                                     align-middle border-l-0 border-r text-sm whitespace-nowrap  ">
                                        <div className=' w-1/12  mx-4 '>
                                            {index + 1}
                                        </div>
                                        <div className='flex items-center text-[#656d76] '>
                                            <span className='inline-block w-5 mr-1'>
                                                <ChartPieIcon />
                                            </span>
                                            <span className='inline-block hover:underline hover:text-[#0969da] cursor-pointer'
                                                onClick={handleShowModal}>
                                                {task.content}
                                            </span>
                                        </div>
                                    </th>
                                    <td className=" border-t-0 px-6 align-middle border-l-0 border-r text-sm whitespace-nowrap p-2 ">
                                        <WrapOptions task={task} type={"STATUS"} />
                                    </td>
                                    <td className="border-t-0 px-6 align-center border-l-0 border-r text-sm whitespace-nowrap p-2">
                                        <WrapOptions task={task} type={"PRIORITY"} />
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r text-sm whitespace-nowrap p-2">
                                        <WrapOptions task={task} type={"SIZE"} />
                                    </td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r text-sm whitespace-nowrap p-3">
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
};

export default Table;