import { Button } from '@/components/ui/button';
import { BookA, Clock, Settings2, Swords } from 'lucide-react';
import React from 'react'

function CourseInfo({course}) {
    const courseLayout = course?.courseJson?.course;
  return (
    <div>
        <div className=' md:flex flex-col gap-3'>
            <h2 className="text-3xl font-bold text-gray-900">
                {courseLayout?.name}
            </h2>
            <p className=" line-clamp-2 text-gray-700">
                {courseLayout?.description}
            </p>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <div className='flex gap-2 items-center  p-3 rounded-large shadow'>
                <Clock className='text-blue-500'/>
                <section>
                    <h2 className='font-bold '> Duration </h2>
                    <h2> 2 Hours </h2>
                </section>
            </div>

<div className='flex gap-2 items-center  p-3 rounded-large shadow'>
                <BookA className='text-green-500'/>
                <section>
                    <h2 className='font-bold '>Chapters </h2>
                    <h2> 2 Hours </h2>
                </section>
            </div>

            <div className='flex gap-2 items-center  p-3 rounded-large shadow'>
                <Swords className='text-red-500'/>
                <section>
                    <h2 className='font-bold '> Difficulty Level </h2>
                    <h2>{course?.level} </h2>
                </section>
            </div>
            <Button className={'max-w-sm'}> <Settings2 />  Generate Course </Button>
</div>
        </div>
        
    </div>
  )
}

export default CourseInfo