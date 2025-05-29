import { UserButton } from '@clerk/nextjs'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

const AppHeader = ({hideSidebar=false}) => {
  return (
    <div className='p-4 flex justify-between items-center shadow-md '>
         {!hideSidebar && <SidebarTrigger /> }
         <UserButton /> 
    </div>
  )
}

export default AppHeader