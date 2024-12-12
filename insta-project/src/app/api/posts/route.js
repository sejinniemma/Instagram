import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { getFollowingPostsOf } from '../../../service/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  return getFollowingPostsOf(session.username).then((data) =>
    NextResponse.json(data)
  );
}
