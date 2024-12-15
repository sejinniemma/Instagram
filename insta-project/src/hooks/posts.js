import useSWR from 'swr';

async function updateLike(id, like) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id, comment) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const { data: posts, isLoading, error, mutate } = useSWR('/api/posts');

  const setLike = (post, username, like) => {
    // 클라이언트에서 만들어진 변경된 Post의 like
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false, // updateLike에서 반환된 데이터를 사용하지 않겠다 -> newPosts로 대체할거
      revalidate: false, // 백에서 받아온 데이터를 다시 클라이언트에 업데이트 시키겠다. (불필요)
      rollbackOnError: true,
    });
  };

  const postComment = (post, comment) => {
    // 클라이언트에서 만들어진 변경된 Post의 like
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };

    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    return mutate(addComment(post.id, comment), {
      optimisticData: newPosts,
      populateCache: false, // updateLike에서 반환된 데이터를 사용하지 않겠다 -> newPosts로 대체할거
      revalidate: false, // 백에서 받아온 데이터를 다시 클라이언트에 업데이트 시키겠다. (불필요)
      rollbackOnError: true,
    });
  };
  return { posts, isLoading, error, setLike, postComment };
}
