/** @format */

"use client";
import AdminDashboardLayout from "@/components/adminDashboardlayout";
import { Form, Input, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";

const page = () => {
      const [openAddMoreCatModal , setAddMoreCatModal] = useState<Boolean>(false);
   const props: UploadProps = {
      name: "file",
      action: "",
      headers: {
         authorization: "authorization-text",
      },
      onChange(info) {
         if (info.file.status !== "uploading") {
            console.log(info.file, info.fileList);
         }
         if (info.file.status === "done") {
            message.success(`${info.file.name} file uploaded successfully`);
         } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
         }
      },
   };
   return (
      <AdminDashboardLayout>
         <div className="">
            <div className="px-10 py-5 border-b bg-white text-2xl font-medium">
               Create Product form
            </div>
            <div className="px-10 py-5">
               <Form layout="vertical">
                  <FormItem label="image" className="px-10 w-1/3">
                     <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                     </Upload>
                  </FormItem>
                  <FormItem
                     label="Name"
                     className="px-10"
                  >
                     <Input  className="!w-1/2"/>
                  </FormItem>
                  <FormItem
                     label="Product description"
                     className="px-10"
                  >
                     <TextArea  className="!w-1/2"/>
                  </FormItem>
                  <FormItem
                     label="Category"
                     className="px-10"
                  >
                     <Select onChange={(e)=>{if(e === "more")setAddMoreCatModal(true)}} className="!w-1/2">
                        <Option value="more">+ Add More Option</Option>
                     </Select>
                  </FormItem>
                  <FormItem
                     label="Name"
                     className="px-10"
                  >
                     <Input  className="!w-1/2"/>
                  </FormItem>
               </Form>
            </div>
         </div>
         <Modal footer={null}>

         </Modal>
      </AdminDashboardLayout>
   );
};

export default page;
