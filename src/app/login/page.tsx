"use client";
import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
   const router = useRouter();
   return (
      <div className="w-full min-h-screen flex items-start justify-between">
         <Image
            src={"/images/login.jpg"}
            className="w-1/2 h-screen object-cover"
            unoptimized
            width={100}
            height={100}
            alt="icon"
         />
         <div className="w-1/2 flex flex-col bg-[#FF9C93]/50 h-screen justify-center py-10 items-center">
            <div className="text-4xl font-semibold">Login to your account</div>
            <div className="w-8/12 mx-auto h-[0.5px] bg-black mt-2 mb-5"></div>
            <Form
               className="w-1/2"
               layout="vertical"
            >
               <FormItem label="email">
                  <Input className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
               </FormItem>
               <FormItem label="password">
                  <Password className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
               </FormItem>
               <div className="mx-auto w-full flex items-center justify-center">
                  <button className="w-1/2 bg-black py-2 px-2 text-white rounded-md">Login</button>
               </div>
            </Form>
            <div className="py-2 text-sm italic text-[#a13f30]">New to Shop.co? <span onClick={()=>{router.push('/signup')}} className="cursor-pointer">Signup</span></div>
         </div>
      </div>
   );
};

export default page;
