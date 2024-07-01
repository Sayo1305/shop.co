/** @format */
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Inter, Source_Code_Pro, Lato, Rubik, Montserrat } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StoreProvider from "./StoreProvider";
import { NextAuthProvider } from "@/utils/nextAuthProvider";
import { Toaster } from "react-hot-toast";

const inter_init = Inter({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   variable: "--font-inter",
});

const lato_init = Lato({
   subsets: ["latin"],
   weight: ["100", "300", "400", "700", "900"],
   variable: "--font-lato",
});

const montserrat_init = Montserrat({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
   variable: "--font-montserrat",
});

const rubik_init = Rubik({
   subsets: ["latin"],
   weight: ["300", "400", "500", "600", "700", "800", "900"],
   variable: "--font-rubik",
});

const sourcecode = Source_Code_Pro({
   subsets: ["latin"],
   display: "swap",
   variable: "--font-code",
});

export const metadata: Metadata = {
   title: "Shop.co",
   description: "Generated by create next app",
};

interface RootLayoutProps {
   children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
   return (
      <html lang="en">
         <NextAuthProvider>
            <StoreProvider>
               <ConfigProvider
                  theme={{
                     components: {
                        Button: {
                           defaultShadow: "none",
                        },
                     },
                  }}
               >
                  <body
                     className={`${sourcecode.variable} ${inter_init.variable} ${montserrat_init.variable} ${lato_init.variable} ${rubik_init.variable} `}
                  >
                     <Toaster />
                     <AntdRegistry>{children}</AntdRegistry>
                  </body>
               </ConfigProvider>
            </StoreProvider>
         </NextAuthProvider>
      </html>
   );
}
