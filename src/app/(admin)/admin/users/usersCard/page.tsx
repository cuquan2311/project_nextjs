import { getUsersCard } from '@/api/cardUserAPI'
import UserCardGrid from '@/features/components/usersCard/UserCardGrid';
import React from 'react'

export default async function UserCardPage() {
  const userCard = await getUsersCard()
  return <UserCardGrid users={userCard} />;
}
