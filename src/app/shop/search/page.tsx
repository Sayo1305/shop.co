/** @format */
"use client";
import Navbar from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import { Breadcrumb, Skeleton, Slider } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import { FilterOutlined } from "@ant-design/icons";
import Footer from "@/components/footer";

const page = () => {
   const router = useRouter();
   const searchParams = useSearchParams();

   const search = searchParams.get("topic");
   return (
      <section>
         <Navbar />
         {/* beradcrimbs */}
         <div className="px-16">
            <Breadcrumb
               items={[
                  {
                     title: "Home",
                  },
                  {
                     title: `${search}`,
                  },
               ]}
            />
         </div>

         <div className="px-16 flex items-start gap-5 mt-5 justify-between">
            <div className="w-3/12">
               <div className="p-3 rounded-xl border">
                  <div className="w-full flex items-center justify-between">
                     <div>Filters</div>
                     <div>
                        <FilterOutlined />
                     </div>
                  </div>
                  <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                  <div>Price</div>
                  <Slider
                     className="!text-black "
                     range
                     defaultValue={[20, 50]}
                  />
                  <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                  <div>Colors</div>
                  <div className="grid grid-cols-5 gap-2 my-3">
                     <div className="w-7 h-7 border-[1.5px] border-black rounded-full bg-red-500"></div>
                     <div className="w-7 h-7 border-[1.5px] border-black rounded-full bg-blue-500"></div>
                     <div className="w-7 h-7 border-[1.5px] border-black rounded-full bg-green-500"></div>
                     <div className="w-7 h-7 border-[1.5px] border-black rounded-full bg-yellow-500"></div>
                     <div className="w-7 h-7 border-[1.5px] border-black rounded-full bg-purple-500"></div>
                     <div className="w-7 h-7 border-[1.5px] border-black rounded-full bg-pink-400"></div>
                  </div>
                  <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                  <div>Size</div>
                  <div className="flex my-2 flex-wrap gap-3 items-center">
                     <div
                        className={`bg-gray-200 border-[1.5px] border-black rounded-lg p-1 px-3 text-xs`}
                     >
                        S
                     </div>
                     <div
                        className={`bg-gray-200 border-[1.5px] border-black rounded-lg p-1 px-3 text-xs`}
                     >
                        M
                     </div>
                     <div
                        className={`bg-gray-200 border-[1.5px] border-black rounded-lg p-1 px-3 text-xs`}
                     >
                        L
                     </div>
                     <div
                        className={`bg-gray-200 border-[1.5px] border-black rounded-lg p-1 px-3 text-xs`}
                     >
                        XL
                     </div>
                  </div>
                  <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                  <button className="w-full rounded-lg bg-black text-white p-2">
                     Apply filters
                  </button>
               </div>
            </div>
            <div className="w-9/12">
               <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{search}</div>
                  <div className="text-[#9F9F9F] text-xs">showing 1 - 10 of 100 products</div>
               </div>

               <div className="grid my-10 gap-10 grid-cols-3 animate-pulse duration-75 ease-in-out">
                  <div className="w-[300px] rounded-lg h-[300px] bg-gray-200">
                  </div>
                  <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                  <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                  <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                  <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
               </div>
            </div>
         </div>

         <Footer/>
      </section>
   );
};

export default page;
