'use client';

import Profile from './ui/Profile';
import FilesIcon from '../components/ui/icons/FilesIcon';
import Button from './ui/Button';
import { useState } from 'react';
import Image from 'next/image';

export default function NewPost({ user: { image, username } }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState();

  const handleDrag = (e) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  return (
    <section className='w-full max-w-xl flex flex-col items-center mt-6'>
      <div className='flex items-center gap-2 mb-10'>
        <Profile
          session={{ image: image ?? '', username: username }}
          highlight
          size='medium'
        />
        <p className='font-bold'>{username}</p>
      </div>
      <form className='w-full  flex flex-col mt-2'>
        {/* 숨김 Input */}
        <input
          onChange={handleChange}
          className='hidden'
          name='input'
          id='input-upload'
          type='file'
          accept='image/*'
        />
        {/* 보여지는 ui */}
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${!file && 'border-2 border-sky-500 border-dashed'}`}
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {/* dragging시 효과 */}
          {dragging && (
            <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none' />
          )}
          {!file && (
            <div className='flex flex-col items-center pointer-events-none'>
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-square'>
              <Image
                className='absolute top-0 object-contain'
                src={URL.createObjectURL(file)}
                alt='local file'
                fill
                sizes='650px'
              />
            </div>
          )}
        </label>
        {/* caption */}
        <textarea
          className='outline-none text-lg border border-neutral-300'
          name='text'
          id='input-text'
          required
          rows={10}
          placeholder={'Write a caption...'}
        />
        {/* publish */}
        <Button text='Publish' onClick={() => {}} />
      </form>
    </section>
  );
}
