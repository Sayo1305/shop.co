/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
   const { data: session, status } = useSession() as any;

   const router = useRouter();
   interface Product {
      product_id: number;
      name: string;
      description: string;
      image_url: string[];
      category_id: number;
      created_at: string;
      updated_at: string;
   }

   const [product, setProduct] = useState<Product[]>([]);

   const fetchData = async () => {
      try {
         const res = await fetch("/api/admin/getProduct", {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
         });
         if (res.ok) {
            const data = await res.json();
            setProduct(data?.data?.data);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      if (session) fetchData();
   }, [session]);

   return (
      <AdminDashboardLayout>
         <section>
            <div>
               <h1 className="p-10 font-medium text-2xl">Products</h1>
               <ul className="grid gap-5 w-full lg:grid-cols-3 grid-cols-2 px-10">
                  {product &&
                     product.length > 0 &&
                     product.map((product) => (
                        <li
                         onClick={()=>{router.push(`/admin/dashboard/editproduct?id=${product.product_id}`)}}
                           key={product.product_id}
                           className="w-[300px] rounded-md border"
                        >
                           <Image
                              className="w-[300px] rounded-t-md h-[250px] object-cover"
                              width={100}
                              height={100}
                              unoptimized
                              src={product.image_url[0]}
                              alt={product.name}
                           />
                           <h2 className="text-center font-medium text-xl">{product.name}</h2>
                           <p className="text-xs px-3 text-justify py-5">{product.description?.substring(0,100)}...</p>
                        </li>
                     ))}
               </ul>
            </div>
         </section>
      </AdminDashboardLayout>
   );
};

export default page;
