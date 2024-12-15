'use client';

import Image from 'next/image';
import Profile from './Profile';
import ActionBar from '../ActionBar';
import CommentForm from '../CommentForm';
import useSWR from 'swr';
import { CircleLoader } from 'react-spinners';
import useFullPost from '../../hooks/post';
import useMe from '../../hooks/me';

export default function ModalContent({ onClose, post }) {
  const { id, username, userImage, image } = post;
  const { post: data, isLoading: loading, postComment } = useFullPost(id); // 하나의 포스트에 대한 코멘트들만 가져오는 것이므로.
  const { user } = useMe();

  const comments = data?.comments;

  // 서버상에서 렌더링되지 않도록 방지.
  if (typeof window === 'undefined') {
    return null;
  }

  const handlePostComment = (comment) => {
    user &&
      postComment({ comment, username: user.username, image: user.image });
  };
  return (
    <div
      className='
        z-10
        flex 
        flex-col
        justify-center 
        items-center 
        shadow-[rgba(100,100,111,0.3)_0px_7px_29px_0px] 
        bg-neutral-900/70
        border-[2px] 
        border-[#f0f0f0] 
        rounded-[12px] 
        absolute 
        w-full
        h-full
        top-[50px] 
        left-0
        bottom-[70px]'
    >
      <section className='flex w-[50%] justify-center bg-white relative'>
        {/* 이미지 */}
        <div>
          <Image
            src={image}
            alt={`photo by ${username}`}
            priority
            width={700}
            height={700}
          />
        </div>
        {/* 설명 */}
        <div className='p-4 flex flex-col justify-between h-full'>
          <div>
            <div className='flex items-center border-b pb-2 border-gray-300'>
              <Profile
                session={{ image: userImage, username }}
                size='small'
                highlight
              />
              <p className='font-bold ml-2'>{username}</p>
            </div>
            {/* Comment */}
            {loading && (
              <div className='flex justify-center items-center mt-20'>
                <CircleLoader color='red' />
              </div>
            )}
            {comments &&
              comments.length > 0 &&
              comments.map(
                ({ comment, image, username: commentUserName }, index) => {
                  return (
                    <div key={index} className='flex items-center mt-2'>
                      <Profile
                        session={{
                          image,
                          username,
                        }}
                        size='small'
                        highlight={commentUserName === username}
                      />
                      <p className='font-bold mx-2'>{commentUserName}</p>
                      <p>{comment}</p>
                    </div>
                  );
                }
              )}
          </div>

          {/* Footer */}
          <div>
            {' '}
            <ActionBar post={post} />
            <CommentForm onPostComment={handlePostComment} />
          </div>
        </div>

        {/*  */}
        <button onClick={onClose} className='absolute right-[-30px] text-xl'>
          x
        </button>
      </section>
    </div>
  );
}
