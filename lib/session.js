import 'server-only';
import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encodedKey);
}

export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
    }
}

export async function createSession(userId) {
    const session = await encrypt({ userId });
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'strict',
        path: '/',
    });
}

export function deleteSession() {
    cookies().delete('session');
}

export async function updateSession() {
    const session = cookies().get('session')?.value;
    const payload = await decrypt(session);

    if (!session || !payload) return null;

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'strict',
        path: '/',
    });
}

export async function verifySession() {
    const cookie = cookies().get('session')?.value;
    if (!cookie) return { isAuth: false };

    const session = await decrypt(cookie);
    if (!session?.userId) return { isAuth: false };
    else return { isAuth: true, userId: session.userId };
}