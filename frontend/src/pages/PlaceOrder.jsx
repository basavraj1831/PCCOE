import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { currency } from '../../../admin/src/App'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, setTriggerProduct } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment Done',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay', response, {headers:{token}});
          console.log(data);
          if (data.success) {
            setCartItems({})
            navigate('/orders')
          }
        } catch (error) {
          toast.error(error,{
            className:'toast-custom'
          })
        }
      }
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for(const items in cartItems) {
          if (cartItems[items]> 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.quantity = cartItems[items];
              orderItems.push(itemInfo);
            }
          }
        
      }

      let orderData = {
        address:formData,
        items:orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData, {headers:{token}});
          if (response.data.success) {
            toast.success(response.data.message,{
              className:'toast-custom'
            });
            setTriggerProduct(true);
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message,{
              className:'toast-custom'
            });
          }
          break;

        // case 'razorpay':
        //   const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay',orderData, {headers:{token}});
        //   if (responseRazorpay.data.success) {
        //     initPay(responseRazorpay.data.order);
        //   }

        //   break;

        default:
          break;
      }

    } catch (error) {
      toast.error(error.message,{
        className:'toast-custom'
      });
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-3xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type='text' placeholder='First Name' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type='text' placeholder='Last Name' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
        </div>
        <input required onChange={onChangeHandler}  name='email' value={formData.email} type='email' placeholder='Email Address' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
        <input required onChange={onChangeHandler} name='street' value={formData.street} type='text' placeholder='Street Address' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='city' value={formData.city} type='text' placeholder='City' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type='text' placeholder='State' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type='number' placeholder='Zipcode' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type='text' placeholder='Country' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
        </div>
        <input required onChange={onChangeHandler} name='phone' value={formData.phone} type='number' placeholder='Phone' className='w-full py-1.5 px-3.5 border rounded border-gray-300' />
      </div>
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'> 
          {/* <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=> setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-500' : ''}`}></p>
              <img src={assets.razorpay_logo} className='h-5 mx-4'/>
            </div>
            <div onClick={()=> setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className='text-gray-500 text-base font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>  */}
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-cyan-600 text-white text-base px-16 py-3'>
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder