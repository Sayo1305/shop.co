/** @format */

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   if (req.method === "POST") {
      try {
         // Getting form data
         const body = await req.formData();
         // Uploading files using multer
         const token  = req.headers.get("authorization") || "";
         const res = await fetch("http://localhost:8080/api/product/create_product", {
            method: "POST",
            headers: {
               authorization: token,
            },
            body: body,
         });

         if(res.ok){
            const data = await res.json();
            return Response.json({ data }, { status: 200 });
         }else{
            return Response.error()
         }
      } catch (error) {
         console.error(error);
         return Response.json({ msg: "Error", error: error }, { status: 500 });
      }
   } else {
      return Response.json({ msg: "Method not allowed" }, { status: 403 });
   }
}
