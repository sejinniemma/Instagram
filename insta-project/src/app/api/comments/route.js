import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { addComment } from '../../../service/posts';

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  const { id, comment } = await req.json();

  if (!id || comment === undefined) {
    return new Response('Bad Requesst', { status: 400 });
  }

  return addComment(id, session.id, comment) // postId, userId
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
