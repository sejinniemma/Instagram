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
    async session({ session }) {
      return { ...session.user, username: session.user.email.split('@')[0] }; // The return type will match the one returned in `useSession()`
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};
