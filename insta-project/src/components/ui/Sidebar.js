import React from 'react';
import Profile from './Profile';

export default function Sidebar({ session }) {
  return (
    <div>
      <div className='flex items-center'>
        <Profile session={session} />
        <div className='ml-4'>
          <p className='font-bold'>{session?.username}</p>
          <p className='text-lg text-neutral-500 leading-4'>{session?.name}</p>
        </div>
      </div>

      <p className='flex flex-row text-sm text-neutral-500 mt-8'>
        About﹒Help﹒Press﹒API﹒Jobs﹒Privacy﹒Terms﹒Location﹒Language
      </p>

      <p className='font-bold text-sm text-neutral-500 mt-8'>
        @Copyright INSTANTGRAM from METAL
      </p>
    </div>
  );
}
