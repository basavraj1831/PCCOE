import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const {products, currency, cartItems, updateQuantity, navigate, getCartAmount} = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData =[];
    for(const items in cartItems){
        if (cartItems[items] > 0) {
        tempData.push({_id:items,  quantity:cartItems[items]})
        }
    }
    setCartData(tempData);
  },[cartItems])


  return (
    <div className='border-t pt-14'>
      <div className='text-3xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'}/>
      </div>
      <div>
        {
          cartData.map((item,index)=>{
            const productData = products.find((product)=>product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} alt={productData.imageAlt} className='w-16 sm:w-20'/>
                  <div>
                    <p className='text-base sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p className='flex items-center'><span>{productData.price}</span>{currency}</p>
                      {/* <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>  */}
                    </div>
                  </div>
                </div>
                <input onChange={(e)=> updateQuantity(item._id, Number(e.target.value))} value={item.quantity} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 ' type='number' min={1} defaultValue={item.quantity} />
                <img onClick={()=> updateQuantity(item._id, 0)} src={assets.bin_icon} className='w-4 mr-4 sm:w-5 cursor-pointer' />
              </div>
            )
          })
        }
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={()=> getCartAmount()> 0 ? navigate('/place-order') : ''} className='bg-cyan-600 text-white text-base my-8 px-8 py-3'>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
