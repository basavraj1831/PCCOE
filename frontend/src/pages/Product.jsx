import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct from "../components/RelatedProduct";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, triggerProduct, getProductsData } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(false);
  // const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    if(triggerProduct) {
      getProductsData();
    }
  }, [productId, products, triggerProduct]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => {
              return (
                <img
                  key={index}
                  src={item}
                  className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                  onClick={() => setImage(item)}
                />
              );
              })
            }
          </div>
          <div className="w-full sm:w-[79%]">
            <img src={image} className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl md:text-3xl mt-7">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5"/>
            <img src={assets.star_icon} className="w-3 5"/>
            <img src={assets.star_icon} className="w-3 5"/>
            <img src={assets.star_icon} className="w-3 5"/>
            <img src={assets.star_dull_icon} className="w-3 5"/>
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium flex items-center"><span>{productData.price}</span>{currency}</p>
          <p className="mt-5 text-xl text-gray-500 md:w-4/5">{productData.description}</p>
          {/* <div className="flex flex-col gap-4 my-10 ">
            <p className="text-lg ">Select Size</p>
            <div className="flex gap-2">
               {
                productData.sizes.map((item, index) => (
                  <button onClick={()=> setSize(item)} className={`text-base border py-2 px-4 bg-gray-100 ${item === size ? 'border-cyan-500':''}`} key={index}>{item}</button>
                ))
               }
            </div>
          </div> */}
          <div className="flex flex-col gap-4 my-10 ">
            <p className="text-lg ">Stock Available : </p>
            <span className="bg-cyan-300 text-base border py-2 px-4 w-12 h-12 items-center text-lg">{productData.quantity}</span>
          </div>
          <button onClick={()=> addToCart(productData._id)} type="button"className="bg-cyan-600 text-white px-8 py-3 text-base active:bg-cyan-800 ">ADD TO CART</button> 
          <hr className="mt-10 sm:w-4/5"/>
          <div className="text-base text-gray-500 mt-8 flex flex-col gap-1">
               <p>100% Original product.</p>
               <p>Cash on delivery is availabe on this product.</p>
               <p>Easy return exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-lg">Description</b>
          <p className="border px-5 py-3 text-lg">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-base text-gray-500 ">
          <p>This will help avoid runtime errors and provide better documentation for your components expected props.There is new conversation video launch between Gautom Gambhir sir and Virat the run machine Kohli...
          So Guys after much MASALA moments let us listen journey of both telling by one another and I watch this video it is so nice So I tell everyone who is interested in cricket please watch this video online stream whoever want to download.</p>
          <p>You can use PropTypes to define the expected types for your props. Heres how you can add prop validation to your ProductItem component</p>
        </div>
      </div>
      <RelatedProduct category={productData.category} subcategory={productData.subcategory} />
    </div>
  ) : 
    <div className="opacity-0"></div>
};

export default Product;
