import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import AppHeader from './_components/AppHeader'

const WorkspaceProvider = ({children }) => {
  return (
    <SidebarProvider>
        <AppSidebar />
         
        <div className="flex flex-col w-full h-screen">
            <AppHeader />
                {children }</div>
    </SidebarProvider>
    
  )
}

export default WorkspaceProvider