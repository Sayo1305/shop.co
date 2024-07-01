/** @format */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { NEXT_PUBLIC_API_BASE_URL } from "../../config";
import { useSession } from "next-auth/react";
import { Product } from "./topSelling";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import DeleteFavProd from "./modal/shop/deleteFavProd";

const FavPage = () => {
   const { data: session, status } = useSession() as any;
   const router = useRouter();
   type ProductWithExtras = Product & { [key: string]: any };
   const [openDeleteModal , setOpenDeleteModal] = useState<boolean>(false);
   const [selectedId , setSelectedId] = useState<number>(-4);
   const [favProduct, setFavProduct] = useState<ProductWithExtras[]>();
   const handle_fetch = async () => {
      try {
         const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/favourite/get_fav_products`, {
            method: "GET", // the HTTP method
            headers: {
               authorization: `Bearer ${session?.user?.token}`,
            },
         });
         if (res.ok) {
            const data = await res.json();
            setFavProduct(data?.data);
         }
      } catch (er) {
         console.error(er);
      }
   };

   const handle_delete_product = (id : number) => {
      const temp_arr = favProduct?.filter(product => product.product_id !== id);
      setFavProduct(temp_arr);
   }

   useEffect(() => {
      if (session) handle_fetch();
   }, [session]);

   return (
      <div className="w-full">
         <div className="w-full my-5  flex items-center flex-col justify-center">
            {favProduct && favProduct?.length > 0 ? (
               <div className="w-full p-5  flex flex-col md:items-start items-center gap-5">
                  {favProduct.map((product) => (
                     <div
                        key={product.product_id}
                        className="w-11/12 relative gap-5 md:h-[200px] h-auto md:flex-row flex-col border rounded-lg border-gray-400 p-5 flex items-start"
                     >
                        <Image
                           width={100}
                           height={100}
                           className="md:w-[200px] w-full h-[150px] border bg-slate-100 object-contain rounded-md"
                           src={product.header_image_url || ""}
                           alt={"d"}
                        />
                        <div className="">
                           <div
                              onClick={() => {
                                 router.push(`/shop/product?product_id=${product.product_id}`);
                              }}
                              className=" text-xl cursor-pointer font-medium font_montserrat_custom"
                           >
                              {" "}
                              {product.name}
                           </div>

                           <div className="text-xs text-slate-500">
                              <ReactMarkdown>
                                 {product.description?.substring(0, 200)}
                              </ReactMarkdown>
                              <span
                                 onClick={() => {
                                    router.push(`/shop/product?product_id=${product.product_id}`);
                                 }}
                                 className="font-bold cursor-pointer"
                              >
                                 {" "}
                                 {product?.description?.length > 200 && "More"}
                              </span>
                           </div>
                           <div className="font-semibold text-2xl">₹ {product.price}</div>
                        </div>
                        <div onClick={()=>{setOpenDeleteModal(true); setSelectedId(product.product_id);}} className="absolute top-2 right-3 cursor-pointer">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#434343"
                           >
                              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                           </svg>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="w-full flex items-center justify-center flex-col my-2">
                  <span className="font-semibold font_montserrat_custom text-2xl">
                     {" "}
                     No product here
                  </span>
                  <Image
                     width={100}
                     height={100}
                     className="w-1/3 h-full object-cover"
                     unoptimized
                     alt="icons"
                     src={"/images/empty_fav.png"}
                  />
               </div>
            )}
         </div>
      <DeleteFavProd handle_delete_product={handle_delete_product} open={openDeleteModal} setOpen={setOpenDeleteModal} product_id={selectedId}/>
      </div>
   );
};

export default FavPage;
