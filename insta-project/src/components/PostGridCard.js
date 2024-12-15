import Image from 'next/image';
import React, { useState } from 'react';
import ModalContent from '../components/ui/Modal';
import { createPortal } from 'react-dom';
import { signIn, useSession } from 'next-auth/react';
import usePosts from '../hooks/posts';

export default function PostGridCard({ post, priority = false }) {
  const { image, username } = post;
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const { posts } = usePosts();

  // 사용자가 로그인 한 경우에만 모달을 보여주도록함
  const handleOpenPost = () => {
    if (!session?.email) {
      return signIn();
    }
    setShowModal(true);
  };

  return (
    <div className='relative w-full aspect-square'>
      <Image
        onClick={handleOpenPost}
        className='object-cover'
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes='650px'
        priority={priority}
      />

      {showModal &&
        post &&
        createPortal(
          <ModalContent
            post={posts.filter((item) => item.id === post.id)[0]}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </div>
  );
}
