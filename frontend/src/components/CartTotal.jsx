import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-3xl'>
        <Title text1={'CART'} text2={'TOTAL'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-lg'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p className='flex items-center'><span>{getCartAmount()}</span>{currency}</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p className='flex items-center'><span>{delivery_fee}</span>{currency}</p>
        </div>
        <hr/>
        <div className='flex justify-between'>
            <b>Total</b>
            <b className='flex items-center'><span>{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</span>{currency}</b>
        </div>
      </div>
    </div>
  )
}

export default CartTotal


