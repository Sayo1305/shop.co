/** @format */

import {
   FacebookOutlined,
   GithubOutlined,
   InstagramOutlined,
   MailOutlined,
   TwitterCircleFilled,
} from "@ant-design/icons";
import { Input } from "antd";
import React from "react";

const Footer = () => {
   return (
      <div className="w-full sm:px-16 px-7 mt-36 py-10 bg-[#F0F0F0]">
         <div className="sm:px-16 bg-black relative -top-24 text-white flex md:gap-0 gap-5  md:flex-row flex-col justify-between items-center rounded-2xl p-10">
            <div className="font-bold md:w-1/2 w-full md:text-4xl sm:text-3xl text-xl">
               <div>STAY UPTO DATE ABOUT</div>
               <div>OUR LATEST OFFERS</div>
            </div>
            <div className="md:w-1/2 w-full flex flex-col gap-4">
               <Input
                  size="large"
                  prefix={<MailOutlined />}
                  className="!border-none !px-5 sm:!py-3 hover:!border-none !shadow-none hover:!shadow-none !rounded-3xl"
               />
               <button className="w-full bg-[#FFFFFF] sm:py-3 py-2 text-center rounded-3xl text-black">
                  Subscribe to newsletter
               </button>
            </div>
         </div>
         <div className="block md:hidden mb-5">
               <div className="font-bold text-3xl mb-5">SHOP.CO</div>
               <div className="text-xs text-gray-500 mb-7">
                  We have clothes that suits your styles and which you're proud to wear.
               </div>
               <div className="flex gap-5">
                  <TwitterCircleFilled className="text-2xl" />
                  <FacebookOutlined className="text-2xl" />
                  <InstagramOutlined className="text-2xl" />
                  <GithubOutlined className="text-2xl" />
               </div>
            </div>
         <div className="w-full grid md:grid-cols-5 grid-cols-2 md:gap-0 gap-5 justify-items-center items-center">
            <div className="md:block hidden">
               <div className="font-bold text-3xl mb-5">SHOP.CO</div>
               <div className="text-xs text-gray-500 mb-7">
                  We have clothes that suits your styles and which you're proud to wear.
               </div>
               <div className="flex gap-5">
                  <TwitterCircleFilled className="text-2xl" />
                  <FacebookOutlined className="text-2xl" />
                  <InstagramOutlined className="text-2xl" />
                  <GithubOutlined className="text-2xl" />
               </div>
            </div>
            <div className="w-full flex flex-col justify-center md:items-center">
               <div className="mb-4 font-medium">COMPANY</div>
               <div className="text-gray-400 font-extralight">About </div>
               <div className="text-gray-400 font-extralight">Feature</div>
               <div className="text-gray-400 font-extralight">work</div>
               <div className="text-gray-400 font-extralight">Career</div>
            </div>
            <div className="w-full flex flex-col justify-center md:items-center">
               <div className="mb-4 font-medium">HELP</div>
               <div className="text-gray-400 font-extralight">Customer Support </div>
               <div className="text-gray-400 font-extralight">Delivery details</div>
               <div className="text-gray-400 font-extralight">terms & Conditions</div>
               <div className="text-gray-400 font-extralight">Privacy Policy</div>
            </div>
            <div className="w-full flex flex-col justify-center md:items-center">
               <div className="mb-4 font-medium">FAQ</div>
               <div className="text-gray-400 font-extralight">Account </div>
               <div className="text-gray-400 font-extralight">Manage Deliveries</div>
               <div className="text-gray-400 font-extralight">Orders</div>
               <div className="text-gray-400 font-extralight">Payments</div>
            </div>
            <div className="w-full flex flex-col justify-center md:items-center">
               <div className="mb-4 font-medium">RESOURCES</div>
               <div className="text-gray-400 font-extralight">Free eBooks </div>
               <div className="text-gray-400 font-extralight">Development Tutorials</div>
               <div className="text-gray-400 font-extralight">How to blogs </div>
               <div className="text-gray-400 font-extralight">Youtube Playlists</div>
            </div>
         </div>
         <div className="w-full h-[0.5px] bg-gray-500 my-10"></div>
         <div>
            <div className="text-xs text-gray-500">SHOP.CO createdby@Unnat</div>
         </div>
      </div>
   );
};

export default Footer;
