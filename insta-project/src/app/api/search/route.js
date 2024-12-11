import { getAllUsers } from '../../../service/user';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const user = request.nextUrl.searchParams;
  console.log(`user =>`, { user });
  return getAllUsers(user.keyword).then((data) => NextResponse.json(data));
}