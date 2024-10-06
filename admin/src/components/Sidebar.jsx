import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { FiList, FiTruck } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { TbTruckDelivery } from "react-icons/tb";
import { useState } from "react";

const Sidebar = ({ setShowEdit, showEdit }) => {
  return (
    <div className="w-[18%] md:w-[25%] lg:w-[18%]  min-h-screen border-r-2 ">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        {showEdit ? (
          <NavLink
            to="/edit"
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <FiPlusCircle className="w-5 h-5" />
            <p className="hidden md:block text-xl">Edit Items</p>
          </NavLink>
        ) : (
          <NavLink
            to="/add"
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <FiPlusCircle className="w-5 h-5" />
            <p className="hidden md:block text-xl">Add Items</p>
          </NavLink>
        )}

        <NavLink
          to="/list"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <FiList className="w-5 h-5" />
          <p className="hidden md:block text-xl">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
        >
          <FiTruck className="w-5 h-5" />
          <p className="hidden md:block text-xl">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
