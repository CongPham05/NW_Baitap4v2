import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginFormValues } from '../../types';
import axios, { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { controlLoading } from '../../redux/reducerSlice/loadingSlice';
import requestApi from '../../helpers/api';

const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>();

    const onSubmit: SubmitHandler<LoginFormValues> = async (credentials) => {
        dispatch(controlLoading(true));
        try {
            const res = await requestApi('auth/forgot-password', 'POST', credentials);
            setMessage(res.data.message);
            dispatch(controlLoading(false));
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
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Forgot Password</h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        Enter your user account's verified email address and we will send you a password reset link!</p>
                </div>
                {
                    !message ?
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div className='relative'>
                                    <input {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                        type="email" placeholder="" name='email'
                                        id="floating_outlined" className="block text-sm py-3 px-4 rounded-lg w-full border outline-none pb-2.5 pt-4 text-gray-900 bg-transparent border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                                    <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                        Email</label>
                                </div>
                                <p className='text-red-500 text-sm mb-4'>{errors.email?.message}</p>
                            </div>

                            <div className="text-center mt-6">
                                <button type='submit' className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-500">Send</button>
                                <p className="mt-4 text-sm">Don't have an account? <span className="underline cursor-pointer">
                                    <Link to='/register'>Sign Up.</Link>
                                </span>
                                </p>
                            </div>

                        </form>
                        : <div className="space-y-4">
                            <div className=' flex items-center justify-center bg-green-200 ' >
                                <p className='w-80 text-center text-sm p-4 font-semibold text-gray-700 tracking-wide cursor-pointer '>
                                    {message}
                                </p>
                            </div>
                            <div className="text-center mt-6">
                                <button type='submit' className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-500">
                                    <Link to='/login'> Return to sign in</Link>
                                </button>
                            </div>
                        </div>
                }
            </div>
            <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
            <div
                className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
            </div>
        </div>
    );
};

export default ForgotPassword;



