import { addUser } from '../../service/user';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
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
    async session({ session, token }) {
      return {
        ...session.user,
        username: session.user.email.split('@')[0],
        id: token.id,
      }; // The return type will match the one returned in `useSession()`
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
