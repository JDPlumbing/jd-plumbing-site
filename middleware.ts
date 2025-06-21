// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isPortalRoute = pathname.startsWith("/portal");

  const adminOnlyRoutes = ["/admin/settings", "/admin/people", "/admin/audit"];

  if (!token) {
    if (isAdminRoute || isPortalRoute) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isAdminRoute && token.role === "customer") {
    return NextResponse.redirect(new URL("/portal/dashboard", req.url));
  }

  if (adminOnlyRoutes.some((r) => pathname.startsWith(r)) && token.role !== "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isPortalRoute && token.role !== "customer") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}
