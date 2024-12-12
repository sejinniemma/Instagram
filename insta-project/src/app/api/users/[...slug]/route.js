import { NextResponse } from 'next/server';
import {
  getPostsOf,
  getLikedPostsOf,
  getSavedPostsOf,
} from '../../../../service/posts';

export async function GET(req, context) {
  const { slug } = await context.params;

  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const [username, query] = slug;

  let request = getPostsOf;
  if (query === 'saved') {
    request = getSavedPostsOf;
  } else if (query === 'liked') {
    request = getLikedPostsOf;
  } else {
    request = getPostsOf;
  }

  return request(username).then((data) => NextResponse.json(data));
}
