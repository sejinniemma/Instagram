import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../app/lib/auth';
import { getUserByUsername } from '../../../service/user';

export async function GET() {
  // req header안의, 쿠키 안의 토큰을 보낸것을 가지고 서버에서 판별한다.
  // 로그인이 되었음면 그 다음 클라이언트가 서버에 무언가를 요청보낼때 헤더에 자동으로 그 토큰을 담아서 보낸다.
  // 하지만 지금은 next-auth에서 제공해주는 session을 활용해 볼 수 있다.
  const session = await getServerSession(authOptions);
  const userEmail = session.email;

  console.log(`session =>`, session.username);
  if (!userEmail) {
    return new Response('Authentication error', { status: 401 });
  }

  return getUserByUsername(session.username).then((data) =>
    NextResponse.json(data)
  );
}
