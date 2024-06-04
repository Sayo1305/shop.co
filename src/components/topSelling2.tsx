/** @format */
"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
interface NewArrivalCardProps {
   product: Product;
}

const NewArrivalCard: React.FC<NewArrivalCardProps> = ({ product }) => {
   const router = useRouter();
   const responsive = {
      superLargeDesktop: {
         // the naming can be any, depends on you.
         breakpoint: { max: 4000, min: 3000 },
         items: 1,
      },
      desktop: {
         breakpoint: { max: 3000, min: 1320 },
         items: 1,
      },
      tablet: {
         breakpoint: { max: 1320, min: 700 },
         items: 1,
      },
      mobile: {
         breakpoint: { max: 700, min: 0 },
         items: 1,
      },
   };
   return (
      <div
         onClick={() => {
            router.push(`/shop/product?product_id=${product.product_id}`);
         }}
         className="w-[300px] shadow-sm rounded-md h-[300px]"
      >
         <Carousel
            autoPlay
            className="w-full"
            responsive={responsive}
            keyBoardControl={false}
            infinite={true}
            swipeable={true}
            arrows={false}
         >
            {product.image_url.length > 0 &&
               product.image_url.map((image) => {
                  return (
                     <Image
                        className="w-[300px] rounded-md h-[200px] object-cover"
                        src={image}
                        alt={product.name}
                        width={100}
                        height={100}
                     />
                  );
               })}
            {/* <Image
               className="w-[300px] rounded-md h-[200px] object-cover"
               src={product.image_url[0]}
               alt={product.name}
               width={100}
               height={100}
            /> */}
         </Carousel>
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
   );
};
interface ProductCategory {
   category_id: number;
   name: string;
   created_at: string;
   updated_at: string;
}

interface Product {
   product_id: number;
   name: string;
   description: string;
   price: number;
   quantity: number;
   image_url: string[];
   category_id: number;
   created_at: string;
   updated_at: string;
   productCategoriesTable: ProductCategory;
}

const TopSelling2: React.FC = () => {
   const [products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState<boolean>(false);

   const router = useRouter();

   const fetchTopSellingProducts = useCallback(async () => {
      try {
         setLoading(true);
         const response = await fetch("/api/client/getTopProduct?category_id=5&limit=4");
         const data = await response.json();
         if (response.ok) {
            console.log(data?.data?.data);
            setProducts(data.data?.data);
         } else {
            console.error("Error fetching top products:", data.msg);
         }
      } catch (error) {
         console.error("Error fetching top products:", error);
      } finally {
         setLoading(false);
      }
   }, []);

   useEffect(() => {
      fetchTopSellingProducts();
   }, [fetchTopSellingProducts]);

   return (
      <div className="px-16 sm:py-0 py-5">
         <div className="text-5xl font-extrabold text-center w-full py-12">
            TOP SELLING GARMENTS
         </div>
         {loading ? (
            <div className="text-center animate-pulse justify-between gap-5 my-3 flex flex-wrap">
               <div className="w-[300px] h-[250px] rounded-md bg-slate-200"></div>
               <div className="w-[300px] h-[250px] rounded-md bg-slate-200"></div>
               <div className="w-[300px] h-[250px] rounded-md bg-slate-200"></div>
            </div>
         ) : (
            <div className="grid xl:grid-cols-4 gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-items-center w-full">
               {products &&
                  products.length > 0 &&
                  products.map((product) => <NewArrivalCard product={product} />)}
            </div>
         )}
         <div className="w-full flex my-5 justify-center">
            <button
               onClick={() => {
                  router.push("/shop/search?topic=shoes");
               }}
               className="border !px-10 text-sm py-2 rounded-3xl"
            >
               View all
            </button>
         </div>

         <div className="mx-auto w-full h-[1px] bg-gray-300 my-10"></div>
      </div>
   );
};

export default TopSelling2;
