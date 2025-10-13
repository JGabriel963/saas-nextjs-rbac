import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = !!token;

  const { pathname } = request.nextUrl;

  // Páginas públicas
  const isPublicPage =
    pathname.startsWith("/auth/sign-in") ||
    pathname.startsWith("/auth/sign-up");

  // Se não está autenticado e tenta acessar página privada
  if (!isAuthenticated && !isPublicPage) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  // Se está autenticado e tenta acessar página de login
  if (isAuthenticated && isPublicPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
