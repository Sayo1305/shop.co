/** @format */

import { Button, Input, Modal, notification } from "antd";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

interface ChildProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditCategoryModal: React.FC<ChildProps> = ({ open, setOpen }) => {
      const { data: session, status } = useSession() as any;
      const [text , setText ] = useState<string> ("");
      const handle_edit = async()=>{
            try{
                  const res = await fetch("/api/admin/postEditCategory", {
                     method: "POST",
                     headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${session?.user?.token}`,
                     },
                     body: JSON.stringify({
                        id: session?.user?.id,
                     }),
                  });
                  if(res.ok){
                     const data = await res.json();
                     console.log(data);
                     setOpen(false);
                     notification.success({ message: "Category edited successfully" });
                  }else{
                     const data = await res.json();
                     console.log(data);
                     notification.error({ message: "Error in editing category" });
                  }
            }catch(err){
                  console.error("Error in saving data : " , err);
                  notification.error({message : "error saving data"});
            }
      }
   return (
      <Modal
         open={open}
         centered
         width={600}
         footer={null}
         onCancel={() => {
            setOpen(false);
         }}
      >
         <div className=" w-full border-[2px] rounded-lg p-5 border-black bg-white">
            <div>
               <div className="text-xl mb-5 font-semibold">Edit Category</div>
               <div className="text-xs my-2">Edit name</div>
               <Input
               onChange={(e)=>{setText(e.target.value)}}
               value={text}
                  size="large"
                  className="!border-2 !border-black hover:!border-black !shadow-none hover:!shadow-none"
               />
               <Button
                  size="large"
                  className="my-5 !bg-[#41C9C1] !border-2 !border-black hover:!border-black hover:!text-black !shadow-none hover:!shadow-none"
               >
                  Submit
               </Button>
            </div>
         </div>
      </Modal>
   );
};

export default EditCategoryModal;
