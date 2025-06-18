import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const res = NextResponse.next();

  const token = await getToken({ req });
  const pathNames = pathname.split("/");

  if ((pathNames[1] === "auth" && token) || pathNames[1] === "") {
    const url = new URL('/products', req.url);
    return NextResponse.redirect(url);
  }
  if (pathNames[1] !== "auth" && !token) {
    const url = new URL('/auth/login', req.url);
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    "/cart:path*",
    "/auth/:path*",
    "/",
  ],
};
