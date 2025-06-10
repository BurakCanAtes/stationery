import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AxiosResponse } from "axios";

import { IAuthResponse } from "@/lib/types/responses/user.type";
import axiosInstance from "@/lib/tools/axios";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const { data }: AxiosResponse<IAuthResponse> =
            await axiosInstance.post(
              "/auth/local",
              {
                email: credentials?.email,
                password: credentials?.password,
              },
              { headers: { "Content-Type": "application/json" } }
            );

          if (data.jwt?.token && data.user) {
            return {
              id: data.user._id,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              email: data.user.email,
              avatar: data.user.avatar || null,
              role: data.user.role,
              wishlist: data.user.wishlist,
              addresses: data.user.addresses,
              accessToken: data.jwt.token,
            };
          }
          return null;
        } catch (err: any) {
          throw new Error(err?.response?.data?.error || "Unknown login error");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
        token.avatar = user.avatar || null;
        token.role = user.role;
        token.wishlist = user.wishlist;
        token.addresses = user.addresses;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.email = token.email;
      session.user.avatar = token?.avatar || null;
      session.user.role = token.role;
      session.user.wishlist = token.wishlist;
      session.user.addresses = token.addresses;
      session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/signup",
  },
};