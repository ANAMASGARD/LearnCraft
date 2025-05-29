"use client" // Add this at the top
import AppHeader from '@/app/workspace/_components/AppHeader'
import React, { useEffect, useState } from 'react' // Correct import
import { useParams } from 'next/navigation' // Correct import
import axios from 'axios' // Missing import
import ChapterListSidebar from '../_components/ChapterListSidebar'
import ChapterContent from '../_components/ChapterContent'
import { SelectedChapterIndexProvider } from '@/context/SelectedChapterIndexContext';

function Course() {
    const { courseId } = useParams();
    const [courseInfo, setCourseInfo] = useState();
    
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
            <div>
                <AppHeader hideSidebar={true}/>
                <div className='flex gap-10'>
                    <ChapterListSidebar courseInfo={courseInfo}/>
                    <ChapterContent courseInfo={courseInfo} />
                </div>
            </div>
        </SelectedChapterIndexProvider>
    )
}

export default Course