import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import NewPost from '../../components/NewPost';
import { authOptions } from '../lib/auth';

export const metadata = {
  title: 'New Post',
  description: ' Create a new post',
};

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/signin');
  }

  return <NewPost user={session} />;
}
