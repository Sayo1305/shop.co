/** @format */

import React, { useState, useEffect, useMemo } from "react";
import { ColorPicker, notification } from "antd"; // Assuming you're using Ant Design for notifications
import { useSession } from "next-auth/react";

interface Props {
   title: string;
   id: number;
   selectVariationOption: VariantItem[];
   setSelectVariationOption: React.Dispatch<React.SetStateAction<VariantItem[]>>;
}

interface VariantItem {
   variation_option_id: number;
   name: string;
   variation_id: number;
}

const VariationOptionCard: React.FC<Props> = ({
   title,
   id,
   selectVariationOption,
   setSelectVariationOption,
}) => {
   const [variationOptions, setVariationOptions] = useState<VariantItem[]>([]);
   const { data: session, status } = useSession() as any;

   const fetchVariationOptions = useMemo(() => {
      return async () => {
         try {
            const res = await fetch(`/api/admin/getVariationOptions?id=${id}`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${session?.user?.token}`,
               },
            });
            if (res.ok) {
               const data = await res.json();
               setVariationOptions(data.data?.variation_options);
            } else {
               const data = await res.json();
               console.error(data);
               notification.error({ message: "Error in fetching data" });
            }
         } catch (err) {
            console.error("Error in fetching data: ", err);
            notification.error({ message: "Error in fetching data" });
         }
      };
   }, [id, session?.user?.token]);

   useEffect(() => {
      if (session && id !== null) {
         fetchVariationOptions();
      }
   }, [fetchVariationOptions, session, id]);

   const handleSelectVariationOption = (option: VariantItem) => {
      setSelectVariationOption((prevOptions) => {
         const isSelected = prevOptions.some(
            (o) => o.variation_option_id === option.variation_option_id
         );
         if (isSelected) {
            return prevOptions.filter((o) => o.variation_option_id !== option.variation_option_id);
         } else {
            return [...prevOptions, option];
         }
      });
   };

   return (
      <div className="w-1/4 border  p-5 rounded-md ">
         <div className="text-center font-medium">{title}</div>
         <div className="w-full h-[1px] my-2 bg-black"></div>
         {variationOptions.length > 0 &&
            variationOptions.map((variation) => {
               return (
                  <div className="text-start flex cursor-pointer items-center gap-2">
                     <span
                        onClick={() => handleSelectVariationOption(variation)}
                        className={`w-3 h-3 rounded-full block ${
                           selectVariationOption.some(
                              (o) => o.variation_option_id === variation.variation_option_id
                           )
                              ? "bg-green-500"
                              : "bg-black"
                        }`}
                     ></span>
                     {variation.name.includes("#") ? <ColorPicker value={variation.name}/> : variation.name}
                     {/* {variation.name} */}
                  </div>
               );
            })}
         {variationOptions.length === 0 && <div className="text-center">No Variations</div>}
      </div>
   );
};

export default VariationOptionCard;
