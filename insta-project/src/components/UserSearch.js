'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import UserInfoCard from '../components/UserInfoCard';
import { GridLoader } from 'react-spinners';
export default function UserSearch() {
  const [selectedUser, setSelectedUser] = useState(); // 선택된 User
  const [filterdUser, setFilterdUser] = useState(); // input에 입력된 text
  const {
    data: users,
    isLoading: loading,
    error,
  } = useSWR(`/api/search?keyword=${selectedUser}`);
  console.log(`users =>`, { users });
  return (
    <div className='w-full p-5'>
      {/* 검색창 */}
      <input
        onChange={(e) => {
          setFilterdUser(e.target.value);
        }}
        className='w-full border-none outline-none p-3'
        type='text'
        placeholder='Search for a user or username...'
      />

      {/* User List */}
      {loading && (
        <div className='mt-35 ml-35 w-full '>
          <GridLoader size={20} color='red' />
        </div>
      )}
      <ul className='flex flex-col gap-5 w-full p-10'>
        {users &&
          users.length > 0 &&
          users.map((user, index) => (
            <UserInfoCard key={index} user={user} />
          ))}{' '}
      </ul>
    </div>
  );
}
