'use client';

import useSWR from 'swr';
import { useState } from 'react';

export default function UserPosts({ user: { username } }) {
  const [tab, setTab] = useState('posts');

  const {
    data: posts,
    isLoading: loading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);

  console.log(`posts =>`, { posts });
  return <div>UserPosts</div>;
}
