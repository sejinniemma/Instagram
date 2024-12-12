'use cient';

import Profile from './ui/Profile';
import FollowBtn from '../components/ui/FollowBtn';
import useSWR from 'swr';

export default function UserProfile({ user }) {
  const { image, username, name, following, followers, posts } = user;
  const info = [
    { title: 'posts', data: posts },
    { title: 'followers', data: followers },
    { title: 'following', data: following },
  ];

  return (
    <section className='flex flex-col md:flex-row items-center justify-center py-12 w-full border-b border-neutral-300 '>
      <div className='mr-10'>
        <Profile session={{ image, username }} highlight size='xlarge' />
      </div>
      <div className='md:ml-10 basis-1/3'>
        <div className='flex flex-col md:flex-row items-center '>
          <h1 className='text-2xl md:mr-8 my-2 md:mb-0 '>{username}</h1>
          <FollowBtn user={user} />
        </div>

        <ul className='my-4 flex gap-4'>
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className='font-bold mr-1'>{data}</span>
              {title}
            </li>
          ))}
        </ul>

        <p className='font-bold text-xl text-center md:text-start'>{name}</p>
      </div>
    </section>
  );
}
