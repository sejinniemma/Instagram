import useSWR from 'swr';

async function addComment(id, comment) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function useFullPost(postId) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/posts/${postId}`);

  const postComment = (comment) => {
    if (!post) return;
    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };
  return { post, isLoading, error, postComment };
}
