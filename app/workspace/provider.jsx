import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./_components/AppSidebar"
import AppHeader from './_components/AppHeader'
import WelcomeBanner from './_components/WelcomeBanner'

function WorkspaceProvider({children }) {
  return (
    <SidebarProvider>
        <AppSidebar />
         
        <div className="flex flex-col w-full h-screen">
            <AppHeader />
            <div className="p-10 overflow-y-auto">
                {children }
                </div>
                </div>
    </SidebarProvider>
    
  )
}

export default WorkspaceProvider