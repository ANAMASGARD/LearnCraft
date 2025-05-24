import React from 'react'
import Image from 'next/image'
import { BookAIcon, Link, PlayCircle, Settings, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

function CourseCard({course}) {
  const courseJson = course?.courseJson?.course;
  
  return (
    <div className='shadow-md rounded-xl flex flex-col h-full overflow-hidden transition-all hover:shadow-lg'>
      <Image 
        src={'/rocket.gif'} 
        alt="Go to moon" 
        width={500} 
        height={300}  
        className='w-full aspect-video object-cover rounded-t-xl'
      />
      
      <div className='p-4 flex flex-col gap-3 bg-white flex-grow'>
        <h2 className='font-bold text-lg line-clamp-1'>{courseJson?.name}</h2>
        <p className='line-clamp-2 text-gray-500 text-sm flex-grow'>{courseJson?.description}</p>
        
        <div className='flex flex-col gap-2 mt-auto pt-3 border-t border-gray-100'>
          <div className='flex items-center text-sm text-gray-600'>
            <BookAIcon className='text-primary h-4 w-4 mr-2' /> 
            {courseJson?.noOfChapters} Chapters
          </div>
          
          {course?.courseContent?.length ? (
            <Button size="sm" className="w-full mt-1 gap-2 flex items-center justify-center">
              <PlayCircle className="h-4 w-4" /> 
              Start Learning
            </Button>
          ) : (
            <Link href={'/workspace/edit-course/' + course?.cid} className="w-full">
              <Button 
                size="sm" 
                className="w-full mt-1 gap-2 flex items-center border-2 justify-center bg-primary text-white hover:bg-primary/90"
              > 
                <SettingsIcon className="h-4 w-4" /> 
                <div>
                    Generate Course
                </div>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard