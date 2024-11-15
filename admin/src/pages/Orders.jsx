import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token, setShowEdit }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {

    setShowEdit(false);

    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message, {
          className: "toast-custom",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        className: "toast-custom",
      });
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId, status: e.target.value}, {headers: {token}});
      if(response.data.success){
        await fetchAllOrders();
      }

    } catch (error) {
      toast.error(error.message, {
        className: "toast-custom",
      })
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-base sm:text-lg text-gray-800"
            key={index}
          >
            <img src={assets.parcel_icon} className="w-12" alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index} className="py-0.5">
                        {item.name} x {item.quantity} <span>{item.size}</span>.{" "}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="py-0.5">
                        {item.name} x {item.quantity} <span>{item.size}</span>,{" "}
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p>Items: {order.items.length}</p>
              <p className="mt-3">Client: {order.email}</p>
              {/* <p>Payment: {order.payment ? "Done" : "Pending"}</p> */}
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="flex items-center">
              <span>{order.amount}</span>
              {currency}
            </p>
            <select onChange={(e)=> statusHandler(e, order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Order placed">Order placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
