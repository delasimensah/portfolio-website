import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/services/supabase/server";

/**
 * OAuth Callback Route Handler
 *
 * This route handles OAuth callbacks from providers (Google, Apple, etc.).
 * It exchanges the authorization code for a Supabase session.
 *
 * Flow:
 * 1. OAuth provider redirects here with code or error
 * 2. Exchange code for session (server-side has access to PKCE code verifier in cookies)
 * 3. Session is stored in cookies automatically by Supabase
 * 4. Redirect to client callback page to complete authentication
 *
 * Customize:
 * - Error redirect paths based on your auth page location
 * - Success redirect path based on your app structure
 * - Add additional session processing if needed
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const origin = request.nextUrl.origin;

    // Check for OAuth errors
    if (error) {
      console.error("OAuth error:", error);
      // Customize: Update redirect path to match your auth page
      return NextResponse.redirect(
        `${origin}/auth?error=${encodeURIComponent(error)}`
      );
    }

    // Check if code is present
    if (!code) {
      console.error("No authorization code provided");
      // Customize: Update redirect path to match your auth page
      return NextResponse.redirect(`${origin}/auth?error=no_code`);
    }

    const supabase = await createClient();

    // Exchange code for session (server-side has access to PKCE code verifier in cookies)
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      // Customize: Update redirect path to match your auth page
      return NextResponse.redirect(
        `${origin}/auth?error=${encodeURIComponent(exchangeError.message)}`
      );
    }

    if (!data.session) {
      console.error("No session returned from code exchange");
      // Customize: Update redirect path to match your auth page
      return NextResponse.redirect(`${origin}/auth?error=no_session`);
    }

    // Session is now stored in cookies automatically by Supabase
    // Redirect to client callback page to complete any additional auth steps
    // Customize: Update redirect path based on your app structure
    // If you don't need a client callback page, redirect directly to your home/dashboard
    return NextResponse.redirect(`${origin}/auth/callback`);
  } catch (error) {
    console.error("Callback error:", error);
    const origin = request.nextUrl.origin;
    // Customize: Update redirect path to match your auth page
    return NextResponse.redirect(`${origin}/auth?error=internal_error`);
  }
}
