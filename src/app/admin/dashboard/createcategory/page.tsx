/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import EditCategoryModal from "@/components/modal/admin/editCategoryModal";
import { RootState } from "@/lib/store";
import { SessionType } from "@/utils/sessionType";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
   interface value {
      name: String;
   }
   interface catergoryType {
      id: Number;
      name: String;
   }
   const token = useSelector((state: RootState) => state.passwordSlice.token) || "";
   const [categoryList, setCategoryList] = useState<catergoryType[]>([]);
   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
   const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
   const { data: session, status } = useSession() as any;

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
   const handleSubmit = async (value: value) => {
      if (value.name === "" || typeof value.name === "undefined") {
         notification.warning({ message: "Enter name of category" });
         return;
      }
      try {
         const res = await fetch("/api/admin/postCreateCategory", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({ name: value?.name }),
         });
         if (res.ok) {
            const data = await res.json();
            console.log(data);
            notification.success({ message: "Category created successfully" });
         } else {
            const data = await res.json();
            console.log(data);
            notification.error({ message: "Error in creating category" });
         }
      } catch (err) {
         console.error(err);
      }
   };
   return (
      <AdminDashboardLayout>
         <div className="bg-white border-b py-5 px-10 font-semibold text-2xl">Create Category</div>
         <div className="w-full px-10 py-10">
            <Form
               layout="vertical"
               onFinish={(value) => {
                  handleSubmit(value);
               }}
            >
               <FormItem
                  name={"name"}
                  label="catergory name"
               >
                  <Input
                     size="large"
                     className="!w-1/2"
                  />
               </FormItem>
               <Button
                  htmlType="submit"
                  size="large"
                  className="!bg-black !shadow-none !outline-none !border-black hover:!shadow-none !hover:outline-none !text-white"
               >
                  SUBMIT
               </Button>
            </Form>
         </div>
         <div className="my-2 text-center text-2xl mx-auto">Category</div>
         <div className="w-full px-10 gap-5 grid grid-cols-4">
            {categoryList.length > 0 &&
               categoryList?.map((category: catergoryType) => {
                  return (
                     <div className="w-full relative cursor-pointer rounded-md px-10 bg-white border text-center my-10 p-5 text-xl ">
                        <div>{category.name}</div>
                        <div className="absolute top-0 right-2">
                           <DeleteOutlined className="text-sm !text-red-400" />
                        </div>
                        <div className="absolute top-0 right-10">
                           <EditOutlined onClick={()=>{setOpenEditModal(true)}} className="text-sm !text-blue-400" />
                        </div>
                     </div>
                  );
               })}
         </div>
         <EditCategoryModal open={openEditModal} setOpen={setOpenEditModal}/>
      </AdminDashboardLayout>
   );
};

export default page;
