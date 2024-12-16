import { client } from './sanity';

export async function addUser({ id, username, email, name, image }) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    following[]->{username, image},
    followers[]->{username, image},
    "bookmarks":bookmarks[]->_id,
    }`
  );
}

export async function getUserForProfile(username) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
     "following": count(following),
    "followers": count(followers),
    "posts": count(*[_type == "post" && author->username == "${username}"])
    }`
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
    }));
}

export async function getAllUsers(user) {
  const query = user
    ? `&& (name match "${user}") || (username match "${user}")`
    : '';
  return client.fetch(
    `*[_type =="user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }
  `
  );
}

export async function addBookMark(userId, postId) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookMark(userId, postId) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

// 1. 내가 팔로우 하면 상대의 follower에 그리고 내 following에 둘다 업데이트가 되어야 한다.
export async function follow(myId, targetId) {
  return client
    .transaction() //
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] }) //
        .append('following', [
          {
            _ref: targetId,
            _type: 'reference',
          },
        ])
    )
    .patch(targetId, (user) =>
      user.setIfMissing({ followers: [] }).append('followers', [
        {
          _ref: myId,
          _type: 'reference',
        },
      ])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId, targetId) {
  return client
    .transaction() //
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`followers[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}
