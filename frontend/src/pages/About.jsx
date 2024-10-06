import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="text-lg">
      <div className="text-3xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          Welcome to PCCOE Store! We specialize in delivering high-quality computers, laptops, and accessories tailored to meet your technological needs. Our dedicated team is committed to providing exceptional customer service, ensuring a seamless shopping experience from start to finish.
          </p>
          <p>
            Since our inception, weve worked tirelessly to curate a diverse
            selection. Welcome to our website! We specialize in delivering
            high-quality products and services tailored to meet your needs. Our
            dedicated team is committed to providing exceptional customer
            service, ensuring a seamless experience from start to finish.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
          At PCCOE Store, our mission is to empower customers with innovative technology, offering a wide selection of products for both personal and professional use. We aim to provide convenience, choice, and exceptional value in every purchase.
          </p>
        </div>
      </div>
      <div className=" text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-base mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>

          <p className="text-gray-600">
          At PCCOE Store, quality assurance is a top priority. We carefully select and test each product to ensure it meets the highest industry standards. Our commitment to excellence guarantees that every purchase you make is reliable, durable, and designed for peak performance.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>

          <p className="text-gray-600">
          At PCCOE Store, we prioritize your convenience by offering a seamless shopping experience, from easy navigation on our website to fast and reliable delivery services. Our user-friendly platform ensures that you can find and purchase the products you need effortlessly, with dedicated support always ready to assist you.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>

          <p className="text-gray-600">
          At PCCOE Store, exceptional customer service is at the heart of everything we do. Our team is dedicated to addressing your questions and concerns promptly, ensuring a smooth and satisfying experience from the moment you browse to the time your product arrives. We're here to support you every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
