"use client"
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios';
import { useState } from 'react';
import CourseInfo from '../_components/CourseInfo';
import ChapterTopicList from '../_components/ChapterTopicList';

export default function EditCoursePage({ params }) {
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
            <CourseInfo course={course} viewCourse={false} />
            <ChapterTopicList course={course} />
        </div>
    )
}