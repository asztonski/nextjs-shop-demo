import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const VERIFY_ENDPOINT = process.env.NEXT_PUBLIC_CHECK_USER_ENDPOINT;

async function validateTokenOnBackend(
  loginToken: string,
  request: NextRequest
): Promise<NextResponse> {
  try {
    console.log("[Middleware] Validating loginToken with backend...");

    const response = await fetch(`${API_URL}/${VERIFY_ENDPOINT}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${loginToken}`,
        "Content-Type": "application/json",
      },
      // Ważne: cache na 60 sekund, żeby nie spamować backendu
      next: { revalidate: 60 },
    });

    console.log("[Middleware] Verify response status:", response.status);

    if (!response.ok) {
      console.log("[Middleware] Token/user invalid, clearing session");
      const redirectResponse = NextResponse.redirect(
        new URL("/sign-in", request.url)
      );
      redirectResponse.cookies.delete("auth-loginToken");
      return redirectResponse;
    }

    return NextResponse.next();
  } catch (error) {
    console.error("[Middleware] Token validation error:", error);
    // W przypadku błędu sieci - pozwól przejść (fail-open)
    // lub przekieruj (fail-closed) - zależy od wymagań bezpieczeństwa
    return NextResponse.next();
  }
}

export async function middleware(request: NextRequest) {
  const loginToken = request.cookies.get("auth-loginToken")?.value;
  const { pathname } = request.nextUrl;

  console.log(
    "[Middleware] Path:",
    pathname,
    "| Login Token:",
    loginToken ? "EXISTS" : "MISSING"
  );

  // Ścieżki chronione (wymagają zalogowania)
  const protectedPaths = ["/profile"];

  // Ścieżki auth (tylko dla niezalogowanych)
  const authPaths = ["/sign-in", "/sign-up"];

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Jeśli brak tokenu i próba dostępu do chronionej strony
  if (isProtectedPath && !loginToken) {
    console.log("[Middleware] Redirecting to /sign-in - no loginToken");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Jeśli jest loginToken i chroniona ścieżka - waliduj z backendem
  if (loginToken && isProtectedPath) {
    return validateTokenOnBackend(loginToken, request);
  }

  // Jeśli użytkownik zalogowany próbuje wejść na /sign-in lub /sign-up
  if (isAuthPath && loginToken) {
    console.log("[Middleware] Redirecting to /profile - already logged in");
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Strony tylko dla niezalogowanych
  const publicOnlyPages = ["/activation-required", "/account-activated"];

  if (publicOnlyPages.some((page) => pathname.startsWith(page))) {
    if (loginToken) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/activation-required/:path*",
    "/account-activated/:path*",
  ],
};
