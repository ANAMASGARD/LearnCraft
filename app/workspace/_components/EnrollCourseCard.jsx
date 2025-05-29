import React from 'react'
import Image from 'next/image'
import { BookAIcon, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

function EnrollCourseCard({course, enrollCourse}) {
    // Get course data safely with multiple fallback paths
    const courseName = course?.courseJson?.course?.name || "Untitled Course";
    const courseDescription = course?.courseJson?.course?.description || course?.description || "No description available";
    
    // Log data to help debug
    console.log("Course in card:", course);
    console.log("Course name:", courseName);
    console.log("Course description:", courseDescription);

    const calculateProgress = () => {
        // Get number of completed chapters (defaulting to 0 if null/undefined)
        const completed = enrollCourse?.completedChapters?.length || 0;
        
        // Get total number of chapters from courseContent (defaulting to 1 to avoid division by zero)
        const total = course?.courseContent?.length || 1;
        
        // Calculate percentage with fallback to 0 for NaN
        const progress = (completed / total) * 100;
        return isNaN(progress) ? 0 : progress;
    }

    return (
        <div className='shadow-md rounded-xl flex flex-col h-full overflow-hidden transition-all hover:shadow-lg'>
            <Image 
                src={'/rocket.gif'} 
                alt="Course banner" 
                width={400} 
                height={300}  
                className='w-full aspect-video rounded-t-xl object-cover'
            />
            
            <div className='p-4 flex flex-col gap-3 bg-white flex-grow'>
                <h2 className='font-bold text-lg line-clamp-1 text-gray-900'>{courseName}</h2>
                <p className='line-clamp-2 text-gray-500 text-sm flex-grow'>{courseDescription}</p>
                
                <div className='mt-auto pt-2'>
                    <h2 className='flex justify-between text-sm text-primary'> 
                        Progress <span>{calculateProgress().toFixed(0)}%</span>
                    </h2>
                    <Progress value={calculateProgress()} className="h-2 my-2" />

                    <Link href={'/workspace/view-course/'+course?.cid} className='block w-full'>
                        <Button className='w-full mt-2 gap-1 flex items-center justify-center'>
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