/** @format */

"use client";
import { ProfileOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Navbar = (): React.JSX.Element => {
   const [search, setSearch] = useState<string>("");
   const router = useRouter();
   const handleKeyPress = (event: any) => {
      if (event.key === "Enter") {
         router.push(`/shop/search?topic=${search}`);
      }
   };
   return (
      <>
         <div className="w-full bg-black py-1 text-center text-white text-xs">
            Sign up and get 20% off to your frst order.
         </div>
         <div className="w-full flex items-center justify-between sm:px-16 px-5 py-7">
            <div
               onClick={() => {
                  router.push("/");
               }}
               className="text-3xl cursor-pointer try font-extrabold"
            >
               SHOP.CO
            </div>
            <div className="md:flex  hidden gap-5 text-sm items-center">
               <div>shop</div>
               <div>On Sale</div>
               <div>New Arrivals</div>
               <div>Brands</div>
            </div>
            <div className="md:w-1/3 sm:w-1/2 sm:block hidden ">
               <Input
                  onKeyPress={handleKeyPress}
                  onChange={(e) => {
                     setSearch(e.target.value);
                  }}
                  value={search}
                  size="large"
                  prefix={<SearchOutlined className="text-lg px-2" />}
                  placeholder="search for product"
                  className="!bg-[#F0F0F0] text-lg sm:flex hidden w-full hover:!border-none !shadow-none hover:!shadow-none hover:!bg-[#F0F0F0] !border-none focus:!border-none outline-none !rounded-3xl p-2"
               />
            </div>
            <div className="flex items-center text-xl gap-5">
               <SearchOutlined onClick={()=>{router.push('/search')}} className="flex sm:!hidden" />
               <ShoppingCartOutlined />
               <Avatar />
            </div>
         </div>
      </>
   );
};

export default Navbar;
