'use client';

import React from 'react';
import useSWR from 'swr';
import GridSpinner from '../components/ui/GridSpinner';
import PostGridCard from './PostGridCard';

export default function PostGrid({ username, query }) {
  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR(`/api/users/${username}/${query}`);
  return (
    <div>
      {loading && (
        <div className='w-full text-center mt-10'>
          <GridSpinner />
        </div>
      )}
      <ul className='justify-center grid grid-cols-3 gap-4 py-4 px-8'>
        {posts &&
          posts.map((post, index) => (
            <li key={index} className='cursor-pointer'>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}
