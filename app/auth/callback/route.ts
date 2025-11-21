// app/auth/callback/route.ts

import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const access_token = url.searchParams.get("access_token");
  const refresh_token = url.searchParams.get("refresh_token");

  // FIX: cookies() is async in Next.js 15
  const cookieStore = await cookies();

  // Create Supabase client with cookies wiring
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: any) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    },
  );

  // CASE 1: PKCE code exchange
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  // CASE 2: Magic link tokens
  if (access_token && refresh_token) {
    await supabase.auth.setSession({
      access_token,
      refresh_token,
    });
  }

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
