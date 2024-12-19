import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { follow } from '../../../service/user';
import { unfollow } from '../../../service/user';
import withSessionUser from '../../../util/session';

export async function PUT(req) {
  return withSessionUser(async (session) => {
    const { id: targetId, follow: isFollow } = await req.json();

    // == null : undifined or null
    // === undifined : undifiend
    if (!targetId || isFollow == null) {
      return new Response('Bad Requesst', { status: 400 });
    }

    const request = isFollow ? follow : unfollow;

    return request(session.id, targetId) // userId, tartgetId
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
