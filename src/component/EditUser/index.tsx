import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import requestApi from '../../helpers/api';
import { updateUser } from '../../redux/reducerSlice/authSlice';
import { toast } from 'react-toastify';
import { useOnClickOutside } from 'usehooks-ts';
import { PencilIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

interface EditUser {
    userId?: number;
    active?: string;
    label: string;
}

const EditUser: React.FC<EditUser> = ({ userId, active, label }) => {

    const ref = useRef(null);
    const dispatch = useDispatch();
    const [showEdit, setShowEdit] = useState(false);
    const [input, setInput] = useState(active);
    const [clickCount, setClickCount] = useState(0);

    const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
        setClickCount(clickCount + 1);
        if (clickCount === 1) {
            handleShowEdit(e)
            setClickCount(0);
        }
    };
    const handleOnchangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleShowEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowEdit(!showEdit);
        setInput(active)
    }
    const handleOutsideClick = (e: MouseEvent) => {
        e.stopPropagation();
        setClickCount(0);
        if (showEdit) {
            setShowEdit(false);
            setInput(active);
        }
    };
    const handleSaveEdit = async () => {
        if (input !== active) {
            try {
                const dataToSend = label === "Email" ? { email: input } : { userName: input };
                const res = await requestApi(`users/${userId}`, 'PATCH', dataToSend)
                const fetchData = res.data.user;
                const message = res.data.message;
                setShowEdit(false);
                dispatch(updateUser({ auth: fetchData }))
                toast.success(message, { position: 'bottom-right' })
            } catch (error) {
                console.log(error);
            }
        }
        setShowEdit(false);
    }
    useOnClickOutside(ref, handleOutsideClick);
    return (
        <>
            {!showEdit ?
                <div ref={ref} className={
                    clsx(' px-5 py-5 flex flex-col hover:bg-slate-50 hover:cursor-pointer border-t border-b',
                        clickCount && 'border-blue-500')}
                    onClick={(e) => handleClick(e)}
                >
                    <div className='flex justify-between items-center'>
                        <p >{label}</p>
                        <div className='flex justify-between items-center text-gray-500'>
                            <PencilIcon className='w-3 ' />
                            <p className=' ml-1 text-sm '>Edit</p>
                        </div>
                    </div>
                    <p className=' text-gray-500 pt-3' >{active}</p>
                </div >
                :
                <div ref={ref} className='flex flex-col bg-gray-100 rounded-md px-5 py-5' >
                    <div className='mb-3'>{label}</div>
                    <div  >
                        <input className='text-gray-900 block w-full px-1 outline-none border-blue-400  border-b bg-slate-100 '
                            onChange={handleOnchangeInput}
                            autoFocus value={input} />
                        <div className='mt-5 flex justify-end h-6 items-center' >
                            <button className='bg-green-500 px-3 py-1 border rounded-md mr-2  opacity-90 hover:opacity-100'
                                onClick={handleSaveEdit}
                            >
                                Save
                            </button>
                            <button className=' px-3 py-1 border rounded-md bg-gray-400 opacity-90 hover:opacity-100 '
                                onClick={(e) => handleShowEdit(e)}
                            >
                                Cancel</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default EditUser;