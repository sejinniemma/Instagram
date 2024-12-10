import Profile from './ui/Profile';
import Image from 'next/image';
import CommentForm from '../components/CommentForm';
import ActionBar from '../components/ActionBar';

export default function PostListCard({ post, priority = false }) {
  const { userImage, username, image, createdAt, likes, text } = post;

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
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
    </article>
  );
}
