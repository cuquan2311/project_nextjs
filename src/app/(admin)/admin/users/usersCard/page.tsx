"use client"
import UserCardGrid from '@/features/components/usersCard/UserCardGrid';
import { useUserStore } from '@/store/userStore/userStore';
import React, { useEffect } from 'react'

export default function UserCardPage() {
   const { users, isLoading, error, fetchUsers } = useUserStore();
  useEffect(()=> {
    fetchUsers();

  },[fetchUsers])
  if (isLoading) return <p className="text-center mt-5">Loading users...</p>;
  if (error) return <p className="text-center text-danger">{error}</p>;
  return <UserCardGrid users={users ?? []} />;
}
