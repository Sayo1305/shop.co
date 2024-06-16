/** @format */

"use client";
import { ProfileOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import React, { useState } from "react";
import Link from "next/link";

const Navbar = (): React.JSX.Element => {
   const [search, setSearch] = useState<string>("");
   const router = useRouter();
   const handleKeyPress = (event: any) => {
         router.push(`/shop/search?topic=${search}`);
   };

   const renderTitle = (title: string) => (
      <span>
         {title}
         <Link
            style={{ float: "right" }}
            href={`/shop/search?topic=${title}`}
            rel="noopener noreferrer"
         >
            more
         </Link>
      </span>
   );

   const renderItem = (title: string) => ({
      value: title,
      label: (
         <div
            onClick={() => {
               setSearch(title);
            }}
            style={{
               display: "flex",
               justifyContent: "space-between",
            }}
         >
            {title}
            <span></span>
         </div>
      ),
   });

   const options = [
      {
         label: renderTitle("casual"),
         options: [renderItem("Shoes"), renderItem("watches")],
      },
      {
         label: renderTitle("clothes"),
         options: [renderItem("shirts")],
      },
      // {
      //    label: renderTitle("Articles"),
      //    options: [renderItem("AntDesign design language")],
      // },
   ];
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
            <div className="md:flex font_montserrat_custom  font-medium  hidden gap-5 text-sm items-center">
               <div>shop</div>
               <div>On Sale</div>
               <div>New Arrivals</div>
               <div>Brands</div>
            </div>
            <div className="md:w-1/3 sm:flex sm:w-1/2 relative hidden ">
               <AutoComplete
                  popupClassName="certain-category-search-dropdown"
                  popupMatchSelectWidth={500}
                  style={{ width: 250 }}
                  options={options}
                  className="!bg-[#F0F0F0] !text-lg sm:!flex !hidden !w-full hover:!border-none !shadow-none hover:!shadow-none hover:!bg-[#F0F0F0] !border-none focus:!border-none !outline-none !rounded-s-3xl !p-2"
                  size="large"
               >
                  <Input
                     onKeyPress={handleKeyPress}
                     onChange={(e) => {
                        setSearch(e.target.value);
                     }}
                     value={search}
                     size="large"
                     prefix={<SearchOutlined className="text-lg px-2" />}
                     placeholder="search for product"
                     className="!bg-[#F0F0F0] !text-lg sm:flex hidden !w-full hover:!border-none !shadow-none hover:!shadow-none hover:!bg-[#F0F0F0] !border-none focus:!border-none outline-none !rounded-3xl p-2"
                  />{" "}
               </AutoComplete>
               <SearchOutlined
                  onClick={(e) => {
                     handleKeyPress(e);
                  }}
                  className="sm:!flex hidden bg-gray-300 rounded-e-3xl !p-2 cursor-pointer !px-4"
               />
            </div>
            <div className="flex items-center text-xl gap-5">
               <SearchOutlined
                  onClick={() => {
                     router.push("/search");
                  }}
                  className="flex sm:!hidden"
               />
               <ShoppingCartOutlined />
               <Avatar
                  src={
                     "https://res.cloudinary.com/dqpirrbuh/image/upload/v1700517682/blank-profile-picture_b84iuc.png"
                  }
               />
            </div>
         </div>
      </>
   );
};

export default Navbar;
