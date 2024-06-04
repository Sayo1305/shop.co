/** @format */

"use client";
import Navbar from "@/components/navbar";
import { SearchOutlined } from "@ant-design/icons";
import { AutoComplete, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
   const [suggestions, setSuggestions] = useState([
      "Shirts",
      "Shoes",
      "Watches",
      "Pants",
      "Hats",
      "Socks",
      "Bags",
   ]);
   const [searchText, setSearchText] = useState("");
   const router = useRouter();
   const handleSearch = (value: string) => {
      setSearchText(value);
      // Optionally, filter suggestions based on the input
      setSuggestions(
         suggestions.filter((suggestion) => suggestion.toLowerCase().includes(value.toLowerCase()))
      );
   };

   return (
      <section className="w-full h-screen">
         <Navbar />
         <div className="w-full h-[1px] bg-black mb-3"></div>
         <div className="w-full flex flex-col gap-3 items-center justify-between px-5">
            <AutoComplete
               options={suggestions.map((suggestion) => ({ value: suggestion }))}
               style={{ width: "100%" }}
               onSearch={handleSearch}
               value={searchText}
               onChange={setSearchText}
            >
               <Input
                  
                  suffix={<SearchOutlined onClick={() => {
                        if(searchText !== "")
                        router.push(`/shop/search?topic=${searchText}`);
                     }}/>}
                  placeholder="Search for products"
               />
            </AutoComplete>
            {/* Suggestion List */}
            <div className="w-full flex flex-wrap gap-2 mt-2">
               {suggestions.map((suggestion) => (
                  <div
                     key={suggestion}
                     className="px-3 py-1 bg-gray-200 flex items-center gap-2  font_montserrat_custom text-sm rounded-full cursor-pointer"
                     onClick={() => setSearchText(suggestion)}
                  >
                     <Image
                        className="w-5 h-5"
                        unoptimized
                        width={100}
                        height={100}
                        src={"/images/bulb.png"}
                        alt="idea"
                     />
                     {suggestion}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
};

export default page;
