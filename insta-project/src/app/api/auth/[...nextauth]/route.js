import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { redirect } from 'next/dist/server/api-utils';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
