import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div>
      <h2 className='text-2xl text-center font-bold my-10'>
        Manage your profile 
      </h2>
      <UserProfile />
    </div>
  )
}

export default Profile
