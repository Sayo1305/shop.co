/** @format */
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const DressStyleCom = () => {
   const router = useRouter();
   return (
      <div className="w-full mx-auto sm:px-16 px-7">
         <div className="w-full bg-[#F0F0F0] rounded-2xl p-5">
            <div className="text-center w-full sm:text-4xl text-2xl my-5 font-bold">BROWSE BY CATEGORY</div>
            <div className="flex w-full flex-col sm:flex-row gap-5 justify-center">
               <div className="sm:w-2/5 w-full cursor-pointer relative" onClick={()=>{router.push('/shop/search?topic=watches')}}>
                  <Image
                     src={"/images/watch.jpg"}
                     className="w-full rounded-2xl object-contain object-right bg-white h-[40vh]"
                     unoptimized
                     alt="dress"
                     width={100}
                     height={100}
                  />
                  <div className="absolute font-medium text-4xl top-5 left-5">Casual</div>
               </div>
               <div className="sm:w-3/5 w-full cursor-pointer relative" onClick={()=>{router.push('/shop/search?topic=shirts')}}>
                  <Image
                     src={"/images/dress_2.png"}
                     unoptimized
                     className="w-full rounded-2xl h-[40vh] object-cover"
                     alt="dress"
                     width={100}
                     height={100}
                  />
                  <div className="absolute font-medium text-4xl top-5 left-5">Formal</div>
               </div>
            </div>
            <div className="flex mt-5 flex-col sm:flex-row w-full gap-5 justify-center">
               <div className="sm:w-3/5 w-full relative">
                  <Image
                     src={"/images/dress_3.png"}
                     className="w-full rounded-2xl object-cover h-[40vh]"
                     unoptimized
                     alt="dress"
                     width={100}
                     height={100}
                  />
                  <div className="absolute font-medium text-4xl top-5 left-5">Gym</div>
               </div>
               <div className="sm:w-2/5 w-full relative">
                  <Image
                     src={"/images/dress_4.png"}
                     unoptimized
                     className="w-full rounded-2xl h-[40vh] object-cover"
                     alt="dress"
                     width={100}
                     height={100}
                  />
                  <div className="absolute font-medium text-4xl top-5 left-5">Party</div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DressStyleCom;
