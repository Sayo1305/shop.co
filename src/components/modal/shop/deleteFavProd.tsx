/** @format */
"use client";
import Modal from "@mui/material/Modal";
import { notification } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { NEXT_PUBLIC_API_BASE_URL } from "../../../../config";
import { useSession } from "next-auth/react";
interface deleteFavProductType {
   open: boolean;
   setOpen: (open: boolean) => void;
   product_id: number;
   handle_delete_product: (id: number) => void;
}

const style = {
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
};
const DeleteFavProd: React.FC<deleteFavProductType> = ({
   open,
   setOpen,
   product_id,
   handle_delete_product,
}) => {
   const [loading, setLoading] = useState<boolean>(false);
   const { data: session, status } = useSession() as any;
   const handle_remove = async () => {
      try {
         setLoading(true);
         const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/favourite/remove_from_fav`, {
            method: "POST", // the HTTP method
            headers: {
               "Content-Type": "application/json",
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: JSON.stringify({
               product_id: product_id,
            }),
         });
         if (response.ok) {
            handle_delete_product(product_id);
            notification.success({ message: "Product removed successfully" });
            setOpen(false);
         } else {
            notification.error({ message: "Failed to remove product" });
         }
      } catch (err) {
         console.error(err);
      } finally {
         setLoading(false);
      }
   };
   return (
      <Modal
         open={open}
         onClose={() => {
            setOpen(false);
         }}
      >
         <div
            style={style}
            className="w-[600px] h-auto bg-white absolute outline-none rounded-md"
         >
            <div className="font_rubik_custom p-3 px-5  font-medium text-lg">Delete product</div>
            <div className="w-full h-[0.6px] bg-black"></div>
            <div className="flex flex-col gap-5 px-5 py-6">
               <div className="font_rubik_custom text-sm">
                  Are you sure you want to delete this product?
               </div>

               <div className="flex items-center justify-center  gap-2">
                  <button
                     onClick={() => {
                        setOpen(false);
                     }}
                     className="p-1 px-4 bg-black text-white rounded-md hover:bg-slate-600"
                  >
                     Cancel
                  </button>
                  <button
                     onClick={() => {
                        // setOpen(false);
                        handle_remove();
                     }}
                     className="p-1 px-4 bg-red-400 text-white rounded-md hover:bg-red-500"
                  >
                     Delete
                  </button>
                  {loading && (
                     <img
                        className="w-7 h-7 animate-spin"
                        src="https://res.cloudinary.com/dqpirrbuh/image/upload/v1719350777/loading-loader-svg_jv6zvi.png"
                        alt="Loading icon"
                     />
                  )}
               </div>
            </div>
         </div>
      </Modal>
   );
};

export default DeleteFavProd;
