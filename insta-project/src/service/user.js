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
