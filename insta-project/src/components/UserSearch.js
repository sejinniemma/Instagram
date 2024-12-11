'use client';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import UserInfoCard from '../components/UserInfoCard';
import { GridLoader } from 'react-spinners';
export default function UserSearch() {
  const [users, setUsers] = useState([]);
  //   const [selectedUser, setSelectedUser] = useState(); // 선택된 User
  const [filterdUser, setFilterdUser] = useState();
  const {
    data,
    isLoading: loading,
    error,
  } = useSWR(`/api/search?keyword=${filterdUser}`);

  useEffect(() => {
    let users;
    if (data && data.length > 0) {
      if (filterdUser) {
        users = data.filter(
          (user) => user.username === filterdUser || user.name === filterdUser
        );
        setUsers(users);
      } else {
        setUsers(data);
      }
    } else {
      setUsers(data);
    }
  }, [data, filterdUser]);
  //   console.log(`filterdUser =>`, { filterdUser });
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className='w-full p-5'>
      {/* 검색창 */}

      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => setFilterdUser(e.target.value)}
          className='w-full  outline-gray-400 p-3'
          type='text'
          placeholder='Search for a user or username...'
        />
      </form>

      {/* User List */}
      {loading && (
        <div className='ml-80 mt-40'>
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
