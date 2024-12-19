import { NextResponse } from 'next/server';
import { addBookMark } from '../../../service/user';
import { removeBookMark } from '../../../service/user';
import withSessionUser from '../../../util/session';

export async function PUT(req) {
  return withSessionUser(async (session) => {
    const { id, bookmark } = await req.json();

    if (!id || bookmark === undefined) {
      return new Response('Bad Requesst', { status: 400 });
    }

    const request = bookmark ? addBookMark : removeBookMark;

    return request(session.id, id) // userId, postId
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
