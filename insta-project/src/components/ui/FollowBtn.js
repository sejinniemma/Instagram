'use client';

import React from 'react';
import Button from '../ui/Button';
import useMe from '../../hooks/me';

export default function FollowBtn({ user }) {
  const { username } = user;
  const { user: loggedInUser, isLoading: loading, error } = useMe();

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
