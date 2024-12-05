import React from 'react';

export default function ColorBtn({ text, onClick, size }) {
  return (
    <div
      className={`rounded-md p-[0.15rem] bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300
    ${size === 'big' ? 'p-[0.3rem]' : 'p-[0.15rem]'}`}
    >
      {' '}
      <button
        className={`bg-white rounded-sm text-base p-[0.3rem] hover:opacity-90 transition-opacity
          ${size === 'big' ? 'p-5 text-2xl' : 'p-[0.3rem] text-base'}`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
