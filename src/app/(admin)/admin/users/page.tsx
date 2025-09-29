
import { api } from '@/api/gobalAPI'
import UserTable from '@/features/components/users/UserTable'
import { User } from '@/types/userType'
import React from 'react'



async function getUsers(): Promise<User[]> {
  const res = await api.get("/users?limit=10")
  return res.data.users
}
export default async function UserPage() {
  const users = await getUsers();
  console.log("🚀 ~ UserPage ~ users:", users.map((p) => p.role))
  return <UserTable initialUsers={users} />
}
