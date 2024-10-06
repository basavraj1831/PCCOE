import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,200px)] sm:w-[max(10%,250px)]' src={assets.logo} alt=''/>
      <button onClick={()=> setToken('')} className='bg-cyan-400 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-base sm:text-lg'>Logout</button>
    </div>
  )
}

export default Navbar
