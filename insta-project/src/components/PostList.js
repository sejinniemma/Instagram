'use client';
import { createPortal } from 'react-dom';
import GridSpinner from '../components/ui/GridSpinner';
import PostListCard from '../components/PostListCard';
import { useEffect, useState } from 'react';
import ModalContent from '../components/ui/Modal';
import usePosts from '../hooks/posts';

export default function PostList() {
  const { posts, isLoading: loading } = usePosts();
  const [selectedPost, setSelectedPost] = useState();
  const [showModal, setShowModal] = useState(false);

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
              post={posts.filter((post) => post.id === selectedPost.id)[0]}
              onClose={() => setShowModal(false)}
            />,
            document.body
          )}
      </div>
    </section>
  );
}
