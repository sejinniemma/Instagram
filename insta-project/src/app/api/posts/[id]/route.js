import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../app/lib/auth';
import { getPost } from '../../../../service/posts';
import { NextResponse } from 'next/server';
import withSessionUser from '../../../../util/session';

export async function GET(_, context) {
  return withSessionUser(async () => {
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
  });
}
