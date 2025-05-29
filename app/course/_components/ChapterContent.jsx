import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';


function ChapterContent({courseInfo}) {
  const { course , enrollCourse } = courseInfo ?? '';
   const courseContent = courseInfo?.courses?.courseContent;
   const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext);
   const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
 return (
   <div className='p-10'>
      <h2 className='font-bold text-2xl '>{courseContent?.[selectedChapterIndex]?.courseData?.chapterName} </h2>
      <h2 className='my-2 font-bold text-lg'> Related Videos </h2>
      <div>
           {videoData?.map((video, index) => (
               <div key={index}>
                   <YouTube
                   videoId={video?.id.videoId}/>
                    </div>
           ))}
      </div>
   </div>
 )
}


export default ChapterContent

