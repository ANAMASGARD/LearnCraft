"use client"
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import AddNewCourseDialog from './AddNewCourseDialog'

function CourseList() {

    const [courses, setCourseList] = useState([])
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl'>CourseList </h2>

            {courses?.length == 0 ? (
                <div className='flex p-7 items-center justify-center flex-col border-2 border-dashed border-gray-300 rounded-lg mt-10 bg-secondary' >
                    <Image src={'/rocket.gif'} alt="Go to moon" width={100} height={100}  />
                <h2 className='my-2 text-large font-bold '> Looks Like you haven't made any courses yet </h2>
                <AddNewCourseDialog>
<Button>+Create your first course </Button>
</AddNewCourseDialog>
                </div>
            ) : (
                <div>
                    List of Courses
                </div>
            )}  
        </div>
    )
}

export default CourseList