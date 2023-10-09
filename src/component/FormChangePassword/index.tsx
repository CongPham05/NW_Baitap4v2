import React, { useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangePasswordForm } from '../../types';
import requestApi from '../../helpers/api';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon, PencilIcon } from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';
import clsx from 'clsx';

interface Props {
    userId?: number;
    label: string;
}

const FormChangePassword: React.FC<Props> = ({ userId, label }) => {
    const ref = useRef(null);
    const [showEdit, setShowEdit] = useState(false);
    const [oldPasswordShow, setOldPasswordShow] = useState(false);
    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
        setClickCount(clickCount + 1);
        if (clickCount === 1) {
            handleShowEdit(e)
            setClickCount(0);
        }
    };

    const toggleOldPasswordShow = () => {
        setOldPasswordShow(!oldPasswordShow)
    }
    const togglePasswordVisiblity = () => {
        setPasswordShow(!passwordShow);
    };
    const togglePasswordConfirm = () => {
        setConfirmPasswordShow(!confirmPasswordShow);
    };
    const {
        register, handleSubmit, watch, reset,
        formState: { errors },
    } = useForm<ChangePasswordForm>();

    const handleShowEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        reset();
        setShowEdit(!showEdit);
    }

    const handleOutsideClick = (e: MouseEvent) => {
        setClickCount(0);
        if (showEdit) {
            e.stopPropagation();
            setShowEdit(!showEdit);
        }
    };

    const onSubmit: SubmitHandler<ChangePasswordForm> = async (credentials) => {
        const { oldPassword, password } = credentials;
        const credential = { oldPassword, password };
        try {
            const res = await requestApi(`users/${userId}`, 'PATCH', credential);
            reset();
            toast.success(res.data.message, { position: 'top-center' })
        } catch (error) {
            const err = error as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                if (err.response?.status !== 201) {
                    toast.error(err.response?.data.message, { position: 'top-center' })
                }
            }
            else {
                toast.error('Server is down. Please try again!', { position: 'top-center' })
            }
        }
    };
    useOnClickOutside(ref, handleOutsideClick);
    const password = watch('password');
    return (
        <>
            {!showEdit ?
                <div ref={ref} className={
                    clsx('px-5 flex flex-col border-t border-b py-5 hover:bg-slate-50 hover:cursor-pointer',
                        clickCount && ' border-blue-500')}
                    onClick={(e) => handleClick(e)}
                >
                    <div className='flex justify-between items-center'>
                        <p>{label}</p>
                        <div className='flex justify-between items-center text-gray-500'>
                            <PencilIcon className='w-3 ' />
                            <p className=' ml-1 text-sm '>Edit</p>
                        </div>
                    </div>
                    <p className='text-gray-500 pt-3' >************</p>
                </div>
                : <div ref={ref} className=' bg-gray-100 py-5' >
                    <div className=' px-5'>
                        <p className='mb-5'>{label}</p>
                        <div className='flex justify-center '>
                            <form onSubmit={handleSubmit(onSubmit)} className='w-80 '>
                                <div className="space-y-4">
                                    <div className='relative'>
                                        <input  {...register('oldPassword', {
                                            required: 'Old password is required',
                                        })}
                                            type={oldPasswordShow ? "text" : "password"} placeholder="Old Password" name='oldPassword'
                                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none bg-white" />
                                        {
                                            oldPasswordShow ?
                                                <i onClick={toggleOldPasswordShow} className='hover:cursor-pointer absolute top-[30%] right-4' >
                                                    <EyeIcon className='w-5 text-gray-500' />
                                                </i>
                                                : <i onClick={toggleOldPasswordShow} className='hover:cursor-pointer absolute top-[30%] right-4'  >
                                                    <EyeSlashIcon className='w-5 text-gray-500' />
                                                </i>
                                        }
                                        <p className='text-red-500 text-sm mb-4'>{errors.oldPassword?.message}</p>
                                    </div>
                                    <div className='relative'>
                                        <input   {...register('password', {
                                            required: 'Password is required',
                                            minLength: {
                                                value: 4,
                                                message: "Password must be more than 4 characters"
                                            },
                                            maxLength: {
                                                value: 15,
                                                message: "Password must be more than 15s characters"
                                            }
                                        })}
                                            type={passwordShow ? "text" : "password"}
                                            placeholder="New Password "
                                            name='password'
                                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none bg-white " />
                                        {
                                            passwordShow ?
                                                <i onClick={togglePasswordVisiblity} className='hover:cursor-pointer absolute top-[30%] right-4' >
                                                    <EyeIcon className='w-5 text-gray-500' />
                                                </i>
                                                : <i onClick={togglePasswordVisiblity} className='hover:cursor-pointer absolute top-[30%] right-4'  >
                                                    <EyeSlashIcon className='w-5 text-gray-500' />
                                                </i>
                                        }
                                        <p className='text-red-500 text-sm mb-4'>{errors.password?.message}</p>
                                    </div>
                                    <div className='relative'>
                                        <input  {...register('confirmPassword', {
                                            required: 'Confirm Password is required',
                                            validate: (value) => value === password || 'Passwords do not match',
                                        })}
                                            type={confirmPasswordShow ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            name="confirmPassword"
                                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none bg-white"
                                        />
                                        {
                                            confirmPasswordShow ?
                                                <i onClick={togglePasswordConfirm} className='hover:cursor-pointer absolute top-[30%] right-4' >
                                                    <EyeIcon className='w-5 text-gray-500' />
                                                </i>
                                                : <i onClick={togglePasswordConfirm} className='hover:cursor-pointer absolute top-[30%] right-4'  >
                                                    <EyeSlashIcon className='w-5 text-gray-500' />
                                                </i>
                                        }
                                        <p className="text-red-500 text-sm mb-4">{errors.confirmPassword?.message}</p>
                                    </div>
                                </div>
                                <div className="text-center my-6">
                                    <div className='mt-5 flex justify-end h-6 items-center' >
                                        <button type='submit' className='bg-green-500 px-3 py-1 border rounded-md mr-2 opacity-90 hover:opacity-100'
                                        >
                                            Change Password
                                        </button>
                                        <button className=' px-3 py-1 border rounded-md bg-gray-400 opacity-90 hover:opacity-100 '
                                            onClick={(e) => handleShowEdit(e)}
                                        >
                                            Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </>
    );
};

export default FormChangePassword;



