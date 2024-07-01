/** @format */

"use client";
import { Button, Form, Input, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import Password from "antd/es/input/Password";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { NEXT_PUBLIC_API_BASE_URL } from "../../../config";
import { signIn } from "next-auth/react";

const page = () => {
   const router = useRouter();
   const [loading, setLoading] = useState<boolean>(false);
   const handle_login = async (value: any) => {
      try {
         if (
            value?.password === undefined ||
            value?.email === undefined
         ) {
            notification.error({ message: "All fields are required" });
            return;
         }
         setLoading(true);
         const res = await signIn('credentials' , {
            username: value.email,
            password:  value.password,
            redirect : true,
         });
      } catch (err) {
         console.error(err);
         notification.error({ message: "Something went wrong" });
      } finally {
         setLoading(false);
      }
   };
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
               onFinish={handle_login}
            >
               <FormItem label="email" name={'email'}>
                  <Input className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
               </FormItem>
               <FormItem label="password" name={'password'}>
                  <Password className="!outline-none w-full !border-l-0 !border-r-0 !rounded-none !shadow-none !border-t-0 !border-b hover:!shadow-none !border-black !bg-transparent" />
               </FormItem>
               <div className="mx-auto w-full flex items-center justify-center">
                  <button
                     disabled={loading === true}
                     className="w-1/2 bg-black py-2 px-2 text-white rounded-md"
                  >
                     Login
                  </button>
                  {loading && (
                     <img
                        className="w-8 h-8 animate-spin"
                        src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                        alt="Loading icon"
                     />
                  )}
               </div>
            </Form>
            <div className="py-2 text-sm italic text-[#a13f30]">
               New to Shop.co?{" "}
               <span
                  onClick={() => {
                     router.push("/signup");
                  }}
                  className="cursor-pointer"
               >
                  Signup
               </span>
            </div>
         </div>
      </div>
   );
};

export default page;
