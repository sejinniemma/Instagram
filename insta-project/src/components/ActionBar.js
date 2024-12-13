'use client';

import HeartIcon from '../components/ui/icons/HeartIcon';
import HeartFillIcon from '../components/ui/icons/HeartFillIcon';
import BookmarkIcon from '../components/ui/icons/BookmarkIcon';
import BookMarkFillIcon from '../components/ui/icons/BookMarkFillIcon';
import { parseDate } from '../util/date';
import { useState } from 'react';
import ToggleButton from '../components/ui/ToggleButton';
import { useSession } from 'next-auth/react';
import { useSWRConfig } from 'swr';

export default function ActionBar({ post }) {
  const { id, likes, username, text, createdAt } = post;
  const { data: session } = useSession();
  const { mutate } = useSWRConfig();

  // const userId = session.id;
  const liked = session && likes && likes.includes(session.username); // 최신으로 받아온 Post에 의존
  const [bookMarked, setBookMarked] = useState(false);

  const handleLike = (like) => {
    fetch('api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id, like }),
    }).then(() => mutate('/api/posts'));
  };

  return (
    <>
      <div className='flex justify-between my-2 px-4'>
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookMarked}
          onToggle={setBookMarked}
          onIcon={<BookMarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        {text && (
          <p>
            <span className='font-bold mr-1'>{username}</span>
            {text}
          </p>
        )}
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
}
