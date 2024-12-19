import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { getUserByUsername } from '../../../service/user';
import withSessionUser from '../../../util/session';

export async function GET() {
  return withSessionUser(async (session) => {
    return getUserByUsername(session.username).then((data) =>
      NextResponse.json(data)
    );
  });
}
