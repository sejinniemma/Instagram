import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId, bookmark) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

export default function useMe() {
  const { data: user, isLoading, error, mutate } = useSWR('/api/me');

  const setBookMark = useCallback(
    (postId, bookmark) => {
      const bookmarks = user.bookmarks;
      const newUser = {
        ...user,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((bookmark) => bookmark !== postId),
      };

      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newUser,
        populateCache: false, // updateLike에서 반환된 데이터를 사용하지 않겠다 -> newPosts로 대체할거
        revalidate: false, // 백에서 받아온 데이터를 다시 클라이언트에 업데이트 시키겠다. (불필요)
        rollbackOnError: true,
      });
    },
    [user, mutate]
  );
  return { user, setBookMark };
}
