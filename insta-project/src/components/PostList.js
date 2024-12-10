'use client';
import { createPortal } from 'react-dom';
import GridSpinner from '../components/ui/GridSpinner';
import useSWR from 'swr';
import PostListCard from '../components/PostListCard';
import { useState } from 'react';
import ModalContent from '../components/ui/Modal';

export default function PostList() {
  const { data: posts, isLoading: loading, error } = useSWR('/api/posts');
  const [selectedPost, setSelectedPost] = useState({});
  const [showModal, setShowModal] = useState(false);
  console.log(`1selectedPost =>`, { selectedPost });
  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridSpinner color='red' />
        </div>
      )}

      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={index} className='mb-4'>
              <PostListCard
                onClick={() => {
                  setShowModal(true);
                  setSelectedPost(post);
                }}
                post={post}
                priority={index < 2 ? true : false}
              />
            </li>
          ))}
        </ul>
      )}

      <div className='flex justify-center items-center w-full  border-red-200'>
        {showModal &&
          selectedPost &&
          createPortal(
            <ModalContent
              post={selectedPost}
              onClose={() => setShowModal(false)}
            />,
            document.body
          )}
      </div>
    </section>
  );
}
