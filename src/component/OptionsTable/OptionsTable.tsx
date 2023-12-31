import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colsSelector, dataSelector, prioritySelector, sizeSelector } from '../../redux/selectors';
import { Menu, Transition } from '@headlessui/react';
import { Column, Priority, Task } from '../../types';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { sortTable, updCol } from '../../redux/reducerSlice/tasksSlice';
import WrapOptions from '../WrapOptions/WrapOptions';
import requestApi from '../../helpers/api';
import { toast } from 'react-toastify';

interface OptionsTableProps {
    task: Task;
    typeOption: string;
}

const OptionsTable: React.FC<OptionsTableProps> = ({ task, typeOption }) => {
    const dispatch = useDispatch();
    const columns = useSelector(colsSelector);
    const prioritys = useSelector(prioritySelector);
    const sizes = useSelector(sizeSelector);
    const sortStatus = useSelector(dataSelector);

    const options = typeOption === 'STATUS' ? columns : typeOption === 'PRIORITY' ? prioritys : sizes;
    const propertyToUpdate = typeOption === 'STATUS' ? 'statusId' : typeOption === 'PRIORITY' ? 'priorityId' : 'sizeId';

    const updateTaskProperty = async (option: Column | Priority) => {
        const id = task.id;
        const newTask = {
            ...task,
            [propertyToUpdate]: option.id,
        };
        try {
            const fetchData = await requestApi(`todo/${id}`, 'PATCH', newTask)
            const message = fetchData.data.message;
            toast.success(message, { position: 'bottom-right', autoClose: 2000 })

        } catch (error) {
            console.log(error);
        }
        dispatch(updCol({ id, newTask }));
        dispatch(sortTable(sortStatus));
    };

    return (
        <Menu as="div" className="relative dark-border  border-r px-3 ">
            <Menu.Button className="w-full ">
                <div className='flex items-center group  text-sm  font-semibold '>
                    <WrapOptions task={task} type={typeOption} />
                    <div className='flex-1 flex items-center  justify-end py-3'>
                        <ChevronDownIcon className='dark-text w-3 opacity-30 group-hover:opacity-100 mr-2' />
                    </div>
                </div>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute left-0 z-10 pb-1 top-10 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <span className='block text-sm px-4 py-2 text-black border-b'>Select an item</span>
                        {options.map((option) => (
                            <Menu.Item key={option.id}>
                                {({ active }) => (
                                    <div className={`flex items-center pl-4 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'}`}>
                                        {option.id === task[propertyToUpdate] ? (
                                            <CheckIcon className='w-3.5 font-medium mr-2' />
                                        ) : (
                                            <div className='w-3.5 mr-2'></div>
                                        )}
                                        <div onClick={() => updateTaskProperty(option)} className='pl-2 py-2 flex-grow text-sm'>
                                            {option.content}
                                        </div>
                                    </div>
                                )}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default OptionsTable;
