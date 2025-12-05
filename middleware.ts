import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  console.log(
    "[Middleware] Path:",
    pathname,
    "| Token:",
    token ? "EXISTS" : "MISSING"
  );

  // Ścieżki chronione (wymagają zalogowania)
  const protectedPaths = ["/profile"];

  // Ścieżki auth (tylko dla niezalogowanych)
  const authPaths = ["/sign-in", "/sign-up"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  console.log(
    "[Middleware] isProtectedPath:",
    isProtectedPath,
    "| isAuthPath:",
    isAuthPath
  );

  // Jeśli brak tokenu i próba dostępu do chronionej strony
  if (isProtectedPath && !token) {
    console.log("[Middleware] Redirecting to /sign-in - no token");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Jeśli jest token i chroniona ścieżka - pozwól przejść
  // TODO: Odkomentuj po naprawie backendu
  // if (token && isProtectedPath) {
  //   console.log("[Middleware] Validating token for protected path");
  //   return validateTokenOnBackend(token, request);
  // }

  // Jeśli użytkownik zalogowany próbuje wejść na /sign-in lub /sign-up
  if (isAuthPath && token) {
    console.log(
      "[Middleware] Redirecting to /profile - user already logged in"
    );
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  console.log("[Middleware] Allowing request to proceed");
  return NextResponse.next();
}

// async function validateTokenOnBackend(
//   token: string,
//   request: NextRequest
// ): Promise<NextResponse> {
//   try {
//     console.log("[Middleware] Calling backend verify endpoint...");
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log(
//       "[Middleware] Backend verify response status:",
//       response.status
//     );

//     // Jeśli token nieważny, usuń cookie i przekieruj na sign-in
//     if (!response.ok) {
//       console.log("[Middleware] Token invalid, redirecting to /sign-in");
//       const redirectResponse = NextResponse.redirect(
//         new URL("/sign-in", request.url)
//       );
//       redirectResponse.cookies.delete("auth-token");
//       return redirectResponse;
//     }

//     // Token ważny, pozwól przejść dalej
//     console.log("[Middleware] Token valid, allowing access");
//     return NextResponse.next();
//   } catch (error) {
//     console.error("[Middleware] Token validation failed:", error);

//     // W przypadku błędu, usuń token i przekieruj
//     const redirectResponse = NextResponse.redirect(
//       new URL("/sign-in", request.url)
//     );
//     redirectResponse.cookies.delete("auth-token");
//     return redirectResponse;
//   }
// }

// Określ na jakich ścieżkach middleware ma działać
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
