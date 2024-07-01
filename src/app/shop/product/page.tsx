/** @format */

"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import "react-multi-carousel/lib/styles.css";
import { notification } from "antd";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Markdown from "react-markdown";
import { Rate } from "antd";
import { NEXT_PUBLIC_API_BASE_URL } from "../../../../config";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

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
   const router = useRouter();
   const { data: session, status } = useSession() as any;
   const product_id = searchParams.get("product_id");
   const [productDetails, setProductDetails] = useState<productDetails>();
   const [loading, setLoading] = useState<boolean>(false);
   const [suggestedProduct, setSuggestedProduct] = useState<productDetails[]>([]);
   const [currentImage, setCurrentImage] = useState<string>("");
   const [isFavorite, setIsFavorite] = useState<boolean>(false);

   const carouselRef = useRef(null);

   const responsive = {
      superLargeDesktop: {
         // the naming can be any, depends on you.
         breakpoint: { max: 4000, min: 3000 },
         items: 5,
      },
      desktop: {
         breakpoint: { max: 3000, min: 1320 },
         items: 3,
      },
      tablet: {
         breakpoint: { max: 1320, min: 700 },
         items: 2,
      },
      mobile: {
         breakpoint: { max: 700, min: 0 },
         items: 1,
      },
   };

   const remove_fav = async () => {
      const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/favourite/add_to_fav`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
         },
         body: JSON.stringify({
            product_id: product_id,
         }),
      });
      if (res.ok) {
         toast.success("Added to the list");
         setIsFavorite(true);
      }
   };
   const add_fav = async () => {
      const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/favourite/remove_from_fav`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.token}`,
         },
         body: JSON.stringify({
            product_id: product_id,
         }),
      });
      if (res.ok) {
         toast.success("Remove from the list");
         setIsFavorite(false);
      }
   };

   const handle_fav = async () => {
      try {
         if (!isFavorite) {
            await remove_fav();
         } else {
            await add_fav();
         }
      } catch (er) {
         toast.error("Error while performing");
         console.log(er);
      }
   };

   const handleFetchFav = async ()=>{
      try{
         const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/favourite/get_status_by_id?product_id=${product_id}` , {
            method  : "GET",
            headers : {
               authorization: `Bearer ${session?.user?.token}`,
            }
         });
         if(res.ok){
            const data = await res.json();
            setIsFavorite(data?.data?.status);
         }
      }catch(err){
         console.error("Error while fetching fav : " + err);
      }
   }

   const handle_fetch = useMemo(() => {
      return async () => {
         try {
            setLoading(true);
            const headers: HeadersInit = {
               "Content-Type": "application/json",
            };
            const res = await fetch(`/api/client/getProduct?product_id=${product_id}`, {
               method: "GET",
               headers: headers,
            });
            if (res.ok) {
               const data = await res.json();
               setProductDetails(data?.data?.data);
               setCurrentImage(data?.data?.data?.image_url[0]);
               setSuggestedProduct(data?.data?.suggestedProduct);
            } else {
               const data = await res.json();
               console.error(data);
               toast.error("Error in fetching data");
            }
         } catch (err) {
            console.error("Error in fetching data: ", err);
            toast.error("Error in fetching data");
         } finally {
            setLoading(false);
         }
      };
   }, [product_id]);

   useEffect(() => {
      handle_fetch();
   }, [product_id]);
   useEffect(()=>{
      if(session){
         handleFetchFav();
      }
   },[session , product_id]);
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
                              placeholder="blur"
                              blurDataURL="/images/loading_logo.png"
                              height={100}
                              unoptimized
                              alt="product"
                           />
                        </Zoom>
                     </div>
                     <div className="w-full flex gap-5 overflow-x-scroll items-center py-3">
                        {productDetails &&
                           productDetails.image_url.map((image) => (
                              <Image
                                 onClick={() => {
                                    setCurrentImage(image);
                                 }}
                                 className="w-[100px] cursor-pointer object-contain rounded-lg  h-[100px]"
                                 src={image}
                                 width={100}
                                 placeholder="blur"
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
                     <div className=" text-sm text-slate-500 tracking-wide leading-relaxed  my-10">
                        <Markdown>{productDetails.description}</Markdown>
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
                        <div
                           onClick={() => {
                              handle_fav();
                           }}
                           className="bg-[#F0F0F0] p-3 rounded-md"
                        >
                           {isFavorite ? (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="24"
                                 height="24"
                                 fill="currentColor"
                                 className="bi bi-heart-fill"
                                 viewBox="0 0 16 16"
                              >
                                 <path
                                    fill-rule="evenodd"
                                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                                 />
                              </svg>
                           ) : (
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 height="24px"
                                 viewBox="0 -960 960 960"
                                 width="24px"
                                 fill="#000"
                              >
                                 <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
                              </svg>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </section>
         {suggestedProduct && suggestedProduct.length > 0 && (
            <div className="py-5 text-2xl font-medium px-16">Suggested Product </div>
         )}
         {/* <div className="flex w-full items-start gap-10 px-16 overflow-x-scroll"> */}
         <Carousel
            // className="px-10"
            autoPlay
            className="w-full px-5 md:!px-16"
            responsive={responsive}
            ref={carouselRef}
            keyBoardControl={false}
            infinite={true}
            // centerMode={centerMode}
            arrows={true}
         >
            {suggestedProduct &&
               suggestedProduct.length > 0 &&
               suggestedProduct.map((product) => (
                  <div
                     onClick={() => {
                        setCurrentImage("");
                        setSuggestedProduct([]);
                        setProductDetails(undefined);
                        router.push(`/shop/product?product_id=${product.product_id}`);
                     }}
                     className="w-[300px] shadow-sm rounded-md h-[300px]"
                  >
                     <Image
                        className="w-full rounded-md h-[200px] object-cover"
                        src={product.image_url[0]}
                        alt={product.name}
                        width={100}
                        height={100}
                     />

                     <div className="text-sm w-full font_lato_custom px-2 my-5 font-medium">
                        <div>
                           {product.name.substring(0, 40)} {product.name.length > 40 && "..."}
                        </div>
                        <div className="my-4 flex items-center justify-between font-semibold">
                           <div>₹{product.price}</div>
                           <div className="flex items-center font-normal gap-2 text-white px-4 py-2 cursor-pointer rounded-md bg-gray-700">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 height="15px"
                                 viewBox="0 -960 960 960"
                                 width="15px"
                                 fill="#fff"
                              >
                                 <path d="M440-600v-120H320v-80h120v-120h80v120h120v80H520v120h-80ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                              </svg>
                              Add to cart
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
         </Carousel>{" "}
         <Footer />
      </section>
   );
};

export default page;
