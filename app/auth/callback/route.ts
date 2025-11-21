// app/auth/callback/route.ts

import { createRouteHandlerClient } from '@supabase/ssr';  
import { cookies } from 'next/headers';  
import { NextResponse } from 'next/server';  

export const GET = async (request: Request) => {  
  const url = new URL(request.url);  
  const code = url.searchParams.get('code');  
  const access_token = url.searchParams.get('access_token');  
  const refresh_token = url.searchParams.get('refresh_token');  
  const redirectPath = '/dashboard';  // where you want to send user after login  

  const supabase = createRouteHandlerClient({ cookies });

  // If there's a `code` param (PKCE / code-exchange flow)
  if (code) {  
    await supabase.auth.exchangeCodeForSession(code);  
  }  
  // If there's a magic link with tokens
  else if (access_token && refresh_token) {  
    await supabase.auth.setSession({ access_token, refresh_token });  
  }

  // Finally, redirect to dashboard
  return NextResponse.redirect(new URL(redirectPath, request.url));  
};
