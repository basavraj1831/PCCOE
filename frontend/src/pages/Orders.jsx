import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [totalOrderAmount, setTotalOrderAmount] = useState(0);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      
      if (response.data.success ) {
        let allOrdersItem = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            item["orderId"] = order._id;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message, {
          className: "toast-custom",
        });
      }
    

  const totalAmountResponse = await axios.post(backendUrl + '/api/order/totalOrderAmount',{},{headers: {token}});
  console.log(totalAmountResponse);
  if (totalAmountResponse.data.success) {
    setTotalOrderAmount(totalAmountResponse.data.total);
  } else {
    toast.error(totalAmountResponse.data.message, {
      className: "toast-custom",
    });
  }
}catch (error) {
    toast.error(error.message, {
      className: "toast-custom",
    });
  }


};

  useEffect(() => {
    loadOrderData();
  }, [token]);

  let lastOrderId = null;

  return (
    <div className="border-t pt-16 ">
      <div className="text-3xl flex items-center justify-between">
        <Title text1={"MY"} text2={"ORDERS"} />
        <h2 className="text-xl font-semibold flex items-center">
        Total Order Amount:&nbsp;&nbsp;<span>{totalOrderAmount}</span>{currency}
      </h2>
      </div>  
      <div>
      
        {orderData.map((item, index) => {
          const showTrackButton = lastOrderId !== item.orderId;
          lastOrderId = item.orderId;

          return (
            <div
              key={index}
              className={`py-4 text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                showTrackButton ? "border-t" : ""
              }`}
            >
              <div className="flex items-start gap-6 text-base">
                <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
                <div>
                  <p className="sm:text-lg font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-gray-700 text-lg">
                    <p className="flex items-center">
                      <span>{item.price}</span>
                      {currency}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    {/* <p>Size: {item.size}</p> */}
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  {/* <p className="mt-1">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p> */}
                </div>
              </div>

              {showTrackButton && (
                <div className=" md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-base md:text-lg">{item.status}</p>
                  </div>
                  <button
                    onClick={loadOrderData}
                    className="border px-4 py-2 text-base font-medium rounded-sm"
                  >
                    Track Order
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
