import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({category,subcategory}) => {

    const {products} =useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{
       if (products.length > 0) {
        let relProductsCopy = products.slice();
        relProductsCopy = products.filter((product) => product.category === category && product.subcategory === subcategory);
        setRelated(relProductsCopy.slice(0,5));
       }
    },[])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                related.map((item,index)=>(
                    <ProductItem key={index} product={item} />
                ))
            }
        </div>
    </div>
  )
}

export default RelatedProduct
