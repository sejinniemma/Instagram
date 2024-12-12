import React from 'react';
import { getUserForProfile } from '../../../service/user';
import { notFound } from 'next/navigation';
import UserProfile from '../../../components/UserProfile';
import UserPosts from '../../../components/UserPosts';

export default async function UserPage({ params: { username } }) {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <div className='w-full'>
      {/* 상단 */}
      <UserProfile user={user} />
      <UserPosts user={user} />
      {/* 하단 */}
    </div>
  );
}
