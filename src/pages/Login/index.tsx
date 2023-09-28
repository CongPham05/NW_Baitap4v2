import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginFormValues } from '../../types';
import requestApi from '../../helpers/api';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { controlLoading } from '../../redux/reducerSlice/loadingSlice';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [passwordShow, setPasswordShow] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShow(!passwordShow);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit: SubmitHandler<LoginFormValues> = async (credentials) => {
        dispatch(controlLoading(true));
        try {
            const res = await requestApi('auth/login', 'POST', credentials);
            localStorage.setItem('access_token', res.data.tokens.accessToken);
            localStorage.setItem('refresh_token', res.data.tokens.refreshToken);
            localStorage.setItem('inforUser', JSON.stringify(res.data.user));

            dispatch(controlLoading(false));
            navigate('/view/board');
        } catch (error) {
            dispatch(controlLoading(false));
            const err = error as Error | AxiosError;
            if (axios.isAxiosError(err)) {
                if (err.response?.status !== 201) {
                    toast.error(err.response?.data.message, { position: 'top-center' })
                }
                else {
                    toast.error('Server is down. Please try again!', { position: 'top-center' })
                }
            }
            else {
                toast.error('Server is down. Please try again!', { position: 'top-center' })
            }
        }
    };
    return (
        <div className="min-h-screen bg-purple-400 flex justify-center items-center fixed top-0 right-0 w-full">
            <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
            </div>
            <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
            </div>
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Log in</h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        Login to your account now to enjoy all services without any ads for free!</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
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
                        </div>
                        <p className=' text-xs mb-4 underline cursor-pointer'>
                            <Link to='/forgot-password'>Forgot password?</Link>
                        </p>
                        <p className='text-red-500 text-sm mb-4'>{errors.password?.message}</p>
                    </div>
                    <div className="text-center mt-6">
                        <button type='submit' className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-500">Login Now</button>
                        <p className="mt-4 text-sm">Don't have an account? <span className="underline cursor-pointer">
                            <Link to='/register'>Sign Up.</Link>
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

export default Login;



