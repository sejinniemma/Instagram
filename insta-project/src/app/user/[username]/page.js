import React from 'react';
import { getUserForProfile } from '../../../service/user';
import { notFound } from 'next/navigation';
import UserProfile from '../../../components/UserProfile';

export default async function UserPage({ params }) {
  const username = await params.username;
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <div className='w-full'>
      {/* 상단 */}
      <UserProfile user={user} />

      {/* 하단 */}
    </div>
  );
}
