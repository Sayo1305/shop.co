/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import { Form, Input, Modal, Radio, Select, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, InboxOutlined, LoadingOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface catergoryType {
   category_id: number;
   name: string;
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

const page = () => {
   const router = useRouter();
   const [openAddMoreCatModal, setAddMoreCatModal] = useState<Boolean>(false);
   const [selectedCategory, setSelectedCategory] = useState<number>(-5);
   const [variationList, setVariationList] = useState<variationType[]>([]);
   const [categoryList, setCategoryList] = useState<catergoryType[]>([]);
   const [selectedVariationList, setSelectedVariationList] = useState<number[]>([]);
   const { data: session, status } = useSession() as any;

   const [loading , setLoading] = useState<boolean>(false);

   const [fileList, setFileList] = useState<FileList>();

   function handleDeleteFile(index: number) {
      if (!fileList) return; // Ensure fileList is not null or undefined

      // Convert FileList to array
      const filesArray = Array.from(fileList);

      // Remove the file at the specified index
      filesArray.splice(index, 1);

      // Update the fileList state with the new array of files
      setFileList(filesArray as any);
   }

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
                  category_id: selectedCategory,
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
      if (session && selectedCategory !== -5) {
         handle_fetch();
      }
   }, [session, selectedCategory]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch("/api/admin/getCategory", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
               },
            });
            if (res.ok) {
               const data = await res.json();
               setCategoryList(data.data?.data);
               // console.log(data);
            }
         } catch (err) {
            console.error(err);
         }
      };
      if (categoryList.length === 0 && session) fetchData();
   }, [session]);

   const handle_variation_list = (id: number) => {
      const tempList = [...selectedVariationList];
      if (!tempList.includes(id)) {
         tempList.push(id);
      } else {
         let index = tempList.indexOf(id);
         if (index !== -1) tempList.splice(index, 1);
      }
      setSelectedVariationList(tempList);
   };

   const handleUpload = async(values : any)=>{
      try{
         console.log(values)
         setLoading(true);
         const form_data = new FormData();
         if (fileList) {
             Array.from(fileList).forEach((file, index) => {
                 form_data.append(`files`, file);
             });
         }

         form_data.append('name' , values.name);
         form_data.append('product_description', values.product_description);
         form_data.append('category_id', values.category_id);
         form_data.append('quantity', values.quantity);
         form_data.append('price', values.price);
         form_data.append('variation_list' , JSON.stringify(variationList));
         
         const res = await fetch("/api/admin/postCreateProduct", {
            method  : "POST",
            headers: {
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: form_data as FormData
         });
         if(res.ok){
            console.log("done");
         }
      }catch(err){
         console.error(err);
         notification.error({message : "Djdjd"});
      }finally{
         setLoading(false);
      }
   }
   return (
      <AdminDashboardLayout>
         <div className="">
            <div className="px-10 py-5 border-b bg-white text-2xl font-medium">
               Create Product form
            </div>
            <div className="px-10 py-5 h-[78vh] overflow-y-auto">
               <Form layout="vertical" onFinish={handleUpload}>
                  <FormItem
                     label="image"
                     name="image"
                     className="px-10 w-1/3"
                  >
                     <div className="w-1/2 bg-black text-white flex items-center justify-center relative p-1 rounded-lg ">
                        upload
                        <input
                           onChange={(e) => {
                              if (e.target.files) setFileList(e.target.files);
                           }}
                           className="opacity-0  w-full absolute top-0 left-0"
                           type="file"
                           multiple={true}
                        />
                     </div>
                  </FormItem>
                  {fileList && (
                     <div>
                        <div>
                           {Array.from(fileList).map((file, index) => (
                              <div key={index} className="flex items-center gap-3">
                                 <DeleteOutlined onClick={()=>{handleDeleteFile(index)}}/>
                               <div>  {file.name}</div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
                  <FormItem
                     label="name"
                     name={'name'}
                     className="px-10"
                  >
                     <Input
                        size="large"
                        className="!w-1/2"
                     />
                  </FormItem>
                  <FormItem
                     label="product_description"
                     name="product_description"
                     className="px-10"
                  >
                     <TextArea
                        size="large"
                        className="!w-1/2"
                     />
                  </FormItem>
                  <FormItem
                     label="price"
                     name="price"
                     className="px-10"
                  >
                      <Input
                        type="number"
                        size="large"
                        className="!w-1/2"
                     />
                  </FormItem>
                  <FormItem
                     label="category_id"
                     name="category_id"
                     className="px-10"
                  >
                     <Select
                        size="large"
                        onChange={(e) => {
                           if (e === "more") router.push("/admin/dashboard/createcategory");
                           else setSelectedCategory(e);
                        }}
                        className="!w-1/2"
                     >
                        {categoryList.length > 0 &&
                           categoryList.map((value: catergoryType) => {
                              return (
                                 <Option
                                    key={value?.category_id?.toString()}
                                    value={value?.category_id?.toString()}
                                 >
                                    {value.name}
                                 </Option>
                              );
                           })}
                        <Option value="more">+ Add More Option</Option>
                     </Select>
                  </FormItem>
                  <FormItem
                     label="variations"
                     name="variations"
                     className="px-10"
                  >
                     <div className="flex items-center gap-5">
                        {variationList?.length > 0 &&
                           variationList.map((variation: variationType) => {
                              return (
                                 <div
                                    onClick={() => {
                                       handle_variation_list(variation.variation_id);
                                    }}
                                    className={`px-10 py-2  rounded-md ${
                                       selectedVariationList.includes(variation.variation_id)
                                          ? "bg-gray-800 text-white"
                                          : "bg-gray-200"
                                    }  border cursor-pointer border-black`}
                                 >
                                    {variation.name}
                                 </div>
                              );
                           })}
                        {variationList.length === 0 && <div>no varriations exists</div>}
                     </div>
                  </FormItem>
                  <FormItem label="quantity" name="quantity">
                     <Input
                        type="number"
                        size="large"
                        className="!w-1/2"
                     />
                  </FormItem>
                  <button type="submit" className="px-5 flex items-center gap-2 py-2 rounded-md text-white bg-black">submit {loading === true && <LoadingOutlined className="text-xl"/>}</button>
               </Form>
            </div>
         </div>
         <Modal footer={null}></Modal>
      </AdminDashboardLayout>
   );
};

export default page;
