import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { addComment } from '../../../service/posts';
import withSessionUser from '../../../util/session';

export async function POST(req) {
  return withSessionUser(async (session) => {
    const { id, comment } = await req.json();

    if (!id || comment === undefined) {
      return new Response('Bad Requesst', { status: 400 });
    }

    return addComment(id, session.id, comment) // postId, userId
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
