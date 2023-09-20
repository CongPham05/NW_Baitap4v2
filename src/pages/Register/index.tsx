import React, { SyntheticEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/selectors';
import { registerUser } from '../../redux/apiRequest';
import { resetMessage } from '../../redux/authSlice';


const Register: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(authSelector);
    const [credentials, setCredentials] = useState({
        userName: null,
        email: null,
        password: null,
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        registerUser(credentials, dispatch, navigate)
    }
    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])
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
                <form onSubmit={submit}>
                    <div className="space-y-4">
                        <input type="text" placeholder="Name" required id='userName' className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            onChange={handleChange} />
                        <input type="email" placeholder="Email" required id='email' className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            onChange={handleChange} />
                        <input type="text" placeholder="Password" required id='password' className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
                            onChange={handleChange} />
                    </div>
                    <div className="text-center mt-6">
                        <p className=' text-red-500 text-sm mb-4'> {auth.register.errorMessage}</p>
                        <button type='submit' className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
                        >Create Account</button>
                        <p className="mt-4 text-sm">Already Have An Account? <span className="underline cursor-pointer">
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



