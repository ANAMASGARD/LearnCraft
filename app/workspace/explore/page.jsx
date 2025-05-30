"use client"
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import CourseCard from '../_components/CourseCard'
import { Skeleton } from '@/components/ui/skeleton'




function Explore() {
    const [courses, setCourseList] = useState([]);
        const { user } = useUser();
        useEffect(() => {
          user && GetCourseList();
        }, [user]);
    
        const GetCourseList = async () => {
            const result = await axios.get('/api/courses?courseId=0');
            console.log(result.data);
            setCourseList(result.data);
            
        }
  return (
    <div>
        <h2 className='font-bold text-3xl mb-6 '> EXplore More Courses</h2>
        <div className='flex items-center justify-between max-w-md mb-5'>  
              <Input placeholder="Search"/> 
              <Button className='ml-2 bg-primary' variant='outline'> <Search /> Search</Button>
             </div>

             
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-rows-3 gap-5 '>
                     {courses.length>0?courses?.map((course,index) => (
                        //courseList 
                     <CourseCard course={course}  key={index} refreshData={GetCourseList}/>
                    ))
                : 
                [0,1,2,3].map((item,index) => (
            <Skeleton  key={index} className='w-full h-[240px ]' />
   )) 
   }
                </div>
              
      
    </div>
  )
}

export default Explore