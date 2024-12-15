import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { addBookMark } from '../../../service/user';
import { removeBookMark } from '../../../service/user';

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  const { id, bookmark } = await req.json();

  if (!id || bookmark === undefined) {
    return new Response('Bad Requesst', { status: 400 });
  }

  const request = bookmark ? addBookMark : removeBookMark;

  return request(session.id, id) // userId, postId
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
