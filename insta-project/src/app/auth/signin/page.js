import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import Signin from '../../../components/ui/Singin';

export default async function SignPage({ searchParams: { callbackUrl } }) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex justify-center mt-[20%]'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
