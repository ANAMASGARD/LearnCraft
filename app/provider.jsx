"use client"
import axios from 'axios'
import React, { use, useEffect , useState} from 'react'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from '@/context/UserDetailContext'
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext'

function Provider ({ children }) {
     
const { user } = useUser();
const [userDetails, setUserDetails] = useState({});
const {selectedChapterIndex , setSelectedChapterIndex} = useState(0);

 useEffect (() => {
            user&&CreateNewUser();
        },[user]);

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
      <SelectedChapterIndexContext.Provider value={{selectedChapterIndex , setSelectedChapterIndex}}>
    <div>{ children }</div>
    </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  )
}

export default Provider