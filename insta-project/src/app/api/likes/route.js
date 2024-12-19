import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { likePost } from '../../../service/posts';
import { dislikePost } from '../../../service/posts';
import withSessionUser from '../../../util/session';

export async function PUT(req) {
  return withSessionUser(async (session) => {
    const { id, like } = await req.json();

    if (!id || like === undefined) {
      return new Response('Bad Requesst', { status: 400 });
    }

    const request = like ? likePost : dislikePost;

    return request(id, session.id) // postId, userId
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
