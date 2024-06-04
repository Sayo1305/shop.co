/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import { Input, Button, Modal, Upload, notification } from "antd";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import VariationOptionCard from "@/components/variationOptionCard";

const page = () => {
   interface Product {
      product_id: number;
      name: string;
      description: string;
      image_url: string[];
      category_id: number;
      created_at: string;
      quantity: number;
      updated_at: string;
   }

   interface variationType {
      variation_id: number;
      name: string;
      category_id: number;
   }

   interface VariantItem {
      variation_option_id: number;
      name: string;
      variation_id: number;
   }
   const search = useSearchParams();
   const { data: session, status } = useSession() as any;
   const id = search.get("id");

   const [openEditTitle, setOpenEditTitle] = useState<boolean>(false);
   const [newTitle, setNewTitle] = useState<string>("");
   const [openEditDescription, setOpenEditDescription] = useState<boolean>(false);
   const [newDescription, setNewDescription] = useState<string>("");
   const [openEditQuantity, setOpenEditQuantity] = useState<boolean>(false);
   const [newQuantity, setNewQuantity] = useState<number>(0);
   const [openEditImages, setOpenEditImages] = useState<boolean>(false);
   const [variationList, setVariationList] = useState<variationType[]>([]);
   const [selectVariationOption, setSelectVariationOption] = useState<VariantItem[]>([]);
   const [newImages, setNewImages] = useState<string[]>([]);
   const [fileList, setFileList] = useState<any[]>();
   const [savingOptions, setSavingOptions] = useState<boolean>(false);
   const downloadAllImages = () => {
      product?.image_url.forEach((url) => {
         const link = document.createElement("a");
         link.href = url;
         link.download = url.split("/").pop() || "download"; // Extracts the filename from the URL
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      });
   };

   const fetchVariationOptions = useMemo(() => {
      return async () => {
         try {
            const res = await fetch(`/api/admin/getProductVariationOption?id=${id}`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
               },
            });
            if (res.ok) {
               const data = await res.json();
               setSelectVariationOption(data.data?.data);
            } else {
               const data = await res.json();
               console.error(data);
               notification.error({ message: "Error in fetching data" });
            }
         } catch (err) {
            console.error("Error in fetching data: ", err);
            notification.error({ message: "Error in fetching data" });
         }
      };
   }, [variationList]);

   const handle_save_options = async () => {
      try {
         setSavingOptions(true);
         const res = await fetch("/api/admin/postAddProductVariation", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({
               product_id: id,
               variation_options: selectVariationOption,
            }),
         });
         if (res.ok) {
            notification.success({ message: "Sucessfully added" });
         }
      } catch (er) {
         console.error(er);
      } finally {
         setSavingOptions(false);
      }
   };
   const [product, setProduct] = useState<Product>();

   const handle_fetch_product = async () => {
      try {
         const res = await fetch(`/api/admin/getproductById?id=${search.get("id")}`, {
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
      } catch (er) {
         console.error(er);
      }
   };

   const handle_save = async () => {
      try {
         var formdata = new FormData();
         if (fileList) {
            Array.from(fileList).forEach((file, index) => {
               formdata.append(`files`, file);
            });
         }

         if (newTitle) {
            formdata.append("name", newTitle);
         }
         if (product?.category_id) {
            var cat = product?.category_id.toString();
            formdata.append("category_id", cat);
         }
         if (newDescription) {
            formdata.append("product_description", newDescription);
         }
         if (newQuantity) {
            var quantity = newQuantity.toString();
            formdata.append("quantity", quantity);
         }

         const res = await fetch(`/api/admin/updateProduct?id=${id}`, {
            method: "POST",
            headers: {
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: formdata as FormData,
         });
         if (res.ok) {
            const data = await res.json();
            console.log(data);
         }
      } catch (er) {
         console.error(er);
      }
   };
   useEffect(() => {
      handle_fetch_product();
   }, [id]);

   const handleImageChange = (fileList: FileList | null) => {
      if (fileList) {
         const filesArray: File[] = Array.from(fileList);
         const imageUrls: string[] = filesArray.map((file) => URL.createObjectURL(file));
         setNewImages(imageUrls);
         setFileList(filesArray);
      }
   };

   useEffect(() => {
      const handle_fetch = async () => {
         try {
            const res = await fetch("/api/admin/postGetVariationByCategory", {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
               },
               body: JSON.stringify({
                  category_id: product?.category_id,
               }),
            });
            if (res.ok) {
               const data = await res.json();
               setVariationList(data?.data?.variations);
            } else {
               notification.error({ message: "Error fetching varriations" });
            }
         } catch (err) {
            console.error(err);
         }
      };
      if (session && product?.category_id !== -5 && product) {
         handle_fetch();
         fetchVariationOptions();
      }
   }, [session, product]);

   return (
      <AdminDashboardLayout>
         {product && (
            <section className="px-10 py-5">
               <div className="flex items-center justify-start gap-5 flex-wrap">
                  <Button
                     onClick={() => {
                        handle_save();
                     }}
                     type="primary"
                     className="px-4 py-2"
                  >
                     Save
                  </Button>
               </div>
               <div className="font-medium flex items-center gap-3 text-2xl py-4">
                  {openEditTitle ? (
                     <>
                        <input
                           type="text"
                           className="border !outline-none rounded-md "
                           value={newTitle}
                           onChange={(e) => {
                              setNewTitle(e.target.value);
                           }}
                        />
                        <Button
                           onClick={() => {
                              setOpenEditTitle(false);
                           }}
                           className="text-sm py-2 bg-green-50 font-medium border rounded-md px-3"
                        >
                           Save
                        </Button>
                     </>
                  ) : (
                     <>
                        <span> {newTitle === "" ? product?.name : newTitle}</span>
                        <svg
                           onClick={() => {
                              setOpenEditTitle(true);
                           }}
                           className="cursor-pointer"
                           xmlns="http://www.w3.org/2000/svg"
                           height="15px"
                           viewBox="0 -960 960 960"
                           width="15px"
                           fill="#000"
                        >
                           <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                     </>
                  )}
               </div>
               <div className="py-4">
                  {openEditImages ? (
                     <>
                        <div>
                           <input
                              multiple
                              type="file"
                              onChange={(e) => handleImageChange(e.target.files)}
                           />
                           <div style={{ marginTop: 8 }}>
                              <UploadOutlined />
                              <div>Upload</div>
                           </div>
                        </div>
                        <Button
                           onClick={() => {
                              setOpenEditImages(false);
                           }}
                           className="text-sm py-2 my-5 bg-green-50 font-medium border rounded-md px-3"
                        >
                           Save
                        </Button>
                     </>
                  ) : (
                     <>
                        <div className="flex gap-5 items-center justify-start flex-wrap">
                           {newImages.length > 0
                              ? newImages.map((value, index) => (
                                   <img
                                      key={index}
                                      className="w-[450px] rounded-md border-2 border-slate-400 h-[300px] object-cover"
                                      src={value}
                                      alt={`New product image ${index + 1}`}
                                   />
                                ))
                              : product?.image_url?.map((value, index) => (
                                   <img
                                      key={index}
                                      className="w-[450px] rounded-md border-2 border-slate-400 h-[300px] object-cover"
                                      src={value}
                                      alt={product?.name}
                                   />
                                ))}
                        </div>
                        <svg
                           onClick={() => {
                              setOpenEditImages(true);
                           }}
                           className="cursor-pointer"
                           xmlns="http://www.w3.org/2000/svg"
                           height="15px"
                           viewBox="0 -960 960 960"
                           width="15px"
                           fill="#000"
                        >
                           <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                     </>
                  )}
               </div>
               <div className="py-4">
                  {openEditQuantity ? (
                     <>
                        quantity:{" "}
                        <Input
                           type="number"
                           value={newQuantity}
                           onChange={(e) => setNewQuantity(Number(e.target.value))}
                           className="border !outline-none rounded-md"
                        />
                        <Button
                           onClick={() => {
                              setOpenEditQuantity(false);
                           }}
                           className="text-sm py-2 bg-green-50 font-medium border rounded-md px-3"
                        >
                           Save
                        </Button>
                     </>
                  ) : (
                     <>
                        quantity: {newQuantity === 0 ? product?.quantity : newQuantity}
                        <svg
                           onClick={() => {
                              setOpenEditQuantity(true);
                           }}
                           className="cursor-pointer"
                           xmlns="http://www.w3.org/2000/svg"
                           height="15px"
                           viewBox="0 -960 960 960"
                           width="15px"
                           fill="#000"
                        >
                           <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                     </>
                  )}
               </div>
               <div className="py-4">
                  {openEditDescription ? (
                     <>
                        description:{" "}
                        <Input.TextArea
                           autoSize={{ maxRows: 5, minRows: 3 }}
                           className="border !outline-none rounded-md "
                           value={newDescription || product?.description}
                           onChange={(e) => {
                              setNewDescription(e.target.value);
                           }}
                        />
                        <Button
                           onClick={() => {
                              setOpenEditDescription(false);
                           }}
                           className="text-sm py-2 my-5 bg-green-50 font-medium border rounded-md px-3"
                        >
                           Save
                        </Button>
                     </>
                  ) : (
                     <>
                        description: {newDescription === "" ? product?.description : newDescription}{" "}
                        <svg
                           onClick={() => {
                              setOpenEditDescription(true);
                           }}
                           className="cursor-pointer"
                           xmlns="http://www.w3.org/2000/svg"
                           height="15px"
                           viewBox="0 -960 960 960"
                           width="15px"
                           fill="#000"
                        >
                           <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                     </>
                  )}
               </div>
               <div className="my-3 bg-black w-full h-1"></div>

               {/* <div>
                  <div onClick={()=>{downloadAllImages()}} className="px-4 inline py-2 bg-black text-white rounded-md">Download All images</div>
               </div> */}
               <div className="flex my-5 items-start justify-start flex-wrap gap-5">
                  {variationList?.length > 0 &&
                     variationList.map((variation: variationType) => {
                        return (
                           <VariationOptionCard
                              title={variation.name}
                              id={variation.variation_id}
                              selectVariationOption={selectVariationOption}
                              setSelectVariationOption={setSelectVariationOption}
                           />
                        );
                     })}
                  {variationList.length === 0 && <div>no varriations exists</div>}
               </div>
               <div className="flex items-center gap-2">
                  <button
                     onClick={() => {
                        handle_save_options();
                     }}
                     className="px-4 py-1 border rounded-md"
                  >
                     save
                  </button>
                  {savingOptions && (
                     <img
                        className="w-6 h-6 animate-spin"
                        src="https://www.svgrepo.com/show/199956/loading-loader.svg"
                        alt="Loading icon"
                     />
                  )}
               </div>
            </section>
         )}
      </AdminDashboardLayout>
   );
};

export default page;
