/** @format */

import Image from "next/image";
import React from "react";

const CartPage = () => {
   return (
      <div className="w-full">
         <div className="w-full my-5 flex items-center flex-col justify-center">
            <span className="font-semibold font_montserrat_custom text-2xl"> Cart is empty</span>
            <Image
               width={100}
               height={100}
               className="w-1/3 h-full object-cover"
               unoptimized
               alt="icons"
               src={"/images/empty_cart.png"}
            />
         </div>
      </div>
   );
};

export default CartPage;
