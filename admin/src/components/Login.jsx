import React, { useState } from 'react'
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin',{email, password});
            if (response.data.success) {
              setToken(response.data.token);
            } else {
             toast.error(response.data.message) 
            }
        } catch (error) {
            toast.error(error.message) 
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center w-full '>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-base font-medium mb-2 text-gray-700'>Email Address</p>
                <input onChange={(e)=> setEmail(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='email' placeholder='admin@gmail.com' required />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-base font-medium mb-2 text-gray-700'>Password</p>
                <input onChange={(e)=> setPassword(e.target.value)} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type='password' placeholder='Enter password' required />
            </div>
            <button type='submit' className='mt-2 w-full text-lg py-2 px-4 rounded-md text-white bg-cyan-400'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login