import { NEXT_PUBLIC_API_BASE_URL } from "../../../../../config";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   if (req.method === "POST") {
      try {
         const body = await req.json();
         const token  = req.headers.get("authorization") || "";
         const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/category/create_category`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: token,
            },
            body: JSON.stringify(body),
         });
         if(res.ok){
            const data = await res.json();
            return Response.json({ data }, { status: 200 });
         }else{
            return Response.error()
         }
      } catch (error) {
         console.log(error);
         return Response.json({ msg: "Error" , error : error }, { status: 404 });
      }
   } else {
      return Response.json({ msg: "method not allowed" }, { status: 403 });
   }
}
