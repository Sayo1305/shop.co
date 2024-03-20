/** @format */

import { Button, Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import Image from "next/image";
import React from "react";

const page = () => {
   return (
      <div className="w-full min-h-screen flex items-start justify-between">
         <Image
            src={"/images/signin.jpg"}
            className="w-full h-screen object-cover"
            unoptimized
            width={100}
            height={100}
            alt="icon"
         />
         <div className="w-full absolute flex flex-col  h-screen justify-center py-10 items-center">
            <div className="bg-gray-500 py-5 border-black border rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 px-3 w-1/2 flex items-center justify-center flex-col">
               <div className="text-4xl font-semibold">Create your account</div>
               <div className="w-8/12 mx-auto h-[0.5px] bg-black my-5"></div>
               <Form
                  className="w-1/2"
                  layout="vertical"
               >
                  <FormItem label="name">
                     <Input className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
                  </FormItem>
                  <FormItem label="email">
                     <Input className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
                  </FormItem>
                  <FormItem label="password">
                     <Password className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
                  </FormItem>
                  <div className="mx-auto w-full flex items-center justify-center">
                     <button className="w-1/2 bg-black py-2 px-2 text-white rounded-md">
                        Login
                     </button>
                  </div>
               </Form>
               <div className="py-2 text-sm italic text-[#a13f30]">
                  New to Shop.co? <span className="cursor-pointer">Signup</span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default page;
