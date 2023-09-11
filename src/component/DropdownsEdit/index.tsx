import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colsSelector, prioritySelector, sizeSelector } from '../../redux/selectors';
import { Menu, Transition } from '@headlessui/react';
import { Column, Priority, Task } from '../../types';
import WrapOptions from '../WrapOptions/WrapOptions';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { updCol } from '../../pages/Board/tasksSlice';

interface DropdownsProps {
    task: Task;
    typeOption: string;
}

const Dropdowns: React.FC<DropdownsProps> = ({ task, typeOption }) => {
    const dispatch = useDispatch();
    const columns = useSelector(colsSelector);
    const prioritys = useSelector(prioritySelector);
    const sizes = useSelector(sizeSelector);

    const options = typeOption === 'STATUS' ? columns : typeOption === 'PRIORITY' ? prioritys : sizes;
    const propertyToUpdate = typeOption === 'STATUS' ? 'columnId' : typeOption === 'PRIORITY' ? 'priorityId' : 'sizeId';

    const updateTaskProperty = (option: Column | Priority) => {
        const id = task.id;
        const newTask = {
            ...task,
            [propertyToUpdate]: option.id,
        };
        dispatch(updCol({ id, newTask }));
    };

    return (
        <Menu as="div" className="relative inline-block text-left w-full">
            <Menu.Button className="w-full">
                <div className='flex items-center group border-solid text-sm w-full font-semibold h-8 px-1'>
                    <WrapOptions task={task} type={typeOption} />
                    <div className='flex-1 flex justify-end'>
                        <ChevronDownIcon className='w-3 opacity-50 group-hover:opacity-100 mr-1' />
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
                <Menu.Items className="absolute left-0 z-10 top-8 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                                            {option.title}
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

export default Dropdowns;
