import { getAllUsers } from '../../../service/user';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // 그냥 GET()으로 아무것도 인자를 받지 않고 변화 없을 떄 SSG로 나오니
// 그걸 원하지 않는다 면 다이나믹 코드를 붙혀주어야함.

export async function GET(request) {
  const user = request.nextUrl.searchParams;
  console.log(`user =>`, { user });
  return getAllUsers(user.keyword).then((data) => NextResponse.json(data));
}
