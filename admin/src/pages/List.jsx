import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdDelete, MdEdit } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const List = ({ token, setShowEdit }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      }
    } catch (error) {
      toast.error(error.message, {
        className: 'toast-custom',
      });
    }
  };

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message, {
          className: 'toast-custom',
        });
        await fetchList();
      }
    } catch (error) {
      toast.error(error.message, {
        className: 'toast-custom',
      });
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleEditClick = (id) => {
    setShowEdit(true);
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <p className='mb-2 text-xl font-semibold'>All Products List</p>
      <div className='overflow-x-auto w-full'>
        <div className='min-w-[600px] md:min-w-0 grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-base'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {
          list.map((item, index) => (
            <div
              className='min-w-[600px] md:min-w-0 grid grid-cols-[1fr_3fr_2fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-lg'
              key={index}
            >
              <img src={item.image[0]} className='w-12' alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p className='flex items-center'>
                <span>{item.price}</span>
                {currency}
              </p>
              <div className='flex items-center justify-center gap-2'>
                <button onClick={() => handleEditClick(item._id)} className="flex items-center gap-2">
                  <MdEdit />
                </button>
                <p
                  onClick={() => removeProduct(item._id)}
                  className='text-right md:text-center cursor-pointer text-lg'
                >
                  <MdDelete  />
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
};

export default List;
