import React from 'react'
import Image from 'next/image'
import { BookAIcon, LoaderPinwheel, PlayCircle, Settings, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'sonner';
import Link from 'next/link'; // Correct import for Next.js Link

function CourseCard({course}) {
  const courseJson = course?.courseJson?.course;
  const [loading, setLoading] = useState(false);
  const onEnrollCourse = async () => {
    try {
    setLoading(true);
      const result = await axios.post('/api/enroll-course', {
        courseId: course?.cid
      });
      console.log(result.data);
      if (result.data.resp) {
        toast.warning('Already enrolled in this course');
        setLoading(false);
        return;

      }
      toast.success('Successfully enrolled in course');
      setLoading(false);
    } catch (error) {
      toast.error('Server Side error ! Failed to enroll in course');
      setLoading(false);
    }
  }
  
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
            <Button size="sm" className="w-full mt-1 gap-2 flex items-center justify-center"
              onClick={onEnrollCourse}
              disabled={loading}>
                {loading ? <LoaderPinwheel className='animate-spin'/> : (
                  <>
                    <PlayCircle className="h-4 w-4" /> 
                    Enroll Course
                  </>
                )}
            </Button>
          ) : (
            <Link href={'/workspace/edit-course/' + course?.cid} className="w-full">
              <Button
                size="sm"
                className="w-full mt-1 gap-2 flex items-center justify-center bg-gray-100 text-gray-800 border border-blue-300 hover:bg-gray-200 hover:border-primary transition-colors font-semibold"
              >
                <SettingsIcon className="h-4 w-4" />
                Generate Course
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default CourseCard