import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react'


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function ChapterListSidebar({courseInfo, onChapterSelect}) {
  // const { courseId } = useParams();
  const courseId = courseInfo?.courses;
  const enrollCourse = courseInfo?.enrollCourses;  // Changed to plural
  const courseContent = courseInfo?.courses?.courseContent;
  const {selectedChapterIndex , setSelectedChapterIndex}=useContext(SelectedChapterIndexContext);
  let completedChapter = enrollCourse?.completedChapters?? [];
  
  const handleChapterClick = (index) => {
    setSelectedChapterIndex(index);
    if (onChapterSelect) {
      onChapterSelect(); // Close sidebar on mobile
    }
  };
  
  return (
    <div className='w-80 bg-secondary h-full p-5'>
        <h2 className=' my-3 text-2xl font-bold '>Chapters ({courseContent?.length})</h2>
        <Accordion type="single" collapsible>
    {courseContent?.map((chapter, index) => (
        <AccordionItem value={chapter?.courseData?.chapterName} key={index}
          onClick={() => handleChapterClick(index)} 
          
          >
    <AccordionTrigger className={`text-lg font-medium
    ${completedChapter.includes(index) ? ' bg-green-100 text-green-800 ': ''}`}>
        {index + 1 }. {chapter?.courseData?.chapterName}</AccordionTrigger>
    <AccordionContent asChild>
      <div className='p-4 my-1 bg-gray-50 rounded-lg'>
       {chapter?.courseData?.topics?.map((topic, index_) => (
        <h2 key={index_} className={`p-3 text-gray-700 text-sm pl-4 py-2 hover:bg-gray-200 rounded-md 
        cursor-pointer${completedChapter.includes(index) ? ' bg-green-100 text-green-800 ': 'bg-white'}`}>
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



export default ChapterListSidebar
