import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedinProvider from 'next-auth/providers/linkedin';
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth";


export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
        }),
        LinkedinProvider({
            clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.id = token?.sub ?? '';
            }
            return session;
        },
    },
};

export default NextAuth(authOptions)
// Note: the route handler in app/api/auth/[...nextauth]/route.ts calls NextAuth(authOptions)
