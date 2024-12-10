import HeartIcon from '../components/ui/icons/HeartIcon';
import BookmarkIcon from '../components/ui/icons/BookmarkIcon';
import SmileIcon from '../components/ui/icons/SmileIcon';
import Profile from './ui/Profile';
import Image from 'next/image';
import { parseDate } from '../util/date';

export default function PostListCard({ post }) {
  const { userImage, username, image, createdAt, likes, text } = post;
  console.log(`post =>`, { post });
  return (
    <article className='rounded-md shadow-md border border-gray-200'>
      <div className='flex items-center p-2'>
        <Profile
          session={{ image: userImage, username }}
          size='medium'
          highlight
        />
        <span className='text-gray-900 font-bold ml-2'>{username}</span>
      </div>
      <Image
        className='w-full object-cover aspect-square'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div className='flex justify-between my-2 px-4'>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className='px-4 py-1'>
        <p className='text-sm font-bold mb-2'>{`${likes?.length ?? 0} ${likes?.length > 1 ? 'likes' : 'like'}`}</p>
        <p>
          <span className='font-bold mr-1'>{username}</span>
          {text}
        </p>
        <p className='text-xs text-neutral-500 uppercase my-2'>
          {parseDate(createdAt)}
        </p>
        <form className='flex items-center border-t border-neutral-300 '>
          <SmileIcon />
          <input
            className='w-full ml-2 border-none outline-none p-3'
            type='text'
            placeholder='Add a comment...'
          />
          <button className='font-bold text-sky-500 ml-2'>Post</button>
        </form>
      </div>
    </article>
  );
}
