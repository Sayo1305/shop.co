/** @format */

import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import versace from "../../public/images/versace.png";
import gucci from "../../public/images/gucci.png";
import zara from "../../public/images/zara.png";
import prada from "../../public/images/prada.png";
import calvin from "../../public/images/calvin.png";
import Image from "next/image";
import NewArrival from "@/components/newArrival";
import TopSelling from "@/components/topSelling";
import DressStyleCom from "@/components/dressStyleCom";
import Footer from "@/components/footer";
import TopSelling2 from "@/components/topSelling2";
export default function Home() {
   return (
      <main>
         <Navbar />
         <Hero />
         <div className="bg-black flex px-16 items-center justify-between py-6 w-full min-h-[10vh]">
            <div>
               <Image
                  className="w-full"
                  src={versace}
                  alt="brandIcon"
                  width={100}
                  height={100}
               />
            </div>
            <div>
               <Image
                  src={zara}
                  unoptimized
                  alt="brandIcon"
                  width={70}
                  height={40}
               />
            </div>
            <div>
               <Image
                  src={gucci}
                  alt="brandIcon"
                  width={100}
                  height={100}
               />
            </div>
            <div>
               <Image
                  src={prada}
                  alt="brandIcon"
                  width={100}
                  height={100}
               />
            </div>
            <div>
               <Image
                  src={calvin}
                  alt="brandIcon"
                  width={100}
                  height={100}
               />
            </div>
         </div>
         {/* <NewArrival/> */}
         <TopSelling />
         <TopSelling2 />
         <DressStyleCom />
         <Footer />
      </main>
   );
}
