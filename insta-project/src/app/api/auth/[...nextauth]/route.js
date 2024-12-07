import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { addUser } from '../../../../service/user';
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user: { id, email, name, image } }) {
      addUser({
        id,
        username: email.split('@')[0],
        name,
        email,
        image,
      });
      return true;
    },
    async session({ session }) {
      console.log(`session =>`, { session });
      return { ...session.user, username: session.user.email.split('@')[0] }; // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
