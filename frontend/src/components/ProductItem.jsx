import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({product}) => {

    const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${product._id}`} className='text-gray-700 cursor-pointer text-lg'>
        <div className='overflow-hidden'>
            <img src={product.image[0]} alt='' className='hover:scale-110 transition ease-in-out'/>
        </div>
        <p className='pt-3 pb-1'>{product.name}</p>
        <p className='font-medium flex items-center'><span>{product.price}</span>{currency}</p>
    </Link>
  )
}

export default ProductItem;