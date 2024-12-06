import Link from 'next/link';
import React from 'react';

export default function Profile({ session: { image, username } }) {
  return (
    <Link href={`/user/${username}`}>
      <div className='rounded-full cursor-pointer bg-gradient-to-bl from-fuchsia-600 via-rose-400 to-amber-300'>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt='profil'
          src={image}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: '1px',
            referrerPolicy: 'no-referrer',
          }}
        />
      </div>
    </Link>
  );
}
