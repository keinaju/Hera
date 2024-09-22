import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/session.js';

const protectedRoutes = [
    '/create/place',
    '/create/product',
    '/user',
];

export default async function middleware(req) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);

    if (isProtectedRoute) {
        const { isAuth } = await verifySession();
        if (!isAuth) {
            const body = { message: 'Invalid credentials.' };
            const options = { status: 401 };
            return NextResponse.json(body, options);
        }
    } else {
        return NextResponse.next();
    }
}

// Routes Middleware should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};