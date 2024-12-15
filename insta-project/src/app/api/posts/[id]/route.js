import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../app/lib/auth';
import { getPost } from '../../../../service/posts';
import { NextResponse } from 'next/server';

export async function GET(request, context) {
  const session = await getServerSession(authOptions);

  if (!session || !session.email) {
    return new Response('Authentication error', { status: 401 });
  }

  const { id } = await context.params;

  if (!id) {
    return new Response('Bad Request', { status: 400 });
  }

  try {
    const post = await getPost(id);
    return NextResponse.json(post);
  } catch (error) {
    return new Response('Error fetching post', { status: 500 });
  }
}
