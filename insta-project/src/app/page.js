import { getServerSession } from 'next-auth';
import FollowingBar from '../components/FollowingBar';
import PostList from '../components/PostList';
import Sidebar from '../components/ui/Sidebar';
import { authOptions } from '../app/lib/auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  // Homepage는 서버 컴포넌트 이므로 session을 서버 함수에서 받아온다.
  const session = await getServerSession(authOptions);
  const userEmail = session && session?.email;

  if (!userEmail) {
    redirect('/auth/signin');
  }
  return (
    <section className='flex flex-col md:flex-row justify-between w-full max-w-[850px] p-4'>
      <div className='w-full basis-3/4 flex flex-col min-w-0'>
        <FollowingBar />
        <PostList />
      </div>

      <div className='basis-1/4 ml-8'>
        <Sidebar session={session} />
      </div>
    </section>
  );
}
