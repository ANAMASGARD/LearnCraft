import { Button } from '@/components/ui/button';
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import axios from 'axios';
import { CheckCircle, Cross, Loader2Icon, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useContext } from 'react'
import YouTube from 'react-youtube';
import { toast } from 'sonner';
import { useState } from 'react';

function ChapterContent({courseInfo, refreshData}) {
  const { courseId } = useParams();
  const { course , enrollCourses } = courseInfo ?? '';  // ✅ Correct - plural
   const courseContent = courseInfo?.courses?.courseContent;
   const {selectedChapterIndex, setSelectedChapterIndex} = useContext(SelectedChapterIndexContext);
   const videoData = courseContent?.[selectedChapterIndex]?.youtubeVideo;
   const topics = courseContent?.[selectedChapterIndex]?.courseData?.topics;
   let completedChapter = enrollCourses?.completedChapters?? [];

    const [loading, setLoading] = useState(false);
   const markChapterCompleted = async () => {
    setLoading(true);
    try {
      completedChapter.push(selectedChapterIndex);
      const result = await axios.put('/api/enroll-course', { 
        courseId: courseId,
        completedChapter: completedChapter  // ✅ Fixed to singular to match API
      });

      console.log(result.data);
      await refreshData(); // Add await to ensure data is refreshed
      toast.success('Chapter marked as completed');
    } catch (error) {
      console.error('Error marking chapter as completed:', error);
      toast.error('Failed to mark chapter as completed');
    } finally {
      setLoading(false);
    }
   }

   const markInCompleteChapter = async () => {
      setLoading(true);
      try {
        const completeChap = completedChapter.filter((item) => item !== selectedChapterIndex);
        const result = await axios.put('/api/enroll-course', { 
          courseId: courseId,
          completedChapter: completeChap  // ✅ Fixed to singular to match API
        });

        console.log(result.data);
        await refreshData();
        toast.success('Chapter marked as incomplete');
      } catch (error) {
        console.error('Error marking chapter as incomplete:', error);
        toast.error('Failed to mark chapter as incomplete');
      } finally {
        setLoading(false);
      }
   }

 return (
   <div className='p-10 max-w-4xl mx-auto min-h-screen'>
    <div className='flex items-center justify-between mb-5'>
      <h2 className='font-bold text-2xl'>{courseContent?.[selectedChapterIndex]?.courseData?.chapterName}</h2>
      {!completedChapter?.includes(selectedChapterIndex) ? (
        <Button onClick={() => markChapterCompleted()} disabled={loading}>
          {loading ? <Loader2Icon className='animate-spin'/> : <CheckCircle />} 
          Mark as Completed 
        </Button>
      ) : (
        <Button variant="outline" onClick={() => markInCompleteChapter()} disabled={loading}>
          {loading ? <Loader2Icon className='animate-spin'/> : <X />}
          Mark Incomplete 
        </Button>
      )}
    </div>
      
      <h2 className='my-2 font-bold text-lg'>Related Videos 🎬</h2>
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
              <h2 className='font-bold text-2xl text-primary'>{index+1}. {topic?.topic}</h2>
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