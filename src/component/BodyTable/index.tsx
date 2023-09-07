import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ChartPieIcon, } from '@heroicons/react/24/outline'
import { todosRemainningSelector } from "../../redux/selectors";
import WrapOptions from '../../component/WrapOptions/WrapOptions';
import ModalEdit from '../../services/ModalEdit';
import { Task } from "../../types"

interface BodyTableProps {
}

const BodyTable: React.FC<BodyTableProps> = () => {

    const tasks = useSelector(todosRemainningSelector)

    const [isModal, setIsModal] = useState(false);
    const [modalTask, setModalTask] = useState<Task | null>(null);

    const handleShowModal = (selectedTask: Task) => {
        setIsModal(true);
        setModalTask(selectedTask);
    }
    return (
        <div className="flex-1 min-w-max">
            {
                tasks.map((task, index) => (
                    <div key={task.id} className='flex border-b border-solid  text-[#656d76] '>
                        <div className="flex justify-center items-center w-20 min-w-[80px] ">
                            <span className="text-sm ">{index + 1}</span>
                        </div>

                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                            <span className=' w-5 mr-1.5'>
                                <ChartPieIcon />
                            </span>
                            <span className=' hover:underline hover:text-[#0969da] cursor-pointer font-normal'
                                onClick={() => handleShowModal(task)}
                            >
                                {task.content}
                            </span>

                        </div>
                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                            <WrapOptions task={task} type={"STATUS"} />
                        </div>
                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px] font-semibold p-2'>
                            <WrapOptions task={task} type={"PRIORITY"} />
                        </div>
                        <div className='flex items-center border-r border-solid text-sm w-[300px] min-w-[300px]  font-semibold p-2'>
                            <WrapOptions task={task} type={"SIZE"} />
                        </div>
                        <div className=" border-solid font-semibold flex justify-start">
                            <div className='p-5 hover:bg-[#eeeff2] '>

                            </div>
                        </div>
                    </div>
                ))
            }
            {isModal && modalTask && (
                <ModalEdit onRequestClose={() => setIsModal(false)} task={modalTask} />
            )}
        </div>
    );
};

export default BodyTable;
