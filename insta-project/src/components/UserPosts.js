'use client';

import { useState } from 'react';
import PostsIcon from '../components/ui/icons/PostIcon';
import HeartIcon from '../components/ui/icons/HeartIcon';
import BookmarkIcon from '../components/ui/icons/BookmarkIcon';
import PostGrid from '../components/PostGrid';

const tabs = [
  { type: 'posts', icon: <PostsIcon /> },
  { type: 'saved', icon: <BookmarkIcon className='w-3 h-3' /> },
  { type: 'likes', icon: <HeartIcon className='w-3 h-3' /> },
];

export default function UserPosts({ user: { username } }) {
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className='flex justify-center uppercase'>
        {tabs.map(({ type, icon }, index) => (
          <li
            className={`mx-12 p-4 cursor-pointer border-black
              ${type === query && `font-bold border-t`}`}
            key={index}
            onClick={() => setQuery(type)}
          >
            <button className='scale-150 md:scale-100'>{icon}</button>
            <span className='hidden md:inline'>{type}</span>
          </li>
        ))}
      </ul>
      <PostGrid username={username} query={query} />
    </section>
  );
}
