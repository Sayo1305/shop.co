/** @format */

"use client";
import CartPage from "@/components/CartPage";
import FavPage from "@/components/FavPage";
import Footer from "@/components/footer";
import EditProfileModal from "@/components/modal/shop/editProfileModal";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";

const page = () => {
   const { data: session, status } = useSession() as any;
   const [selectedTab, setSelectedTab] = useState<string>("profile");
   const [open, setOpen] = useState<boolean>(false);
   return (
      <section>
         <Navbar />
         <section className="w-full flex md:flex-row flex-col h-screen">
            <div className="md:w-3/12 justify-between md:justify-start w-full py-5 flex md:flex-col gap-4 px-5 rounded-xl bg-slate-50">
               <div
                  onClick={() => {
                     setSelectedTab("profile");
                  }}
                  className={`flex w-full items-center  justify-start gap-2 p-2 rounded-md cursor-pointer ${
                     selectedTab === "profile" ? "bg-black text-white" : "hover:bg-slate-200"
                  }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill={selectedTab === "profile" ? "#fff" : "#000"}
                  >
                     <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                  </svg>
                  Profile{" "}
               </div>
               <div
                  onClick={() => {
                     setSelectedTab("cart");
                  }}
                  className={`flex w-full items-center  justify-start gap-2 p-2 rounded-md cursor-pointer ${
                     selectedTab === "cart" ? "bg-black text-white" : "hover:bg-slate-200"
                  }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill={selectedTab === "cart" ? "#fff" : "#000"}
                  >
                     <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                  Cart
               </div>
               <div
                  onClick={() => {
                     setSelectedTab("fav");
                  }}
                  className={`flex w-full items-center  justify-start gap-2 p-2 rounded-md cursor-pointer ${
                     selectedTab === "fav" ? "bg-black text-white" : "hover:bg-slate-200"
                  }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill={selectedTab === "fav" ? "#fff" : "#000"}
                  >
                     <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                  </svg>
                  Favourite
               </div>

               <div
                  onClick={() => {
                     setSelectedTab("fav");
                  }}
                  className={`flex w-full items-center  justify-start text-[#FF0000] gap-2 p-2 rounded-md cursor-pointer ${
                     selectedTab === "out" ? "bg-black text-white" : "hover:bg-red-200 "
                  }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="24px"
                     viewBox="0 -960 960 960"
                     width="24px"
                     fill={selectedTab === "out" ? "#fff" : "#FF0000"}
                  >
                     <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                  Logout
               </div>
            </div>
            <div className="w-full ">
               {selectedTab === "profile" && (
                  <div className="w-full p-5">
                     <div className="md:w-5/6 w-full bg-[#F0F0F0] gap-10 flex items-start  rounded-xl p-5">
                        <div className="relative">
                           <Image
                              className="rounded-full border-2 border-black"
                              src={session?.user?.profile_pic_url || ""}
                              width={100}
                              height={100}
                              alt="icons"
                           />
                           <div
                              onClick={() => {
                                 setOpen(true);
                              }}
                              className="absolute bottom-0 cursor-pointer right-0 border rounded-full p-1 bg-white border-black"
                           >
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 height="15px"
                                 viewBox="0 -960 960 960"
                                 width="15px"
                                 fill="#000"
                              >
                                 <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                              </svg>
                           </div>
                        </div>
                        <div className="">
                           <div className="font-medium font_montserrat_custom">
                              {session?.user?.name}
                           </div>
                           <div className="font_montserrat_custom text-xs">
                              {session?.user?.email}
                           </div>
                        </div>
                     </div>
                     <div className="flex flex-wrap my-10 items-center justify-start gap-5">
                        <div className="flex md:w-[250px] w-full bg-[#F0F0F0] justify-between rounded-lg items-center gap-10">
                           <div className="p-5 flex  gap-5 items-center">
                              <div className="text-5xl font-extrabold">0</div>
                              <div className="font-medium text-lg">Cart</div>
                           </div>
                           <div className="flex items-center px-2 gap-3">
                              <div className="h-[86px] w-[2px] bg-slate-400"></div>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 height="24px"
                                 viewBox="0 -960 960 960"
                                 width="24px"
                                 fill="#5f6368"
                              >
                                 <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                              </svg>
                           </div>
                        </div>
                        <div className="flex md:w-[280px] w-full bg-[#F0F0F0] justify-between rounded-lg items-center gap-10">
                           <div className="p-5 flex  gap-5 items-center">
                              <div className="text-5xl font-extrabold">0</div>
                              <div className="font-medium text-lg">Favourite</div>
                           </div>
                           <div className="flex items-center px-2 gap-3">
                              <div className="h-[86px] w-[2px] bg-slate-400"></div>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 height="24px"
                                 viewBox="0 -960 960 960"
                                 width="24px"
                                 fill="#5f6368"
                              >
                                 <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                              </svg>
                           </div>
                        </div>
                        <div className="flex md:w-[250px] w-full bg-[#F0F0F0] justify-between rounded-lg items-center gap-10">
                           <div className="p-5 flex  gap-5 items-center">
                              <div className="text-5xl font-extrabold">0</div>
                              <div className="font-medium text-lg">orders</div>
                           </div>
                           <div className="flex items-center px-2 gap-3">
                              <div className="h-[86px] w-[2px] bg-slate-400"></div>
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 height="24px"
                                 viewBox="0 -960 960 960"
                                 width="24px"
                                 fill="#5f6368"
                              >
                                 <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                              </svg>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {selectedTab === "cart" && <CartPage />}
               {selectedTab == "fav" && <FavPage />}
            </div>
         </section>
         <EditProfileModal
            open={open}
            setOpen={setOpen}
         />
         {/* <Footer /> */}
      </section>
   );
};

export default page;
