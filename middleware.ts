import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req) {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ req, token }) => {
                const protectedPaths = [
                    '/dashboard',
                    '/booking',
                    '/my-trip',
                    '/profile',
                    '/checkout'
                ]
                const isProtected = protectedPaths.some(path =>
                    req.nextUrl.pathname.startsWith(path)
                )
                if (isProtected) return !!token
                return true
            }
        }
    }
)

export const config = {
    matcher: ['/((?!api|_next|fonts|images|favicon.ico).*)']
}
