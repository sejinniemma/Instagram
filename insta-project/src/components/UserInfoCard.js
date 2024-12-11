import React from 'react';
import Profile from './ui/Profile';
import Link from 'next/link';

export default function UserInfoCard({ user }) {
  const { username, name, image, followers, following } = user;
  console.log(`users =>`, { user });
  return (
    <Link href={`/user/${username}`}>
      <li className='flex border-gray-200 border-2 rounded-md w-full p-5'>
        <Profile session={{ image, username }} size='large' />
        <div className='flex flex-col items-start ml-2 text-md'>
          <p className='font-bold text-lg'>{username}</p>
          <p className='text-gray-400'>{name}</p>
          <p className='text-gray-400'>{`${followers || 0} followers ${following || 0} following`}</p>
        </div>
      </li>
    </Link>
  );
}
