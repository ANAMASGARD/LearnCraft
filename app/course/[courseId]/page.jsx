"use client" // Add this at the top
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState } from 'react' // Correct import
import { useParams } from 'next/navigation' // Correct import
import axios from 'axios' // Missing import
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { SelectedChapterIndexProvider } from '@/context/SelectedChapterIndexContext';
import { toast } from 'sonner'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    useEffect(() => {
        GetEnrolledCourseById();
    }, []);
    
    const GetEnrolledCourseById = async () => {
        const result = await axios.get('/api/enroll-course?courseId=' + courseId);
        console.log(result.data);
        setCourseInfo(result.data);
    
    }
    
    return (
        <SelectedChapterIndexProvider>
            <div className='min-h-screen bg-gray-50'>
                {/* Fixed Header */}
                <div className='fixed top-0 left-0 right-0 bg-white shadow-sm z-50'>
                    <AppHeader hideSidebar={true}/>
                    {/* Mobile sidebar toggle button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="fixed top-4 left-4 z-50 lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
                
                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                
                {/* Main Content Area */}
                <div className='pt-16 flex'>
                    {/* Sidebar - Responsive */}
                    <div className={`
                        fixed left-0 top-16 bottom-0 w-80 overflow-y-auto z-40 bg-white shadow-lg
                        transition-transform duration-300 ease-in-out
                        lg:translate-x-0
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}>
                        <ChapterListSidebar courseInfo={courseInfo} onChapterSelect={() => setSidebarOpen(false)} />
                    </div>
                    
                    {/* Scrollable Content Area - Responsive */}
                    <div className='flex-1 overflow-y-auto lg:ml-80'>
                        <ChapterContent courseInfo={courseInfo} refreshData={() =>  GetEnrolledCourseById() } />
                    </div>
                </div>
            </div>
        </SelectedChapterIndexProvider>
    )
}

export default Course