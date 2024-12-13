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
    .then(mapPosts);
}

export async function getPost(id) {
  return client
    .fetch(
      `*[_type == "post" && _id=="${id}"][0]{
    ...,
    "username": author->username,
    "userImage":author->imagee,
    "image":photo,
    "likes": likes[]->username,
    comments[]{comment, "username":author->username,"image":author->image},
    "id":_id,
    "createdAt":_createdAt
} `
    )
    .then((post) => ({ ...post, image: urlFor(post.image) }));
}

export async function getPostsOf(username) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}
export async function getLikedPostsOf(username) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}
export async function getSavedPostsOf(username) {
  return client
    .fetch(
      `*[_type == "post" && _id in *[_type=="user" && username=="${username}"].bookmarks[]._ref]
      | order(_createdAt desc){
        ${simplePostProjection}
      }`
    )
    .then(mapPosts);
}

function mapPosts(posts) {
  return posts.map((post) => ({
    ...post,
    image: urlFor(post.image),
  }));
}

export async function likePost(postId, userId) {
  return client
    .patch(postId) //
    .setIfMissing({ likes: [] })
    .append('likes', [
      {
        _ref: userId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId, userId) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit();
}
