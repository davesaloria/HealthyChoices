import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('X-Forwarded-For', request.ip || '')

  let response = NextResponse.next({
    request: { headers: requestHeaders },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // A missing/misconfigured Supabase env var must never take down the
  // whole site — only /admin (which needs the session) depends on this.
  if (!supabaseUrl || !supabaseAnonKey) {
    return response
  }

  try {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request: { headers: requestHeaders } })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    })

    // Refreshes the Supabase session cookie if needed — required for
    // server components under /admin to see an up-to-date auth session.
    await supabase.auth.getUser()
  } catch {
    // Swallow: session refresh is best-effort and must not 500 the site.
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
