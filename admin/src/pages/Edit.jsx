import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ImSpinner10 } from 'react-icons/im';
import { assets } from '../assets/assets';
import { backendUrl } from '../App';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Edit = ({ token, setShowEdit }) => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Computer');
  const [subCategory, setSubCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [bestseller, setBestseller] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(backendUrl + '/api/product/single', { productId });

        const product = response.data;

        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setQuantity(product.quantity);
        setBestseller(product.bestseller);

      } catch (error) {
        toast.error(error.message ,{
            className: 'toast-custom'
        }
        );
      }
    };
    fetchProduct();
  }, [productId]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('productId', productId);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('quantity', quantity);
      formData.append('bestseller', bestseller);

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/edit', formData, {
        headers: { token },
      });
      console.log(response);

      if (response.data.success) {
        toast.success('Product updated successfully', {
            className: 'toast-custom'
        });
        setName('')
        setSubCategory('')
        setDescription('')
        setPrice('')
        setCategory('Computer')
        setQuantity('')
        setBestseller(false)
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
      }
    } catch (error) {
      toast.error(error.message ,{
        className: 'toast-custom'
      });
    } finally {
      setLoading(false);
      setShowEdit(false);
      navigate('/')
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 text-base'>
      <div>
        <p className='mb-2 text-lg'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt=''/>
            <input onChange={(e)=> setImage1(e.target.files[0])} type='file' id='image1' hidden/>
          </label>
          <label htmlFor='image2'>
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt=''/>
            <input onChange={(e)=> setImage2(e.target.files[0])} type='file' id='image2' hidden/>
          </label>
          <label htmlFor='image3'>
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt=''/>
            <input onChange={(e)=> setImage3(e.target.files[0])} type='file' id='image3' hidden/>
          </label>
          <label htmlFor='image4'>
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt=''/>
            <input onChange={(e)=> setImage4(e.target.files[0])} type='file' id='image4' hidden/>
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2 text-lg'>Product Name</p>
        <input onChange={(e)=> setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here'/>
      </div>
      <div className='w-full'>
        <p className='mb-2 text-lg'>Product Subname</p>
        <input onChange={(e)=> setSubCategory(e.target.value)} value={subCategory} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Type here'/>
      </div>
      <div className='w-full'>
        <p className='mb-2 text-lg'>Product Description</p>
        <textarea onChange={(e)=> setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type='text' placeholder='Write content here'/>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-8 w-full'>
        <div>
          <p className='mb-2 text-lg'>Product Department</p>
          <select onChange={(e)=> setCategory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Computer">Computer</option>
            <option value="Information">Information</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </div>
        <div>
          <p className='mb-2 text-lg'>Product Price</p>
          <input onChange={(e)=> setPrice(e.target.value)} value={price} className='w-full sm:w-[120px] px-3 py-2' type='Number' placeholder='25' />
        </div>
        <div>
          <p className='mb-2 text-lg'>Product Quantity</p>
          <input onChange={(e)=> setQuantity(e.target.value)} value={quantity} className='w-full sm:w-[120px] px-3 py-2' type='Number' placeholder='10' />
        </div>
      </div>
      {/* <div>
        <p className='mb-2 text-lg'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={()=> setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
            <p className={`${sizes.includes('S') ? 'bg-cyan-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div onClick={()=> setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
            <p className={`${sizes.includes('M') ? 'bg-cyan-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div onClick={()=> setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
            <p className={`${sizes.includes('L') ? 'bg-cyan-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=> setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`${sizes.includes('XL') ? 'bg-cyan-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=> setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`${sizes.includes('XXL') ? 'bg-cyan-200' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div> */}
      <div className='flex gap-2 mt-2'>
        <input onChange={()=> setBestseller(prev => !prev)} checked={bestseller} type='checkbox' id='bestSeller' />
        <label className='cursor-pointer text-lg' htmlFor='bestSeller'>Add to bestSeller</label>
      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-cyan-600 text-white text-lg'>
        {
          loading ? <ImSpinner10 className='animate-spin text-black m-auto text-2xl font-extrabold'/> : 'UPDATE'
        }
      </button>
    </form>
  );
};

export default Edit;
