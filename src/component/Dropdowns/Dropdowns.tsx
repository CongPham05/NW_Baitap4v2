import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ArchiveBoxIcon, TrashIcon, PencilIcon, EyeSlashIcon, SparklesIcon } from '@heroicons/react/24/outline'
import { Column, Id } from '../../types';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
interface DropdownsProps {
    deleteColumn: (id: Id) => void;
    column: Column;
    deleteAllTask: (id: Id) => void;
}

const Dropdowns: React.FC<DropdownsProps> = ({ deleteColumn, column, deleteAllTask }) => {

    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button className="hover:bg-[#f3f4f6] p-1 rounded-lg font-semibold text-[#656d76]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6   ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-2 z-10 mt-1 w-48 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <span className='block text-xs  text-[#656d76] px-4 py-2 cursor-default font-semibold'>Items</span>
                        <Menu.Item >
                            {({ active }) => (
                                <div className={classNames(
                                    active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 '
                                )}>
                                    <ArchiveBoxIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-2 flex-grow text-sm '>Archive all </a>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item >
                            {({ active }) => (
                                <div onClick={() => deleteAllTask(column.id)}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 text-red-600 '
                                    )}>
                                    <TrashIcon className="h-5 w-5  text-red-600" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-2 flex-grow text-sm '>Delete all </a>
                                </div>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <span className='block text-xs  text-[#656d76] px-4 py-2 cursor-default font-semibold'>Column</span>
                        <Menu.Item >
                            {({ active }) => (
                                <div className={classNames(
                                    active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 '
                                )}>
                                    <SparklesIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-2 flex-grow  text-sm '> Set limit</a>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item >
                            {({ active }) => (
                                <div className={classNames(
                                    active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 '
                                )}>
                                    <PencilIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-2 flex-grow  text-sm '>Edit details</a>
                                </div>

                            )}
                        </Menu.Item>
                        <Menu.Item >
                            {({ active }) => (
                                <div className={classNames(
                                    active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 '
                                )}>
                                    <EyeSlashIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-2 flex-grow  text-sm '> Hide from view</a>
                                </div>

                            )}
                        </Menu.Item>

                        <Menu.Item >
                            {({ active }) => (
                                <div onClick={() => { deleteColumn(column.id) }}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 text-red-600 mb-1'
                                    )}>
                                    <TrashIcon className="h-5 w-5  text-red-600" aria-hidden="true" />
                                    <a href="#" className=' pl-2 py-2 flex-grow  text-sm '> Delete</a>
                                </div>

                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Dropdowns;
