import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function Profile() {
  return (
    <div>
        <h2 className='text-2xl font-bold  my-10'>
            Manage your profile 
            <UserProfile />

        </h2>
    </div>
  )
}

export default Profile