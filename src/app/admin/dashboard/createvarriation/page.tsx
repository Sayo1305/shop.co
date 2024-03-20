/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import { FileAddOutlined } from "@ant-design/icons";
import { Form, Input, Select, notification } from "antd";
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
}
const VarriationCard: React.FC<variationItem> = ({ data }) => {
   const { data: session, status } = useSession() as any;
   interface VariantItem {
      variation_option_id: number;
      name: string;
      variation_id: number;
   }
   const [variationOptions, setVariationOptions] = useState<variationItem[]>([]);
   useEffect(() => {
      const handle_fetch = async () => {
         try {
            const res = await fetch(`/api/admin/getVariationOptions?id=${data?.category_id}`, {
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
         <div className="text-xl font-medium py-2 border-b">{data?.name}</div>
         <div className="py-5 relative">
         <div className="absolute cursor-pointer top-5 right-3">
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
            <div>items</div>
         </div>
       
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
            tempList.push(data.varriation);
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
            <div className="px-10 grid grid-cols-2 py-10">
               {variationList?.length > 0 &&
                  variationList.map((variation: variationType) => {
                     return <VarriationCard data={variation} />;
                  })}
            </div>
         </section>
      </AdminDashboardLayout>
   );
};

export default page;
