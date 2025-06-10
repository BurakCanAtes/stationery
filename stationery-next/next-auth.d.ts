import "next-auth";

import { UserRoles } from "@/lib/types/responses/user.type";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as
   * a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken: string;
    error?: string;
    user?: User & Session["user"];
  }

  // TODO: update wishlist and addresses types
  interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string | null;
    role: UserRoles;
    wishlist: any[];
    addresses: any[];
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    email: string;
    accessToken: string;
    iat?: number;
    exp?: number;
    jti?: string;
  }
}