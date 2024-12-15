'use client';

import { useState } from 'react';
import SmileIcon from '../components/ui/icons/SmileIcon';
import usePosts from '../hooks/posts';

export default function CommentForm({ onPostComment }) {
  const [commnet, setComment] = useState('');
  const buttonDisabled = commnet.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostComment(commnet);
    setComment('');
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='flex px-3 items-center border-t border-neutral-300 '
    >
      <SmileIcon />
      <input
        onChange={(e) => setComment(e.target.value)}
        className='w-full ml-2 border-none outline-none p-3'
        type='text'
        placeholder='Add a comment...'
        required
        value={commnet}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ${buttonDisabled ? 'text-sky-300' : 'text-sky-500'} ml-2 `}
      >
        Post
      </button>
    </form>
  );
}
