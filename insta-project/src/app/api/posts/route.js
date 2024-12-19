import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { getFollowingPostsOf, createPost } from '../../../service/posts';
import { NextResponse } from 'next/server';
import withSessionUser from '../../../util/session';

export async function GET() {
  return withSessionUser(async (session) => {
    return getFollowingPostsOf(session.username).then((data) =>
      NextResponse.json(data)
    );
  });
}

export async function POST(req) {
  return withSessionUser(async (session) => {
    const form = await req.formData();
    const text = form.get('text')?.toString();
    const file = form.get('file');

    if (!text || !file) {
      return new Response('Bad Requesst', { status: 400 });
    }

    return createPost(session.id, text, file).then((data) =>
      NextResponse.json(data)
    );
  });
}
