'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import Profile from './ui/Profile';
import NewFillIcon from './ui/icons/NewFillIcon';
import ColorBtn from './ui/ColorBtn';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  return (
    <div className='w-full flex flex-row justify-between items-center px-6 '>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>Instagram</h1>
      </Link>

      <nav className='flex flex-row gap-5  items-center'>
        <ul className='flex flex-row gap-4 p-4 items-center text-3xl'>
          {menu.map((li, index) => {
            return (
              <li className='cursor-pointer' key={index}>
                {' '}
                <Link href={li.href}>
                  {path === li.href ? li.clickedIcon : li.icon}
                </Link>
              </li>
            );
          })}
        </ul>
        {session && <Profile session={session} size='small' highlight />}
        {session ? (
          <ColorBtn text='Sign out' onClick={() => signOut()} />
        ) : (
          <ColorBtn text='Sign in' onClick={() => signIn()} />
        )}
      </nav>
    </div>
  );
}

const menu = [
  { href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { href: '/new', icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
];
