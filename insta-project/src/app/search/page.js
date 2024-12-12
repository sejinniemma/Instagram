import React from 'react';
import UserSearch from '../../components/UserSearch';

export const dynamic = 'force-dynamic';
// User search가 'use client'를 명시해 주었는데도 불구하고 여기에서 이 페이지가 SSG로
// 나오는 페이지라면 처음 빌드시에만 페이지가 생성되는 것 같다. 그래서 dynamic을 표기해 준듯.

export const metadata = {
  title: 'User Search',
  description: 'Search users to follow',
};

export default function SearchPage() {
  // 모든 user의 정보를 가져온다.
  // userImage, username, name, following (count), follower (count)
  // 이 페이지도 CSR이지 않을까.
  // 로그인이 된 이후에 요청을 보내기 떄문 , SSR로 해서 업데이트 되어야함. -> 과부하가 올것이다.
  // 그래서 CSR로 해서 업데이트 되게 하는게 나을듯?

  // 1. /api/users : 서버로 요청을 보낸다.
  // 2. 서버에서는 user가 있는지 확인안해도 무조건 검색되게 할 수 있음? Sanity content lake에 요청한다.
  // 3. service에서 모든 user정보를 가져온다.

  return (
    <section className='w-full max-w-screen-md mx-auto'>
      <UserSearch />
    </section>
  );
}
