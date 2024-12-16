'use client';

import React, { useState, useTransition } from 'react';
import Button from '../ui/Button';
import useMe from '../../hooks/me';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

export default function FollowBtn({ user }) {
  const { username } = user; // 페이지마다 들어오는 User를 체크.
  const {
    user: loggedInUser,
    toggleFollow,
    isLoading: loading,
    error,
  } = useMe(); // 로그인한 유저인지 검사함.(당사자를 검사하는함수)
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username; // 당사자 프로필인 경우.
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user?.id, !following);
    setIsFetching(false);
    startTransition(() => router.refresh());
  };
  return (
    <>
      {showButton && (
        <div>
          {isUpdating && (
            <div>
              <PulseLoader size={6} />
            </div>
          )}
          <Button
            text={text}
            red={text === 'Unfollow'}
            onClick={handleFollow}
          />
        </div>
      )}
    </>
  );
}
