import { auth } from '@/auth';
import { apiAuthPrefix, loginRoute } from './routes';

export default auth((req) => {
  const { auth, nextUrl } = req;

  const isLoggedIn = !!auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) return null;

  const isLoginRoute = nextUrl.pathname === loginRoute;

  if (isLoggedIn && isLoginRoute) {
    return Response.redirect(new URL('/home', nextUrl));
  }

  if (!isLoggedIn && !isLoginRoute) {
    let callbackUrl = nextUrl.pathname;

    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
