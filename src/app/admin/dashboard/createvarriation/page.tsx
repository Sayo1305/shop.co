"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import { DeleteOutlined, FileAddOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Form, Input, Modal, Select, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Option } from "antd/es/mentions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface variationItem {
   data: {
      variation_id: number;
      name: string;
      category_id: number;
   };
   onDeleteVariation: DeleteVariationHandler;
}

type DeleteVariationHandler = (variationId: number) => void;

const VarriationCard: React.FC<variationItem> = ({ data, onDeleteVariation }) => {
   const { data: session, status } = useSession() as any;
   const [openAddItemModal, setOpenAddItemModal] = useState<boolean>(false);
   interface VariantItem {
      variation_option_id: number;
      name: string;
      variation_id: number;
   }
   const [variationOptions, setVariationOptions] = useState<VariantItem[]>([]);
   const [text , setText ] = useState<string>("");
   const [colorText , setColorText]  = useState<string>("");
 
   const handleDeleteCategory = async (variation_option_id: number) => {
      try {
         notification.info({ message: "started deleting category" });
         const res = await fetch("/api/admin/postDeleteVariation", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({
               variationId: variation_option_id,
            }),
         });
         if (res.ok) {
            onDeleteVariation(variation_option_id);
         }
      } catch (err) {
         console.error("Error in saving data : ", err);
         notification.error({ message: "error saving data" });
      }
   };

   const handleAddVariationOptionItem  = async (name : string) => {
      try{
         const res = await fetch("/api/admin/postCreateVariationOption", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({
               name: name,
               varriation_id: data.variation_id,
            }),
         });
         if(res.ok){
            const data = await res.json();
            const temp_data =[...variationOptions];
            temp_data.push(data?.data?.varriation_option);
            setVariationOptions(temp_data);
            setOpenAddItemModal(false);
            notification.success({ message: "Variation option added successfully" });
         }else{
            const data = await res.json();
            // console.log(data);
            notification.error({ message: "Error in adding variation option" });
         }
      }catch(err){
         console.error("Error in saving data : " , err);
         notification.error({message : "error saving data"});
      }
   }
   useEffect(() => {
      const handle_fetch = async () => {
         try {
            const res = await fetch(`/api/admin/getVariationOptions?id=${data?.variation_id}`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
               },
            });
            if (res.ok) {
               const data = await res.json();
               setVariationOptions(data.data?.variation_options);
            } else {
               notification.error({ message: "Error in fetching data" });
               const data = await res.json();
               console.error(data);
            }
         } catch (err) {
            console.error("Error in fetching data : ", err);
            notification.error({ message: "Error in fetching data" });
         }
      };
      if (session && data?.variation_id !== null) {
         handle_fetch();
      }
   }, [data?.variation_id]);

   return (
      <div className="w-[300px] relative h-[400px] p-5 rounded-md bg-white border">
         <div className="flex items-center justify-between">
            <div className="text-xl font-medium py-2 border-b">{data?.name}</div>
            <div>
               <DeleteOutlined
                  onClick={() => {
                     handleDeleteCategory(data.variation_id);
                  }}
                  className="cursor-pointer"
               />
            </div>
         </div>
         <div className="py-5 relative">
            <div
               onClick={() => {
                  setOpenAddItemModal(true);
               }}
               className="absolute cursor-pointer top-5 right-3"
            >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-circle"
                  viewBox="0 0 16 16"
               >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
               </svg>{" "}
            </div>
            <div className="flex flex-col gap-3">
            {
               variationOptions.length> 0 && variationOptions.map && variationOptions.map((value : any)=>{
                  if(data.name.toLowerCase() === "color"){
                     return(
                        <ColorPicker className="w-1/2" value={value?.name} disabled/>
                     )
                  }
                  return(
                     <div className="w-1/2">{value?.name}</div>
                  )
               })
            }
            </div>
            {
               variationOptions.length === 0 &&
               <div className="text-xs text-gray-400">No variation options available</div>
            }
         </div>
         {/* Create Items modal */}
         <Modal
            centered
            open={openAddItemModal}
            onCancel={() => {
               setOpenAddItemModal(false);
            }}
            footer={null}
         >
            <div className=" w-full border-[2px] rounded-lg p-5 border-black bg-white">
               <div className="text-xl mb-2 font-semibold">Add Value</div>
               <div className="my-2">
                  <Input
                  onChange={(e)=>{setText(e.target.value)}}
                     size="large"
                     className="!items-center !flex !border-2 !border-black hover:!border-black hover:!text-black !shadow-none hover:!shadow-none"
                  />
                  <div className="w-full h-[0.5px] bg-gray-400 my-3"></div>
                  {data?.name?.toLowerCase() === "color" && (
                     <>
                        {" "}
                        <div className="w-full text-center text-gray-300">OR</div>
                        <ColorPicker
                        onChange={(e , hex)=>{
                           setColorText(hex);
                        }}
                           defaultValue="#1677ff"
                           showText
                           size="large"
                        />
                     </>
                  )}
               </div>
               <div className="flex items-center justify-end">
                  <Button
                  onClick={()=>{
                    if(colorText.length > 0) {
                     handleAddVariationOptionItem(colorText);
                    }else{
                     handleAddVariationOptionItem(text);
                    }
                  }}
                     size="large"
                     className="!bg-[#a4f287] !items-center !flex !border-2 !border-black hover:!border-black hover:!text-black !shadow-none hover:!shadow-none"
                  >
                     Add <PlusOutlined />
                  </Button>
               </div>
            </div>
         </Modal>
      </div>
   );
};

