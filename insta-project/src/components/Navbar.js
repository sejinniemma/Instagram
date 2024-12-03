'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import ColorBtn from './ui/ColorBtn';

export default function Navbar() {
  const path = usePathname();

  return (
    <div className='w-full flex flex-row justify-between items-center px-6'>
      <Link href='/'>
        <h1 className='text-3xl font-bold'>Instagram</h1>
      </Link>

      <nav className='flex flex-row gap-5  items-center'>
        <ul className='flex flex-row gap-4 p-4 items-center text-3xl'>
          {menu.map((li) => {
            return (
              <li className='cursor-pointer' key={li.path}>
                {' '}
                <Link href={li.href}>
                  {path === li.href ? li.clickedIcon : li.icon}
                </Link>
              </li>
            );
          })}
        </ul>

        <ColorBtn text='Sign in' onClick={() => {}} />
      </nav>
    </div>
  );
}

const menu = [
  { href: '/', icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { href: '/search', icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { href: '/new', icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
];
