/** @format */
"use client";
import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Input, TextField } from "@mui/material";
import { NEXT_PUBLIC_API_BASE_URL } from "../../../../config";
import { notification } from "antd";
interface EditProfileModalProps {
   open: boolean;
   setOpen: (open: boolean) => void;
}

const style = {
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)",
};
const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, setOpen }) => {
   const { data: session, status } = useSession() as any;
   const [file, setFile] = useState<FileList>();
   const [updatedUser, setUpdateUser] = useState<string>("");
   const [loading, setLoading] = useState<boolean>(false);
   const [fileurl, setFileurl] = useState<string>(session?.user?.profile_pic_url || "");
   const update_profile = async () => {
      try {
         setLoading(true);
         let formdata = new FormData();
         if (file) {
            Array.from(file).forEach((file, index) => {
               formdata.append(`files`, file);
            });
         }
         if (updatedUser !== "") {
            formdata.append("name", updatedUser);
         }
         const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/user/update_user`, {
            method: "POST",
            headers: {
               authorization: `Bearer ${session?.user?.token}`,
            },
            body: formdata as FormData,
         });
         if (res.ok) {
            const data = await res.json();
            notification.success({ message: "Profile updated successfully" });
            setOpen(false);
         }
      } catch (er) {
         console.log(er);
         notification.error({ message: "Error updating profile" });
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
            className="md:w-[500px] w-[270px] !border-none rounded-lg p-3 !outline-none h-auto bg-white absolute"
         >
            <div className="font_rubik_custom text-blue-500 font-medium text-lg underline underline-offset-1">
               Edit profile
            </div>
            <div className="my-2 flex flex-col items-center gap-5">
               <Image
                  className="rounded-full w-[100px] h-[100px] object-cover border-2 border-black"
                  src={
                     typeof fileurl === undefined ? session?.user?.profile_pic_url : fileurl || ""
                  }
                  width={100}
                  height={100}
                  alt="icons"
               />
               <div className="text-xs relative font_rubik_custom bg-black text-white inline-block p-2 cursor-pointer rounded-md">
                  Upload new image
                  <input
                     type="file"
                     onChange={(e) => {
                        if (e.target.files) setFile(e.target.files);
                        if (e.target.files) setFileurl(URL.createObjectURL(e.target.files[0]));
                     }}
                     multiple={false}
                     accept="image/png, image/jpeg, image/jpg"
                     className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />
               </div>
            </div>
            <div className="font_rubik_custom  font-medium">General information</div>
            <div className="my-2">
               <TextField
                  size="small"
                  value={updatedUser || ""}
                  onChange={(e)=>{setUpdateUser(e.target.value)}}
                  id="outlined-basic"
                  label="user_name"
                  variant="outlined"
               />
            </div>
            <div className="flex items-center gap-4">
               <button onClick={()=>{update_profile()}} className="my-2 p-2 flex items-center gap-2 bg-black text-white rounded-md px-4">
                  Submit
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     height="20px"
                     viewBox="0 -960 960 960"
                     width="20px"
                     fill="#fff"
                  >
                     <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
                  </svg>
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
      </Modal>
   );
};

export default EditProfileModal;
