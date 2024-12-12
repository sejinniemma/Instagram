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
          className={`rounded-full bg-white object-cover ${getImageSizeStyle(size).image}`}
          alt='profile'
          src={image}
        />
      </div>
    </Link>
  );
}

function getImageSizeStyle(size) {
  switch (size) {
    case 'small':
      return { constainer: 'w-9 h-9', image: 'w-[32px] h-[32px] p-[0.1rem]' };
    case 'medium':
      return { constainer: 'w-11 h-11', image: 'w-[42px] h-[42px] p-[0.1rem]' };
    case 'large':
      return { constainer: 'w-[68px] h-[68px]', image: 'w-16 h-16 p-[0.2rem]' };
    case 'xlarge':
      return {
        constainer: 'w-[142px] h-[142px]',
        image: 'w-[138px] h-[138px] p-[0.3rem]',
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}

function getContainerStyle(size, highlight) {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 '
    : '';
  const { constainer } = getImageSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${constainer}`;
}
