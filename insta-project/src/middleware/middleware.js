import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req });

  // api호출인 경우 : auth error
  if (!token) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse('Authentication Error', { status: 401 });
    }

    // 페이지 요청인 경우  : sign in page로 이동
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      'callbackUrl',
      `${basePath}${pathname}${search}`
    );
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/new',
    '/',
    '/api/bookmarks',
    '/api/comments',
    '/api/likes',
    '/api/follow',
    '/api/me',
    '/api/posts/:path*',
  ],
};
