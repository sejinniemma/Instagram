import React from 'react';

export default function Button({ text, onClick, red }) {
  return (
    <button
      onClick={onClick}
      className={`border-none rounded-md py-2 px-8
    text-white font-bold leading-4 ${red ? 'bg-red-500' : 'bg-sky-500'} `}
    >
      {text}
    </button>
  );
}
