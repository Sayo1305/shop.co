/** @format */

"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { notification } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Rate } from "antd";

interface product_category {
   category_id: number;
   name: string;
   created_at: string;
   updated_at: string;
}

interface productDetails {
   product_id: number;
   name: string;
   description: string;
   quantity: number;
   ratings: number;
   image_url: string[];
   category_id: number;
   price: number;
   created_at: string;
   updated_at: string;
   productCategoriesTable: product_category;
}

const page = () => {
   const searchParams = useSearchParams();
   const product_id = searchParams.get("product_id");
   const [productDetails, setProductDetails] = useState<productDetails>();
   const [loading, setLoading] = useState<boolean>(false);
   const [currentImage, setCurrentImage] = useState<string>("");
   const handle_fetch = useMemo(() => {
      return async () => {
         try {
            setLoading(true);
            const res = await fetch(`/api/client/getProduct?product_id=${product_id}`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });
            if (res.ok) {
               const data = await res.json();
               setProductDetails(data?.data?.data);
               setCurrentImage(data?.data?.data?.image_url[0]);
            } else {
               const data = await res.json();
               console.error(data);
               notification.error({ message: "Error in fetching data" });
            }
         } catch (err) {
            console.error("Error in fetching data: ", err);
            notification.error({ message: "Error in fetching data" });
         } finally {
            setLoading(false);
         }
      };
   }, []);
   {
      console.log(productDetails);
   }

   useEffect(() => {
      handle_fetch();
   }, []);
   return (
      <section>
         <Navbar />
         <section className="w-full py-5 md:px-16 px-10">
            {loading && (
               <div className="w-full flex md:flex-row flex-col gap-10 animate-pulse">
                  <div className="md:w-1/2 w-full rounded-lg h-[400px] bg-slate-200"></div>
                  <div className="md:w-1/2 w-full">
                     <div className="w-full rounded-2xl h-16 bg-slate-200"></div>
                     <div className="w-1/2 my-4 rounded-2xl h-10 bg-slate-200"></div>
                     <div className="w-1/2 my-4 rounded-2xl h-12 bg-slate-200"></div>
                     <div className="w-full my-4 rounded-2xl h-10 bg-slate-200"></div>
                     <div className="w-full my-4 rounded-2xl h-36 bg-slate-200"></div>
                  </div>
               </div>
            )}

            {productDetails && Object.keys(productDetails).length > 0 && (
               <div className="w-full flex md:flex-row flex-col items-start">
                  <div className="md:w-1/2 w-full">
                     <div className="w-full bg-slate-50">
                        <Zoom>
                           <Image
                              className="w-full object-contain rounded-lg  h-[450px]"
                              src={currentImage}
                              width={100}
                              placeholder='blur'
                              blurDataURL="/images/loading_logo.png"
                              height={100}
                              unoptimized
                              alt="product"
                           />
                        </Zoom>
                     </div>
                     <div className="w-full flex gap-5 items-center py-3">
                        {productDetails &&
                           productDetails.image_url.map((image) => (
                              <Image
                                 onClick={() => {
                                    setCurrentImage(image);
                                 }}
                                 className="w-[100px] cursor-pointer object-contain rounded-lg  h-[100px]"
                                 src={image}
                                 width={100}
                                 placeholder='blur'
                                 blurDataURL="/images/loading_logo.png"
                                 height={100}
                                 unoptimized
                                 alt="product"
                              />
                           ))}
                     </div>
                  </div>
                  <div className="md:w-1/2 w-full md:px-10">
                     <div className="font-semibold text-3xl font_rubik_custom text-center">
                        {productDetails.name}
                     </div>
                     <div className="flex text-xs text-slate-500 items-center gap-5 my-5">
                        <Rate
                           allowHalf
                           defaultValue={productDetails.ratings}
                        />
                        {productDetails.ratings} ratings
                     </div>
                     <div className="flex text-5xl font-semibold text-slate-900 items-center gap-5 my-10">
                        ₹ {productDetails.price}/-
                     </div>
                     <div className="flex text-sm text-slate-500 tracking-wide leading-relaxed items-center gap-5 my-10">
                        {productDetails.description}
                     </div>
                     <div className="flex text-sm items-center gap-5 my-10">
                        <div className="w-full font-semibold text-lg cursor-pointer font_lato_custom  bg-black text-white p-3 text-center flex items-center justify-center gap-5 rounded-2xl">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#fff"
                           >
                              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                           </svg>
                           Add to cart
                        </div>
                        <div className="bg-[#F0F0F0] p-3 rounded-md">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24px"
                              viewBox="0 -960 960 960"
                              width="24px"
                              fill="#000"
                           >
                              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                           </svg>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </section>
         <Footer />
      </section>
   );
};

export default page;
