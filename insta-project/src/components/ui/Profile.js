import Link from 'next/link';
import React from 'react';

export default function Profile({
  session: { image, username },
  highlight = false,
  size = 'normal',
}) {
  return (
    <Link href={`/user/${username}`}>
      <div className={getContainerStyle(size, highlight)}>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`rounded-full bg-white  ${getImageStyle(size)}`}
          alt='profile'
          src={image}
        />
      </div>
    </Link>
  );
}

function getContainerStyle(size, highlight) {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 '
    : '';
  const sizeStyle = size === 'small' ? 'w-9 h-9 ' : 'w-[68px] h-[68px]';
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}
function getImageStyle(size) {
  return size === 'small'
    ? 'w-[32px] h-[32px] p-[0.1rem]'
    : 'w-16 h-16 p-[0.2rem]';
}
