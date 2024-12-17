import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { getFollowingPostsOf, createPost } from '../../../service/posts';
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

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  const form = await req.formData();
  const text = form.get('text')?.toString();
  const file = form.get('file');

  if (!text || !file) {
    return new Response('Bad Requesst', { status: 400 });
  }

  return createPost(session.id, text, file).then((data) =>
    NextResponse.json(data)
  );
}
