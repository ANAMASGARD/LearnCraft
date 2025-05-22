"use client"
import axios from 'axios'
import React, { useEffect , useState} from 'react'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'

function Provider ({ children }) {
     
const { user } = useUser();
const [userDetails, setUserDetails] = useState({});

 useEffect (() => {
            user&&CreateNewUser();
        },[user])

    const CreateNewUser  = async  () => {

        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email:user?.primaryEmailAddress?.emailAddress
    });
    console.log(result.data);
    setUserDetails(result.data);
    
}
  return (
    <UserDetailContext.Provider value={{ userDetails , setUserDetails }}>
    <div>{ children }</div>
    </UserDetailContext.Provider>
  )
}

export default Provider