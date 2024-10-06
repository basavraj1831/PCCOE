import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    console.log(name, email, password);
    const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', {
          name,
          email,
          password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(`Welcome ${name}`,{
            className: 'toast-custom'
          })
        } else {
          toast.error(response.data.message,{
            className: 'toast-custom'
          });
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', {
          email,
          password
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success(`Welcome back.!`,{
            className: 'toast-custom'
          })
        } else {
          toast.error(response.data.message,{
            className: 'toast-custom'
          });
        }
      }
    } catch (error) {
      toast.error(error.message,{
        className: 'toast-custom'
      })
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-[30%] m-auto mt-14 gap-4 text-gray-800 text-lg'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>  
      </div> 
      {currentState === 'Login' ? '' : <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' type='text' placeholder='Name' required/>}
      <input onChange={(e)=> setEmail(e.target.value)} value={email} className='w-full px-3 py-2 border border-gray-800' type='email' placeholder='Email' required/>
      <input onChange={(e)=> setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' type='password' placeholder='Password' required/>
      <div className='w-full flex justify-between  mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password.?</p>
        {
          currentState === 'Login' ? 
          <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Create account</p> 
          : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login here</p>
        }
      </div>
      <button className='bg-cyan-600 text-white font-light px-8 py-2 mt-4 '>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
