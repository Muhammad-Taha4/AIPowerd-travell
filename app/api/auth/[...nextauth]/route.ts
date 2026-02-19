import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const providers = [];

// Only add Google provider if credentials are provided in env
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push(
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    );
}

providers.push(
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            try {
                const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
                const res = await fetch(`${apiBase}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (res.ok && data.token) {
                    return {
                        id: data.user.id.toString(),
                        email: data.user.email,
                        name: data.user.name || data.user.email,
                        accessToken: data.token,
                        role: data.user.role
                    };
                }
            } catch (error) {
                console.error("Auth Error:", error);
            }
            return null;
        }
    })
);

const handler = NextAuth({
    providers,
    callbacks: {
        async jwt({ token, user }: { token: any, user: any }) {
            if (user) {
                token.accessToken = user.accessToken;
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: { session: any, token: any }) {
            if (token) {
                session.user.accessToken = token.accessToken;
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/login', // Redirect back to login on error
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
