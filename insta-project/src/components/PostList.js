'use client';

import GridSpinner from '../components/ui/GridSpinner';
import useSWR from 'swr';
import PostListCard from '../components/PostListCard';
export default function PostList() {
  const { data: posts, isLoading: loading, error } = useSWR('/api/posts');

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
              <PostListCard post={post} priority={index < 2 ? true : false} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
