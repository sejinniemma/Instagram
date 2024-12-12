import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../../app/lib/auth';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import Signin from '../../../components/ui/Singin';

export const metadata = {
  title: 'Signin',
  description: 'Signup or Login to Instantgram',
};

export default async function SignPage({ searchParams: { callbackUrl } }) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }
  // ?? : null이나 undifined에만
  // getProviders()가 빈 객체처럼 동작하는 경우를 허용하려는 의도
  // getProviders()가 null이나 undefined를 반환하면, 대체값으로 {}를 사용합니다.
  // 하지만 falsy 값(0, 빈 문자열 "", false)이 반환되는 경우에는 원래 값을 유지해야 합니다. 이런 경우 ??가 적합합니다.
  const providers = (await getProviders()) ?? {};

  return (
    <section className='flex justify-center mt-[20%]'>
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
