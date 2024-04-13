/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import EditCategoryModal from "@/components/modal/admin/editCategoryModal";
import { RootState } from "@/lib/store";
import { SessionType } from "@/utils/sessionType";
import { DeleteOutlined, EditOutlined, InfoOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, notification } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const page = () => {
   interface value {
      name: string;
   }
   interface catergoryType {
      category_id: number;
      name: string;
   }
   const token = useSelector((state: RootState) => state.passwordSlice.token) || "";
   const [categoryList, setCategoryList] = useState<catergoryType[]>([]);
   const [openEditModal, setOpenEditModal] = useState<boolean>(false);
   const [selectedCategory, setSelectedCategory] = useState<number>(-3);
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

   const handleDelete = async (category_id: number) => {
      try{
         const res = await fetch("/api/admin/postDeleteCategory", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({
               category_id : category_id,
            }),
         });
         if(res.ok){
            const data = await res.json();
            // console.log(data);
            setCategoryList(prev => 
               prev.filter(category  =>  category.category_id!== category_id)
            );
            setOpenDeleteModal(false);
            notification.success({ message: "Category deleted successfully" });
         }else{
            const data = await res.json();
            console.log(data);
            notification.error({ message: "Error in deleting category" });
         }
      }catch(err){
         console.error("Error in deleting category : " , err);
         notification.error({message : "error deleting category"});
      }
   }
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
      <AdminDashboardLayout >
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
         <div className="w-full px-10 gap-5 flex flex-wrap">
            {categoryList.length > 0 &&
               categoryList?.map((category: catergoryType) => {
                  return (
                     <div className="w-[300px] relative cursor-pointer rounded-md px-10 bg-white border text-center my-2 p-5 text-xl ">
                        <div>{category.name}</div>
                        <div className="absolute top-0 right-2">
                           <DeleteOutlined
                              onClick={() => {
                                 setSelectedCategory(category.category_id);
                                 setOpenDeleteModal(true);
                              }}
                              className="text-sm !text-red-400"
                           />
                        </div>
                        <div className="absolute top-0 right-10">
                           <EditOutlined
                              onClick={() => {
                                 setSelectedCategory(category.category_id);
                                 setOpenEditModal(true);
                              }}
                              className="text-sm !text-blue-400"
                           />
                        </div>
                     </div>
                  );
               })}
         </div>
         <EditCategoryModal
            open={openEditModal}
            setOpen={setOpenEditModal}
            selectedCategory={selectedCategory}
            setCategoryList={setCategoryList}
         />

         {/* Delete Modal */}
         <Modal
            open={openDeleteModal}
            centered
            width={600}
            footer={null}
            onCancel={() => {
               setOpenDeleteModal(false);
            }}
         >
            <div className=" w-full border-[2px] rounded-lg p-5 border-black bg-white">
               <div className="text-xl mb-2 font-semibold">Delete Category</div>
               <div className="text-xs  mb-2">
                  {" "}
                  <InfoOutlined /> Note: You cannot undo your actions
               </div>

               <div className="flex items-center justify-end">
                  <Button        size="large" onClick={()=>{handleDelete(selectedCategory)}}
                  className="!bg-[#f29e87] !items-center !flex !border-2 !border-black hover:!border-black hover:!text-black !shadow-none hover:!shadow-none">
                     Delete <DeleteOutlined />
                  </Button>
               </div>
            </div>
         </Modal>
      </AdminDashboardLayout>
   );
};

export default page;
