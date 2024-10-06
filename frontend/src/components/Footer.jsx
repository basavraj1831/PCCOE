import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-base">
        <div>
          <img src={assets.logo} alt="logo" className="w-32 mb-5" />
          <p className="w-full md:w-2/3 text-gray-600">
          PCCOE Store is your go-to destination for high-quality computers, laptops, and accessories. We offer the latest in technology to meet both personal and professional needs. Discover top-rated products designed for performance and reliability.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-721-836-3591</li>
            <li>basavrajbirajdar@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-base text-center">
          © 2024 pccoepune.org - All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
