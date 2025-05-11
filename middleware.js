// middleware.js (in your root directory)
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // If you're using NextAuth.js
// Or use your own auth token verification method

export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;
  
  // Define auth routes (pages that should not be accessible when logged in)
  const authRoutes = ['/login', '/register', '/signup', '/signin'];
  
  // Check if the current path is an auth route
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));
  
  // Get the user token (depends on your auth solution)
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;
  
  // If the user is logged in and trying to access auth routes, redirect to dashboard
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Continue with the request otherwise
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: ['/login', '/register', '/signup', '/signin', '/dashboard/:path*']
};