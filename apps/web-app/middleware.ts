import { type NextRequest } from "next/server";

import { updateSession } from "@/services/supabase/middleware";

/**
 * Next.js Middleware
 *
 * This middleware runs on every request and:
 * 1. Refreshes Supabase session cookies
 * 2. Keeps authentication state in sync
 *
 * The updateSession function handles Supabase session management.
 * Customize route protection logic here if needed.
 */
export async function middleware(request: NextRequest) {
  // Update Supabase session (always run this)
  const response = await updateSession(request);

  // Customize: Uncomment to add route protection
  // import { createServerClient } from "@/services";
  // const supabase = await createServerClient();
  // const { data: { user } } = await supabase.auth.getUser();
  //
  // const { pathname } = request.nextUrl;
  //
  // // Protect main app routes - require authentication
  // if (pathname.startsWith("/(main-app)") && !user) {
  //   return NextResponse.redirect(new URL("/auth", request.url));
  // }
  //
  // // Protect onboarding routes - require authentication but not onboarding
  // if (pathname.startsWith("/(onboarding)") && (!user || user.user_metadata?.hasOnboarded)) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }
  //
  // // Redirect authenticated users away from auth pages
  // if (pathname.startsWith("/(auth)") && user) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return response;
}

/**
 * Middleware matcher configuration
 *
 * Excludes static files, Next.js internals, and image assets.
 * Customize the matcher pattern based on your needs.
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
