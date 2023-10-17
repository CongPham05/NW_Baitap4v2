import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import EditUser from '../component/EditUser';
import { PropUser } from '../types';
import FormChangePassword from '../component/FormChangePassword';


interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: PropUser
}

const ModalEditUser: React.FC<Props> = ({ isOpen, onClose, user }) => {
    const cancelButtonRef = useRef(null);
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[1000]" initialFocus={cancelButtonRef} onClose={() => onClose()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-50 overflow-y-auto " >
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0" >
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform bg-white text-left shadow-xl transition-all sm:my-8 w-1/2 translate-y-[-30px] ">
                                <div className="flex items-center justify-between bg-gray-500 px-4 py-3">
                                    <div className='text-lg font-semibold text-white'>Profile Settings</div>
                                    <div className=" block mt-3 w-full px-2 py-2 text-sm font-semibold hover:opacity-60 cursor-pointer sm:mt-0 sm:w-auto"
                                        onClick={() => onClose()}
                                        ref={cancelButtonRef}
                                    >
                                        <XMarkIcon className='w-5 text-white' />
                                    </div>
                                </div>
                                <div className="bg-white  pb-4 overflow-x-hidden h-[345px] ">
                                    <div className="flex flex-col">
                                        <EditUser userId={user.id} active={user.userName} label={"User Name"} />
                                        <EditUser userId={user.id} active={user.email} label={"Email"} />
                                        <FormChangePassword userId={user.id} label={"Password"} />
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    )
}
export default ModalEditUser;