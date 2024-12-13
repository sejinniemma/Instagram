import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { likePost } from '../../../service/posts';
import { dislikePost } from '../../../service/posts';

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  const { id, like } = await req.json();

  if (!id || like === undefined) {
    return new Response('Bad Requesst', { status: 400 });
  }

  const request = like ? likePost : dislikePost;
  console.log(`sessionid =>`, session.id);
  return request(id, session.id) // postId, userId
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
