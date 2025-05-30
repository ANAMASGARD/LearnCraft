"use client"
import React, { use } from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import AddNewCourseDialog from './AddNewCourseDialog'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import CourseCard from './CourseCard'

function CourseList() {

    const [courses, setCourseList] = useState([]);
    const { user } = useUser();
    useEffect(() => {
      user && GetCourseList();
    }, [user]);

    const GetCourseList = async () => {
        const result = await axios.get('/api/courses');
        console.log(result.data);
        setCourseList(result.data);
        
    }
    return (
        <div className='mt-10'>
            <h2 className='font-bold text-xl'>CourseList </h2>

            {courses?.length == 0 ? (
                <div className='flex p-7 items-center justify-center flex-col border-2 border-dashed border-gray-300 rounded-lg mt-10 bg-secondary' >
                    <Image src={'/rocket.gif'} alt="Go to moon" width={100} height={100}  />
                <h2 className='my-2 text-large font-bold '> Looks Like you haven't made any courses yet </h2>
                <AddNewCourseDialog>
<Button>+Create your first course </Button>
</AddNewCourseDialog>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-rows-3 gap-5 '>
                     {courses?.map((course,index) => (
                        //courseList 
                     <CourseCard course={course}  key={index} refreshData={GetCourseList} />
                    ))}
                </div>
            )}  
        </div>
    )
}

export default CourseList