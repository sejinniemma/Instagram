'use client';

import Profile from './ui/Profile';
import FilesIcon from '../components/ui/icons/FilesIcon';
import Button from './ui/Button';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import GridSpinner from './ui/GridSpinner';

export default function NewPost({ user: { image, username } }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const textRef = useRef(null);
  const router = useRouter();

  // Dragging 상태
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
  // drag로 drop
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };
  // 이미지 선택 후 drop
  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .then((err) => setError(err?.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <section className='w-full max-w-xl flex flex-col items-center mt-6'>
      {loading && (
        <div className='absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20'>
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold'>
          {error}
        </p>
      )}
      <div className='flex items-center gap-2 mb-10'>
        <Profile
          session={{ image: image ?? '', username: username }}
          highlight
          size='medium'
        />
        <p className='font-bold'>{username}</p>
      </div>
      <form onSubmit={handleSubmit} className='w-full  flex flex-col mt-2'>
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
          ref={textRef}
          className='outline-none text-lg border border-neutral-300 mt-10'
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
