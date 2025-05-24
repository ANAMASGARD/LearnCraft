import React from 'react'
import Image from 'next/image'
import { BookAIcon, Link, LoaderPinwheel, PlayCircle, Settings, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function EnrollCourseCard({course , enrollCourse}) {
    const courseJson = course?.courseJson?.course;

    const CalculatePerProgress = (course) => {
        return (enrollCourse?.completedChapters?.length??0/course?.courseContent?.length) * 100;
    }
  return (
    
  <div className='shadow-md rounded-xl flex flex-col h-full overflow-hidden transition-all hover:shadow-lg'>
      <Image 
        src={'/rocket.gif'} 
        alt="Go to moon" 
        width={400} 
        height={300}  
        className='w-full aspect-video rounded-t-xl object-cover'
      />
      
      <div className='p-4 flex flex-col gap-3 bg-white flex-grow'>
        <h2 className='font-bold text-lg line-clamp-1'>{courseJson?.name}</h2>
        <p className='line-clamp-2 text-gray-500 text-sm flex-grow'>
            {courseJson?.description}</p>
        
        <div className=''>
            <h2 className='flex justify-between text-sm text-primary'> Progress <span>{CalculatePerProgress()}%</span></h2>
         <Progress value={CalculatePerProgress} />

         <Link href={'/workspace/course/'+course?.cid} className='text-sm text-gray-600 flex items-center gap-1'>

         <Button className={'w-full mt-2 gap-1 flex items-center justify-center'} >
            <PlayCircle className="h-4 w-4" /> 
            Continue Learning
         </Button>
         </Link>

        </div>
      </div>
    </div>
  )
}

export default EnrollCourseCard