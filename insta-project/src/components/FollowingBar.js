'use client';

import React from 'react';
import useSWR from 'swr';
import Profile from './ui/Profile';
import { PropagateLoader } from 'react-spinners';
import ScrollableBar from '../components/ui/ScrollableBar';

export default function FollowingBar() {
  const { data, isLoading: loading, error } = useSWR('/api/me');
  const users = data && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];
  return (
    <section className='no-scrollbar overflow-auto min-h-[90px] shadow-sm shadow-neutral-300 mb- rounded-lg w-full flex justify-center items-center p-4'>
      {loading ? (
        <PropagateLoader size={8} color='red' />
      ) : (
        !users || (users.length === 0 && <p>{`You don't have following`}</p>)
      )}

      {users && users.length > 0 && (
        <ul className='flex w-full gap-2'>
          {/* <ScrollableBar> */}
          {users.map((user, index) => (
            <li className='flex flex-col items-center w-20' key={index}>
              <Profile session={user} highlight />
              <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                {user.username}
              </p>
            </li>
          ))}
          {/* </ScrollableBar> */}
        </ul>
      )}
    </section>
  );
}
