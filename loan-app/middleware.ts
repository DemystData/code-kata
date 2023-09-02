// import { getToken } from 'next-auth/jwt';
// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// // For the time being, the withAuth middleware only supports "jwt" as session strategy.
// export default withAuth(async function middleware(req) {
//   const token = await getToken({ req });
//   // if token exists, !!token will be true
//   const isAuthenticated = !!token;

//   // first, check if the current path is login page
//   if (req.nextUrl.pathname.startsWith('/user/login') && isAuthenticated) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
//   if (req.nextUrl.pathname.startsWith('/user/register') && isAuthenticated) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }
// });

export { default } from 'next-auth/middleware';

export const config = { matcher: ['/user/dashboard'] };