const page = () => {
   const { data: session, status } = useSession() as any;
   interface value {
      name: string;
      category_id: number;
   }
   interface catergoryType {
      category_id: number;
      name: string;
   }
   interface variationType {
      variation_id: number;
      name: string;
      category_id: number;
   }
   const [categoryList, setCategoryList] = useState<catergoryType[]>([]);
   const [variationList, setVariationList] = useState<variationType[]>([]);
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
            }
         } catch (err) {
            console.error(err);
         }
      };
      if (categoryList.length === 0 && session) fetchData();
   }, [session]);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const res = await fetch("/api/admin/getVariation", {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
               },
            });
            if (res.ok) {
               const data = await res.json();
               setVariationList(data?.data?.variations);
            }
         } catch (err) {
            console.error(err);
         }
      };
      if (variationList.length === 0 && session) fetchData();
   }, [session]);

   const handleDeleteVariation: DeleteVariationHandler = (variationId) => {
      setVariationList((prevVariations) =>
         prevVariations.filter((variation) => variation.variation_id !== variationId)
      );
   };

   const onFinish = async (values: value) => {
      if (values.name === "" || typeof values.name === "undefined") {
         notification.warning({ message: "Enter varriation" });
         return;
      }
      try {
         const res = await fetch("/api/admin/postCreateVarriation", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({
               name: values?.name,
               category_id: values?.category_id,
            }),
         });
         if (res.ok) {
            const data = await res.json();
            const tempList: variationType[] = [...variationList];
            const tempdata: variationType = {
               variation_id: data?.varriation?.variation_id,
               name: data?.varriation?.name,
               category_id: data?.varriation?.category_id,
            };
            tempList.push(tempdata);
            setVariationList(tempList);
            notification.success({ message: "Varriation created successfully" });
         } else {
         }
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <AdminDashboardLayout>
         <section>
            <div className="py-5 px-10 bg-white border-b text-2xl font-medium"> Varriation</div>
            <div className="py-5 px-10 w-1/2">
               <Form
                  onFinish={(values) => {
                     onFinish(values);
                  }}
                  layout="vertical"
               >
                  <FormItem
                     className=""
                     name={"category_id"}
                     label="Select Category"
                  >
                     <Select size="large">
                        {categoryList.length > 0 &&
                           categoryList.map((category: catergoryType) => {
                              return (
                                 <Option
                                    key={category?.category_id?.toString()}
                                    value={category?.category_id?.toString()}
                                 >
                                    {category.name}
                                 </Option>
                              );
                           })}
                     </Select>
                  </FormItem>
                  <FormItem
                     className=""
                     name={"name"}
                     label="name"
                  >
                     <Input size="large" />
                  </FormItem>
                  <button
                     type="submit"
                     className="px-10 py-2 bg-black text-white rounded-xl"
                  >
                     Submit
                  </button>
               </Form>
            </div>
            <div className="w-[95%] mx-auto h-[0.5px] bg-black"></div>
            <div className="px-10 flex flex-wrap gap-10 justify-start py-10">
               {variationList?.length > 0 &&
                  variationList.map((variation: variationType) => {
                     return (
                        <VarriationCard
                           data={variation}
                           onDeleteVariation={handleDeleteVariation}
                        />
                     );
                  })}
            </div>
         </section>
      </AdminDashboardLayout>
   );
};

export default page;
