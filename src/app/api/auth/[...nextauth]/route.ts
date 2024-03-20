/** @format */

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { NEXT_PUBLIC_API_BASE_URL } from "../../../../../config";

interface CustomUser {
   name?: string;
   email?: string;
   image?: string;
   token?: string; // Define token property in the user object
 }
 
export const authConfig: NextAuthOptions = {
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            username: {
               label: "Username",
               type: "text",
               placeholder: "Username",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "Password",
            },
         },
         async authorize(credentials) {
            if (!credentials || !credentials.username || !credentials.password) {
               return null;
            }
            try {
               const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/user/login`, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     email: credentials.username,
                     password: credentials.password,
                  }),
               });
               if (res.ok) {
                  const data = await res.json();
                  return data?.data;
               } else {
                  return null;
               }
            } catch (err) {
               console.error(err);
               return null;
            }
         },
      }),
      GitHubProvider({
         clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || "",
         clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET_ID || "",
      }),
   ],
   callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
         if (!credentials || !credentials.username || !credentials.password) {
            return null;
         }
         try {
            const res = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/user/login`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  email: credentials.username,
                  password: credentials.password,
               }),
            });
            if (res.ok) {
               const data = await res.json();
               return data?.data;
            } else {
               return null;
            }
         } catch (err) {
            console.error(err);
            return null;
         }
      },
      async redirect({ url, baseUrl }) {
         if (url.includes("/admin")) return `${baseUrl}/admin/dashboard`
         return baseUrl
      },
      async session({ session, user, token }) {
         if (token && token.accessToken) {
            session.user = token.accessToken;
          }
         return session;
      },
      async jwt({ token, user, account, profile }) {
         if (user) {
            token.accessToken = user;
          }
         return token;
      },
   },

   secret: process.env.NEXT_PUBLIC_JWT_SECRET,
};
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };
