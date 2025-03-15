import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;

    if (request.nextUrl.pathname.startsWith("/")) {
        if (!token && request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        if (token && request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL('/ma', request.url));
        }
        if (token && request.nextUrl.pathname === "/auth/login") {
            return NextResponse.redirect(new URL('/ma', request.url));
        }
    }
    if (request.nextUrl.pathname.startsWith("/ma")) {
        if (!token) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        
        if (token && request.nextUrl.pathname === "/ma") {
            return NextResponse.redirect(new URL('/ma/matches', request.url));
        }
    }
    return NextResponse.next();
}