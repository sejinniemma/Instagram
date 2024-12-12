import React from 'react';
import { getUserForProfile } from '../../../service/user';
import { notFound } from 'next/navigation';
import UserProfile from '../../../components/UserProfile';
import UserPosts from '../../../components/UserPosts';
import { cache } from 'react';

const getUser = cache(async (username) => getUserForProfile(username));

export default async function UserPage({ params: { username } }) {
  const user = await getUser(username);

  if (!user) {
    notFound();
  }

  return (
    <section className='w-full'>
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
}

export async function generatedMetadata({ params: { username } }) {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username})﹒Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
