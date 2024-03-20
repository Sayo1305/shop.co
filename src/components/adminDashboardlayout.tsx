"use client";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface Props {
   children: ReactNode;
}

const AdminDashboardLayout: React.FC<Props> = ({ children }) => {
   const router = useRouter();
   const pathname = usePathname();
   const {data  : session , status} = useSession();
   if(status === "unauthenticated"){
      router.push('http://localhost:3000/admin');
   }
   return (
      <div>
         {/*  screen */}
         <div className="w-full flex items-start min-h-screen">
            <div className="w-2/12 flex grow items-center gap-2 border-r  py-5 flex-col bg-[#F9F9F9] min-h-screen">
               <div
                  className="cursor-pointer mb-5 font-bold text-2xl"
                  onClick={() => {
                     router.push("/admin/dashboard");
                  }}
               >
                  Shop.CO
               </div>
               <div
                  onClick={() => {
                     router.push("/admin/dashboard/createproduct");
                  }}
                  className={`w-10/12 cursor-pointer ${
                     pathname === "/admin/dashboard/createproduct" ? " bg-[#e4e4e4] rounded-lg" : ""
                  } text-center py-2 `}
               >
                  Create Product
               </div>
               <div
                  onClick={() => {
                     router.push("/admin/dashboard/viewproduct");
                  }}
                  className={`w-10/12 cursor-pointer ${
                     pathname === "/admin/dashboard/viewproduct" ? " bg-[#e4e4e4] rounded-lg" : ""
                  } text-center py-2 `}
               >
                  View Product
               </div>
               <div
                  onClick={() => {
                     router.push("/admin/dashboard/createcategory");
                  }}
                  className={`w-10/12 cursor-pointer ${
                     pathname === "/admin/dashboard/createcategory" ? " bg-[#e4e4e4] rounded-lg" : ""
                  } text-center py-2 `}
               >
                  create category
               </div>
               <div
                  onClick={() => {
                     router.push("/admin/dashboard/createvarriation");
                  }}
                  className={`w-10/12 cursor-pointer ${
                     pathname === "/admin/dashboard/createvarriation" ? " bg-[#e4e4e4] rounded-lg" : ""
                  } text-center py-2 `}
               >
                  create varriation
               </div>
            </div>
            <div className="w-10/12 bg-slate-50  min-h-screen">
               <div className="w-full flex justify-between bg-[#FFFFFF] py-4 border-b px-10 ">
                  <div className="w-1/2">
                     <Input className="!shadow-none w-full hover:!shadow-none !outline-none hover:!outline" prefix={<SearchOutlined/>}/>
                  </div>
                  <div>
                     <div onClick={()=>{signOut({callbackUrl : 'http://localhost:3000/admin' , redirect : true})}} className="flex items-center gap-2 cursor-pointer"> <LogoutOutlined/>Exit</div>
                  </div>
               </div>
               {children}
            </div>
         </div>
      </div>
   );
};

export default AdminDashboardLayout;
