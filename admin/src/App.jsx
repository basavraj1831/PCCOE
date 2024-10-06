import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Edit from "./pages/Edit";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = <FaIndianRupeeSign/>;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [showEdit , setShowEdit] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
          <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar setShowEdit={setShowEdit} showEdit={showEdit}/>
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/edit/:productId" element={<Edit token={token} setShowEdit={setShowEdit} />} />
                <Route path="/list" element={<List token={token} setShowEdit={setShowEdit}/>} />
                <Route path="/orders" element={<Orders token={token} setShowEdit={setShowEdit} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
