/** @format */
"use client";
import Navbar from "@/components/navbar";
import { useSearchParams } from "next/navigation";
import { Breadcrumb, Skeleton, Slider } from "antd";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FilterOutlined } from "@ant-design/icons";
import Footer from "@/components/footer";
import { NEXT_PUBLIC_API_BASE_URL } from "../../../../config";
import Image from "next/image";
import { Pagination } from "antd";

interface Product {
   product_id: number;
   name: string;
   description: string;
   quantity: number;
   ratings: number;
   header_image_url : string;
   image_url: string[];
   price: number;
   created_at: string; // Use Date if you will parse the string to a Date object
   updated_at: string; // Use Date if you will parse the string to a Date object
   category_name: string;
   variations: Variation[];
}

interface Variation {
   variation_name: string;
   variation_option_name: string;
}

const page = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [Products, setProducts] = useState<Product[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [limit, setLimit] = useState<number>(10);
   const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
   const [total, setTotal] = useState<number>(0);
   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
   const [selectedColors, setSelectedColors] = useState<string[]>([]);
   const [availableColors, setAvailableColors] = useState<string[]>([]);
   const [availableSizes, setAvailableSizes] = useState<string[]>([]);
   const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

   const search = searchParams.get("topic");

   const handle_search = async () => {
      try {
         setLoading(true);
         const res = await fetch(
            `${NEXT_PUBLIC_API_BASE_URL}/product/search?title=${search}&&page=${1}&&limit=${10}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            }
         );
         const data = await res.json();
         setProducts(data?.data);
         setFilteredProducts(data?.data);
         setAvailableColors(extractColors(data?.data));
         setAvailableSizes(extractSizes(data?.data));
         filterProducts(data?.data, priceRange, selectedColors, selectedSizes);
         setTotal(data?.pagination?.total);
         setPageNumber(data?.pagination?.page);
         setLimit(data?.pagination?.limit);
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };

   const extractColors = (products: Product[]): string[] => {
      const colorSet = new Set<string>();
      products.forEach((product) => {
         product.variations.forEach((variation) => {
            if (variation.variation_name === "color") {
               colorSet.add(variation.variation_option_name);
            }
         });
      });
      return Array.from(colorSet);
   };

   const extractSizes = (products: Product[]): string[] => {
      const sizeSet = new Set<string>();
      products.forEach((product) => {
         product.variations.forEach((variation) => {
            if (variation.variation_name === "size") {
               sizeSet.add(variation.variation_option_name);
            }
         });
      });
      return Array.from(sizeSet);
   };

   useEffect(() => {
      handle_search();
   }, [search]);

   useEffect(() => {
      filterProducts(Products, priceRange, selectedColors, selectedSizes);
   }, [priceRange, selectedColors, Products , selectedSizes]);

   const filterProducts = (
      products: Product[],
      priceRange: [number, number],
      colors: string[],
      sizes: string[]
   ) => {
      const filtered = products.filter((product) => {
         const isWithinPriceRange =
            product.price >= priceRange[0] && product.price <= priceRange[1];
         const hasSelectedColors =
            colors.length === 0 ||
            product.variations.some(
               (variation) =>
                  variation.variation_name === "color" &&
                  colors.includes(variation.variation_option_name)
            );
         const hasSelectedSizes =
            sizes.length === 0 ||
            product.variations.some(
               (variation) =>
                  variation.variation_name === "size" &&
                  sizes.includes(variation.variation_option_name)
            );

         return isWithinPriceRange && hasSelectedColors && hasSelectedSizes;
      });
      setFilteredProducts(filtered);
   };

   const handleColorClick = (color: string) => {
      setSelectedColors((prevSelectedColors) =>
         prevSelectedColors.includes(color)
            ? prevSelectedColors.filter((c) => c !== color)
            : [...prevSelectedColors, color]
      );
   };

   const handleSizeClick = (size: string) => {
      setSelectedSizes((prevSelectedSizes) =>
         prevSelectedSizes.includes(size)
            ? prevSelectedSizes.filter((s) => s !== size)
            : [...prevSelectedSizes, size]
      );
   };
   return (
      <section>
         <Navbar />
         {/* beradcrimbs */}
         <div className="px-16">
            <Breadcrumb
               items={[
                  {
                     title: "Home",
                  },
                  {
                     title: `${search}`,
                  },
               ]}
            />
         </div>

         <div className="px-16 w-full flex items-start gap-10 mt-5 justify-between">
            <div className="w-3/12 md:block hidden">
               <div className="p-3 rounded-xl border">
                  <div className="w-full flex items-center justify-between">
                     <div>Filters</div>
                     <div>
                        <FilterOutlined />
                     </div>
                  </div>
                  <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                  <div>Price</div>
                  <Slider
                     className="!text-black"
                     range
                     value={priceRange}
                     defaultValue={[0, 10000]}
                     min={0}
                     max={10000}
                     onChange={(value) => setPriceRange(value as [number, number])}
                  />
                  {availableColors.length > 0 && (
                     <div>
                        <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                        <div>Colors</div>
                        <div className="flex items-center flex-wrap justify-start gap-5 my-2">
                           {availableColors.map((color) => (
                              <div
                                 key={color}
                                 className={`w-7 h-7 border border-black rounded-full ${
                                    selectedColors.includes(color) ? "border-4  shadow-md" : ""
                                 }`}
                                 style={{ backgroundColor: color }}
                                 onClick={() => handleColorClick(color)}
                              ></div>
                           ))}
                        </div>
                     </div>
                  )}
                  {availableSizes.length > 0 && (
                     <div>
                        <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                        <div>Sizes</div>
                        <div className="flex my-2 flex-wrap gap-3 items-center">
                           {availableSizes.map((size) => (
                              <div
                                 key={size}
                                 className={`bg-gray-200 cursor-pointer
             border-[1.5px] border-black rounded-lg p-1 px-3 text-xs ${
                selectedSizes.includes(size) ? "border-2  bg-slate-600 text-white shadow-md" : ""
             }`}
                                 onClick={() => handleSizeClick(size)}
                              >
                                 {size}
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  <div className="w-full h-[0.5px] bg-gray-400 my-2"></div>
                  <button
                     onClick={() => {
                        setPriceRange([0, 10000]);
                        setSelectedColors([]);
                        setSelectedSizes([]);
                     }}
                     className="w-full my-4 rounded-lg bg-white text-black  border-[2px] border-black p-2"
                  >
                     Reset filters
                  </button>
                  <button className="w-full rounded-lg bg-black text-white p-2">
                     Apply filters
                  </button>
               </div>
            </div>
            <div className="md:w-9/12 w-full">
               <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{search}</div>
                  <div className="text-[#9F9F9F] text-xs">
                     showing {pageNumber} - {limit} of {total} products
                  </div>
               </div>
               {loading && (
                  <div className="grid my-10 place-items-center justify-items-center gap-10 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 animate-pulse duration-75 ease-in-out">
                     <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                     <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                     <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                     <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                     <div className="w-[300px] rounded-lg h-[300px] bg-gray-200"></div>
                  </div>
               )}
               <div className="grid lg:grid-cols-3 place-items-center justify-items-center md:grid-cols-2 grid-cols-1 gap-10 my-10">
                  {filteredProducts &&
                     filteredProducts.map((product) => (
                        <div
                           onClick={() => {
                              router.push(`/shop/product?product_id=${product.product_id}`);
                           }}
                           className="w-[300px] h-[300px]"
                        >
                           <div className="w-full">
                              <Image
                                 className="w-full rounded-t-2xl bg-slate-200 bg-contain h-[200px]"
                                 src={product.header_image_url}
                                 width={100}
                                 height={100}
                                 alt={product.name}
                              />
                           </div>
                           <div className="flex items-center py-3 justify-between w-full">
                              <div className="text-sm font_rubik_custom">
                                 {product.name?.substring(0, 29)}
                                 {product.name.length >= 29 && ".."}{" "}
                              </div>
                              <div className="text-sm font-medium text-gray-700">
                                 ₹ {product.price}
                              </div>
                           </div>
                           <div className="text-xs text-gray-400 mb-3  font_rubik_custom">
                              {product.description.substring(0, 70)}{" "}
                              {product.description.length >= 70 && ".."}
                           </div>
                           <div className=" px-4 py-2 text-white rounded-md cursor-pointer font_lato_custom text-sm inline bg-black">
                              add to cart
                           </div>
                        </div>
                     ))}
                  {filteredProducts?.length === 0 && <div>No Products available.</div>}
               </div>
               <div className="my-5">
                  {loading === false && filteredProducts?.length > 0 && (
                     <Pagination
                        defaultCurrent={pageNumber}
                        total={total}
                     />
                  )}
               </div>
            </div>
         </div>
         <Footer />
      </section>
   );
};

export default page;
