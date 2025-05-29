import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';


function ChapterContent({courseInfo}) {
  const { course , enrollCourse } = courseInfo ?? '';
   const courseContent = courseInfo?.courses?.courseContent;
   const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext);
   const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
   const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
 return (
   <div className='p-10'>
      <h2 className='font-bold text-2xl '>{courseContent?.[selectedChapterIndex]?.courseData?.chapterName} </h2>
      <h2 className='my-2 font-bold text-lg'> Related Videos 🎬 </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
           {videoData?.map((video, index) => index < 2 && (
               <div key={index}>
                   <YouTube
                   videoId={video?.id.videoId}
                   opts={{
                    height: '300',
                    width: '400',
                    
                   }}
                   />
                    </div>
           ))}
      </div>
      <div className='mt-7'>
           {topics?.map((topic, index) => (
            <div key={index} className='mt-10 p-4 bg-secondary rounded-2xl mb-3'>
              <h2 className='font-bold text-2xl text-primary'> {index+1}.  {topic?.topic}</h2>
              <div dangerouslySetInnerHTML={{ __html: topic?.content }} 
               style={{ lineHeight: '2.5', fontSize: '17px', color: '#333' }}>
                
                 </div>
               </div>
           ))}

      </div>
   </div>
 )
}


export default ChapterContent

