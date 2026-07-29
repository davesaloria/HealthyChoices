import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Add security headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('X-Forwarded-For', request.ip || '')

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
