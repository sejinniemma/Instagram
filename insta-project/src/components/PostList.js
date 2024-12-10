'use client';

import { GridLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from '../components/PostListCard';
export default function PostList() {
  const { data: posts, isLoading: loading, error } = useSWR('/api/posts');

  return (
    <section>
      {loading && (
        <div className='text-center mt-32'>
          <GridLoader color='red' />
        </div>
      )}

      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className='mb-4'>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
