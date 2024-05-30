/** @format */

import { NEXT_PUBLIC_API_BASE_URL } from "../../../../../config";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
   if (req.method === "GET") {
      try {
         const { searchParams } = new URL(req.url);
         const id = searchParams.get("id");
         const token = req.headers.get("authorization") || "";
         const res = await fetch(
            `${NEXT_PUBLIC_API_BASE_URL}/product/product/${id}`,
            {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: token,
               },
            }
         );
         if (res.ok) {
            const data = await res.json();
            return Response.json({ data }, { status: 200 });
         } else {
            return Response.error();
         }
      } catch (error) {
         console.log(error);
         return Response.json({ msg: "Error", error: error }, { status: 404 });
      }
   } else {
      return Response.json({ msg: "method not allowed" }, { status: 403 });
   }
}
