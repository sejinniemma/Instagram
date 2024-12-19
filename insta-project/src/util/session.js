import { getServerSession } from 'next-auth';
import { authOptions } from '../app/lib/auth';

export default async function withSessionUser(handler) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  return handler(session);
}
