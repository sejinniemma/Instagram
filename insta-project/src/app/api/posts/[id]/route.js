import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../app/lib/auth';
import { getPost } from '../../../../service/posts';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  return getPost(context.params.id).then((data) => NextResponse.json(data));
}
