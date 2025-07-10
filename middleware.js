// // middleware.js (in your root directory)
// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt'; // If you're using NextAuth.js
// // Or use your own auth token verification method

// export async function middleware(request) {
//   // Get the pathname of the request
//   const path = request.nextUrl.pathname;
  
//   // Define auth routes (pages that should not be accessible when logged in)
//   const authRoutes = ['/login', '/register', '/signup', '/signin'];
  
//   // Check if the current path is an auth route
//   const isAuthRoute = authRoutes.some(route => path.startsWith(route));
  
//   // Check if the path is a protected interview subpath
//   // This will match paths like /interview/abc but NOT /interview itself
//   const isProtectedInterviewSubpath = path.startsWith('/interview/');

//   const isProtectedVoiceInterviewSubpath = path.startsWith('/voice_interview/');

  
  
//   // Get the user token (depends on your auth solution)
//   //const token = await getToken({ req: request });
//   //const token = request.cookies.get('auth-token')?.value;
//   const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
//   const isAuthenticated = !!token;
  
//   console.log('Path:', path, 'Is protected interview subpath:', isProtectedInterviewSubpath);
  
//   // If the user is logged in and trying to access auth routes, redirect to home
//   if (isAuthenticated && isAuthRoute) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }
  

//    if (!isAuthenticated && (isProtectedInterviewSubpath || isProtectedVoiceInterviewSubpath)) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // if (!isAuthenticated && isProtectedVoiceInterviewSubpath) {
//   //   return NextResponse.redirect(new URL('/login', request.url));
//   // }
  
//   // If the user is not logged in and trying to access protected interview subpaths, redirect to login
//   if (!isAuthenticated && isProtectedInterviewSubpath) {
//     console.log('Unauthorized access attempt to protected interview subpath:', path);
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
  
//   // Continue with the request otherwise
//   return NextResponse.next();
// }

// // Configure which paths the middleware should run on
// export const config = {
//   matcher: [
//     '/login',
//     '/register', 
//     '/signup', 
//     '/signin',
//     '/interview/:path*',  // This will match all subpaths under /interview but NOT /interview itself
//     '/voice_interview/:path*'
//   ]
// };
// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const authRoutes = ['/login', '/register', '/signup', '/signin'];
  const isProtected = path.startsWith('/interview/') || path.startsWith('/voice_interview/');

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  let isAuthenticated = !!token;

  if (token?.djangoToken) {
    try {
      const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token.djangoToken }),
      });

      if (!verifyRes.ok) {
        console.warn('⛔ Invalid or expired token');
        isAuthenticated = false;
      }
    } catch (e) {
      console.error('❌ Token check failed:', e);
      isAuthenticated = false;
    }
  } else {
    isAuthenticated = false;
  }

  if (!isAuthenticated && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthenticated && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/signup',
    '/signin',
    '/interview/:path*',
    '/voice_interview/:path*',
  ],
};
