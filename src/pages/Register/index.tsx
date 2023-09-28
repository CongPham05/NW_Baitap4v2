import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import { RegisterFormValues } from '../../types';
import requestApi from '../../helpers/api';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [passwordShow, setPasswordShow] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShow(!passwordShow);
    };
    const togglePasswordConfirm = () => {
        setConfirmPasswordShow(!confirmPasswordShow);
    };
    const {
        register, handleSubmit, watch,
        formState: { errors },
    } = useForm<RegisterFormValues>();

    const onSubmit: SubmitHandler<RegisterFormValues> = async (credentials) => {
        const { userName, email, password } = credentials;
        const credential = { userName, email, password };
        try {
            await requestApi('auth/register', 'POST', credential);
            navigate('/login');
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
    const password = watch('password');
    return (
        <div className="min-h-screen bg-purple-400 flex justify-center items-center fixed top-0 right-0 w-full">
            <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
            </div>
            <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
            </div>
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Register</h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">Create an
                        account to enjoy all the services without any ads for free!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <input  {...register('userName', {
                            required: 'Name is required',
                        })}
                            type="text" placeholder="Name" name='userName'
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        <p className='text-red-500 text-sm mb-4'>{errors.userName?.message}</p>

                        <input {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address',
                            },
                        })}
                            type="email" placeholder="Email" name='email'
                            className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                        <p className='text-red-500 text-sm mb-4'>{errors.email?.message}</p>
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
                                placeholder="Password"
                                name='password'
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none " />
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
                                className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
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
                    <div className="text-center mt-6">
                        <button type='submit' className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-500"
                        >Create Account</button>
                        <p className="mt-4 text-sm">Already have an account? <span className="underline cursor-pointer">
                            <Link to='/login'>Sign In.</Link>
                        </span>
                        </p>
                    </div>
                </form>
            </div>
            <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
            <div
                className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
            </div>
        </div>
    );
};

export default Register;



