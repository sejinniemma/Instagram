'use client';

import React from 'react';
import useSWR from 'swr';
import Button from '../ui/Button';

export default function FollowBtn({ user }) {
  const { username } = user;
  const { data: loggedInUser, isLoading: loading, error } = useSWR('/api/me');

  const showButton = loggedInUser && loggedInUser.username === username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';
  return (
    <>
      {!showButton && (
        <Button text={text} red={text === 'Unfollow'} onClick={() => {}} />
      )}
    </>
  );
}
