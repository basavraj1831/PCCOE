import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='text-lg'>
      <div className='text-center text-3xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img src={assets.contact_img} className='w-full md:max-w-[480px]' alt=''/>
        <div className='flex flex-col gap-6 justify-center items-start'>
          <p className='text-xl font-semibold text-gray-600'>Our Store</p>
          <p className='text-gray-500'>26 Akurdi Station <br/> Sector 26, Nigdi, India</p>
          <p className='text-gray-500'>Tel: (91) 721-8363-591 <br/> Email: pccoepune.org</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at PCCOE</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4  hover:bg-cyan-600 hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
