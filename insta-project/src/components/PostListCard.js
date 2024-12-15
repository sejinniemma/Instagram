import Profile from './ui/Profile';
import Image from 'next/image';
import CommentForm from '../components/CommentForm';
import ActionBar from '../components/ActionBar';
import usePosts from '../hooks/posts';

export default function PostListCard({ onClick, post, priority = false }) {
  const { userImage, username, image, comments, text } = post;
  const { postComment } = usePosts();

  const handlePostComment = (comment) => {
    postComment(post, comment);
  };

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
        onClick={onClick}
        className='w-full object-cover aspect-square cursor-pointer'
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar post={post}>
        <p>
          <span className='font-bold mr-1'>{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className='font-bold my-2 text-sky-500'
            onClick={onClick}
          >{`Veiw all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentForm onPostComment={handlePostComment} />
    </article>
  );
}
