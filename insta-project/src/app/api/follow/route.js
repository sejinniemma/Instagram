import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { follow } from '../../../service/user';
import { unfollow } from '../../../service/user';

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  const { id: targetId, follow: isFollow } = await req.json();

  if (!targetId || isFollow === undefined) {
    return new Response('Bad Requesst', { status: 400 });
  }

  const request = isFollow ? follow : unfollow;
  console.log(`isFollow =>`, { isFollow });
  console.log(`session ed=>`, session.id);
  console.log(`targetId=>`, targetId);
  return request(session.id, targetId) // userId, tartgetId
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
