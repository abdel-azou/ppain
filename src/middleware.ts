import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const CANONICAL_HOST = 'pain-patisserie.be';
const REDIRECT_FROM = ['painpatisserie.be', 'www.painpatisserie.be', 'www.pain-patisserie.be'];

export function middleware(request: NextRequest) {
    const host = request.headers.get('host') ?? '';
    const bare = host.replace(/:\d+$/, '');

    if (REDIRECT_FROM.includes(bare)) {
        const url = request.nextUrl.clone();
        url.host = CANONICAL_HOST;
        url.port = '';
        return NextResponse.redirect(url, { status: 301 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next|favicon|api).*)'],
};
