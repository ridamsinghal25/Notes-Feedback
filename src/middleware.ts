import { NextResponse, NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { UserRolesEnum } from "./constants";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    token.role === UserRolesEnum.ADMIN &&
    (url.pathname.startsWith("/sign-in") || url.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    token &&
    token.role !== UserRolesEnum.ADMIN &&
    (url.pathname.startsWith("/sign-in") || url.pathname === "/")
  ) {
    return NextResponse.redirect(request.url);
  }

  if (
    !token &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/feedback/") ||
      url.pathname.startsWith("/access-denied"))
  ) {
    if (url.pathname.startsWith("/feedback/")) {
      return NextResponse.redirect(
        new URL(`/sign-in?callbackUrl=${url.pathname}`, request.url)
      );
    }
    return NextResponse.redirect(new URL(`/sign-in`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sign-in",
    "/",
    "/feedback/:path*",
    "/access-denied",
  ],
};
