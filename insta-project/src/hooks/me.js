import { useCallback } from 'react';
import useSWR from 'swr';

async function updateBookmark(postId, bookmark) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId, follow) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({ id: targetId, follow }),
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
  // optimizeData나 mutate함수에 callback으로 들어가는 함수에 의해서 반환되는 값이
  // 업데이트 반영에 사용할 포멧을 뛰고 있지않는다면, 그 값들로 클라이언트에 보여지도록 업데이트 반영하지 말고
  // 그냥 해당 mutate 함수를 리턴하는 api함수의 revalidate된 값으로 업데이트 반영
  const toggleFollow = useCallback(
    (targetId, follow) => {
      return mutate(updateFollow(targetId, follow), {
        populateCache: false, // toggleFollow는 실제 업데이트되서 백에서 받아오는 것으로 갱신하겟다.
        revalidate: true,
      });
    },
    [mutate]
  );
  return { user, setBookMark, toggleFollow };
}
