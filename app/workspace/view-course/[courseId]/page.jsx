"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import CourseInfo from '../../edit-course/_components/CourseInfo';
import ChapterTopicList from '../../edit-course/_components/ChapterTopicList';

function ViewCourse() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState();

  useEffect(() => {
    GetCourseInfo();
  }, [])
    
  const GetCourseInfo = async () => {
    setLoading(true);
    const result = await axios.get('/api/courses?courseId=' + courseId);
    console.log(result.data);
    setLoading(false);
    setCourse(result.data);
  }
  
  return (
    <div>
      <CourseInfo course={course} viewCourse={true} />
      <ChapterTopicList course={course} />
    </div>
  )
}

export default ViewCourse