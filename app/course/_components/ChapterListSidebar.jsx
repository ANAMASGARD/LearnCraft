import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function ChapterListSidebar({courseInfo}) {
  // const { courseId } = useParams();
  const courseId = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourse;
  const courseContent = courseInfo?.courses?.courseContent;
  const {selectedChapterIndex , setSelectedChapterIndex}=useContext(SelectedChapterIndexContext);
  return (
    <div className='w-80 bg-secondary h-screen p-5'>
        <h2 className='text-2xl font-bold text-gray-900 mb-4'>Chapters ({courseContent?.length})</h2>
        <Accordion type="single" collapsible>
    {courseContent?.map((chapter, index) => (
        <AccordionItem value={chapter?.courseData?.chapterName} key={index}
          onClick={() => setSelectedChapterIndex(index)} 
          
          >
    <AccordionTrigger className={'text-lg font-medium text-gray-800 hover:bg-gray-200 rounded-md p-3 flex items-center gap-2'}>
        {index + 1 }. {chapter?.courseData?.chapterName}</AccordionTrigger>
    <AccordionContent asChild>
      <div className='p-4 bg-amber-50 rounded-lg'>
       {chapter?.courseData?.topics?.map((topic, index) => (
        <h2 key={index} className='p-3 text-gray-700 text-sm pl-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer'>
            {topic?.topic}
        </h2>
       ))}
      </div>
    </AccordionContent>
  </AccordionItem>
     ))}
  
</Accordion>

    </div>
  )
}

// function ChapterContent({courseInfo}) {
//     const courseContent = courseInfo?.courses?.courseContent;
//     const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContent);
    
//     // Use selectedChapterIndex directly without defaulting to 0
//     // This will make it reactive to sidebar clicks
//     const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
    
//     // Debug logs to see what's happening
//     console.log("Selected chapter index:", selectedChapterIndex);
//     console.log("Video data:", videoData);
    
//     return (
//         <div className='p-10'>
//             <h2 className='font-bold text-2xl'>
//                 {courseContent?.[selectedChapterIndex]?.courseData?.chapterName} 
//             </h2> 
//             <h2 className='my-2 font-bold text-lg'>Related Videos</h2>
//             <div>
//                 {videoData?.map((video, index) => (
//                     <div key={index}>
//                         <YouTube videoId={video?.id?.videoId}/>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

export default ChapterListSidebar
// export { ChapterContent }