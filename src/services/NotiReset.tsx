import React from 'react'
import { Link } from 'react-router-dom';



const NotiReset: React.FC = () => {

    return (
        <div className="min-h-screen bg-purple-400 flex justify-center items-center fixed top-0 right-0 w-full">
            <div className="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block">
            </div>
            <div className="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block">
            </div>
            <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
                <div>
                    <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">Change password </h1>
                    <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
                        Make sure there are at least 4 characters OR a maximum of 8 characters including numbers and lowercase letters.</p>
                </div>
                <div>
                    <div className=' flex items-center justify-center bg-green-200 '>
                        <p className='w-80 text-center text-sm p-4 font-semibold text-gray-700 tracking-wide cursor-pointer '>
                            New password updated successfully
                        </p>
                    </div>
                    <div className="text-center mt-6">
                        <button type='submit' className="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl hover:bg-purple-500">
                            <Link to='/login'>Login now</Link>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"></div>
            <div
                className="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block">
            </div>
        </div>
    );
};

export default NotiReset;



