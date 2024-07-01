"use client";
import { ProfileOutlined, SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Avatar, Input } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";
import { AutoComplete } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const Navbar = (): React.JSX.Element => {
   const [search, setSearch] = useState<string>("");
   const { data: session, status } = useSession() as any;
   const router = useRouter();

   interface Item {
      title: string;
      category: string;
   }

   const items: Item[] = [
      { title: "Watches", category: "Casual" },
      { title: "Shoes", category: "Casual" },
      { title: "Watches", category: "Boys" },
      { title: "Shirts", category: "Boys" },
      { title: "Laptops", category: "Electronics" },
      { title: "Mobiles", category: "Electronics" },
      // Add more items here
   ];
   const options = items.map((option) => {
      return {
         categories: option.category,
         ...option,
      };
   });
   const handleKeyPress = (event: any) => {
      router.push(`/shop/search?topic=${search}`);
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
            <div className="md:flex font_montserrat_custom  font-medium  hidden gap-5 text-sm items-center">
               <div>shop</div>
               <div>On Sale</div>
               <div>New Arrivals</div>
               <div>Brands</div>
            </div>
            <div className="md:w-1/3 sm:flex sm:w-1/2 relative hidden ">
               <Autocomplete
                  id="grouped-demo"
                  onChange={(e, value) => {
                     setSearch(value?.title || "");
                  }}
                  options={options.sort((a, b) => -b.category.localeCompare(a.category))}
                  groupBy={(option) => option.category}
                  getOptionLabel={(option) => option.title}
                  sx={{ width: 300 }}
                  className="!bg-[#F0F0F0] !text-lg sm:!flex !hidden !w-full hover:!border-none !shadow-none hover:!shadow-none hover:!bg-[#F0F0F0] !border-none focus:!border-none !outline-none"
                  renderInput={(params) => (
                     <TextField
                        onChange={(e) => {
                           setSearch(e.target.value);
                        }}
                        {...params}
                        variant="outlined"
                        size="small"
                        label="Search items"
                     />
                  )}
               />
               <SearchOutlined
                  onClick={(e) => {
                     if (search !== "") handleKeyPress(e);
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
                  className="cursor-pointer"
                  onClick={() => {
                     if (session?.user) {
                        router.push("/shop/profile");
                     } else {
                        router.push("/login");
                     }
                  }}
                  src={
                     session
                        ? session?.user?.profile_pic_url
                        : "https://res.cloudinary.com/dqpirrbuh/image/upload/v1700517682/blank-profile-picture_b84iuc.png"
                  }
               />
            </div>
         </div>
      </>
   );
};

export default Navbar;
