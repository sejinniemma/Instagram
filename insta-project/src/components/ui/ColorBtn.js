import React from 'react';

export default function ColorBtn({ text, onClick }) {
  return (
    <div className='rounded-md p-[0.15rem] bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'>
      {' '}
      <button
        className='bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity '
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
