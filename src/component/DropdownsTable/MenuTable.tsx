import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BarsArrowDownIcon, BarsArrowUpIcon, XMarkIcon, EllipsisHorizontalIcon, Bars2Icon } from '@heroicons/react/24/outline'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}
interface MenuTableProps {
    showArrowUpIcon: () => void;
    isArrowUp: null | boolean;
    showArrowDownIcon: () => void;
    isArrowDown: null | boolean;
    showGroupIcon: () => void;
    isGroup: boolean | null;
    headCol: {
        id: string;
        title: string;
        optionUp: string;
        optionDown: string;
        optionGroup?: string | undefined;
    };
}
const MenuTable: React.FC<MenuTableProps> = ({
    showArrowUpIcon,
    isArrowUp,
    showArrowDownIcon,
    isArrowDown,
    showGroupIcon,
    isGroup,
    headCol,
}) => {

    const handleSortAscending = () => {
        showArrowUpIcon();
    }
    const handleSortDescending = () => {
        showArrowDownIcon();
    }
    const handleShowGroupIcon = () => {
        showGroupIcon();
    }

    return (
        <Menu as="div" className="relative inline-block text-left ">
            <div>
                <Menu.Button
                    className=" dark:hover:bg-slate-600 dark:text-white hover:bg-[#f3f4f6] p-1 rounded-lg font-semibold text-[#656d76]">
                    <EllipsisHorizontalIcon className='w-5' />
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
                <Menu.Items className="absolute font-normal py-1.5 right-2 z-10 top-9 w-48 origin-top-right divide-y divide-gray-100 
                                        rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item >
                            {({ active }) => (
                                <div onClick={handleSortAscending}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 '
                                    )}>
                                    <BarsArrowUpIcon className="h-5 text-gray-500" aria-hidden="true" />
                                    <div className=' flex items-center justify-between flex-1'>
                                        <a href="#" className=' pl-2 py-2 flex-grow block '>
                                            {headCol.optionUp}
                                        </a>
                                        {isArrowUp && <XMarkIcon className="h-4 mx-3 text-gray-500 " />}
                                    </div>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item >
                            {({ active }) => (
                                <div onClick={handleSortDescending}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : ' text-gray-700', 'flex items-center pl-4'
                                    )}>
                                    <BarsArrowDownIcon className="h-5 text-gray-500" aria-hidden="true" />
                                    <div
                                        className=' flex items-center justify-between flex-1'>
                                        <a href="#" className=' pl-2 py-2 flex-grow block '>
                                            {headCol.optionDown}
                                        </a>
                                        {isArrowDown && <XMarkIcon className="h-4 mx-3 text-gray-500 " />}
                                    </div>
                                </div>
                            )}
                        </Menu.Item>
                        {
                            headCol.optionGroup &&
                            <Menu.Item >
                                {({ active }) => (
                                    <div onClick={handleShowGroupIcon}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900 ' : ' text-gray-700', 'flex items-center pl-4 '
                                        )}>
                                        <Bars2Icon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                                        <a href="#" className=' pl-2 py-2 flex-grow  text-sm '>
                                            {headCol.optionGroup}
                                        </a>
                                        {isGroup && <XMarkIcon className="h-4 mx-3 text-gray-500 " />}
                                    </div>
                                )}
                            </Menu.Item>
                        }
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default MenuTable;
