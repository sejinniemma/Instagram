import Link from 'next/link';
import React from 'react';

export default function Profile({
  session: { image, username },
  highlight = false,
  size = 'large',
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

function getContainerSize(size) {
  switch (size) {
    case 'small':
      return 'w-9 h-9 ';
    case 'medium':
      return 'w-11 h-11';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
}

function getContainerStyle(size, highlight) {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 '
    : '';
  const sizeStyle = getContainerSize(size);
  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
}

function getImageStyle(size) {
  switch (size) {
    case 'small':
      return 'w-[32px] h-[32px] p-[0.1rem]';
    case 'medium':
      return 'w-[42px] h-[42px] p-[0.1rem]';
    case 'large':
      return 'w-16 h-16 p-[0.2rem]';
  }
}
