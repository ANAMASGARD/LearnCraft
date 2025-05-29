import React from 'react'
import { useParams } from 'next/navigation'; // Adjust import based on your routing library

function ViewCourse() {
  const {courseId} = useParams(); // Assuming you're using a routing library that provides useParams
  return (
    <div>ViewCourse</div>
  )
}

export default ViewCourse