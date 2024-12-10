import { client, urlFor } from './sanity';

const simplePostProjection = `
...,
"username":author->username,
"userImage":author->image,
"likes":likes[]->username,
"text":comments[0].comment,
"image":photo,
"comments":count(comments),
"id":_id,
"createdAt":_createdAt,
`;

export async function getFollowingPostsOf(username) {
  console.log(`username =>`, { username });
  // 1. username을 가지고 following을 받아와서 그 following의 username, Image를 가져옴
  // 2. 그 username으로 post의 author에 해당하는 정보를 가져옴
  return client
    .fetch(
      `
    *[_type == "post" && author->username=="${username}" 
    || author._ref in *[_type == "user" && username=="${username}"].following[]._ref] | order(_createdAt desc)
    {${simplePostProjection}}
    `
    )
    .then((posts) =>
      posts.map((post) => ({
        ...post,
        image: urlFor(post.image),
      }))
    );
}
