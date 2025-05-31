import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/config/db";
import { coursesTable , enrollCourseTable } from "@/config/schema"; // Note the "s" in Courses
import { and, desc ,eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request) {

  const { courseId } = await request.json(); 
  const user = await currentUser();
  //if course already enrolled 
  const enrollCourses = await db.select().from(enrollCourseTable)
  .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress), 
  eq(enrollCourseTable.cid, courseId)))

  if(enrollCourses?.length == 0) {
      const result = await db.insert(enrollCourseTable).values({
        cid: courseId,
        userEmail: user.primaryEmailAddress?.emailAddress,
        
      }).returning(enrollCourseTable);

      // Serialize the result to fix JSON serialization error
      const serializedResult = JSON.parse(JSON.stringify(result));
      return NextResponse.json(serializedResult);
  }
    
  return NextResponse.json('resp : Already enrolled in this course');
}

export async function GET(request) {  // Use 'request' not 'req'
  try {
    const user = await currentUser();

    const { searchParams } = new URL(request.url);  // Fixed line
    const courseId = searchParams.get('courseId');

    if(courseId) {
      const result = await db.select().from(coursesTable)
      .innerJoin(enrollCourseTable,eq(coursesTable.cid, enrollCourseTable.cid))
      .where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),
      eq(enrollCourseTable.cid, courseId)))
      .orderBy(desc(enrollCourseTable.id));

      // Serialize the result to fix JSON serialization error
      const serializedResult = result[0] ? JSON.parse(JSON.stringify(result[0])) : null;
      return NextResponse.json(serializedResult);
    } else {
      const result = await db.select().from(coursesTable)
      .innerJoin(enrollCourseTable,eq(coursesTable.cid, enrollCourseTable.cid))
      .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(enrollCourseTable.id));

      // Serialize the result to fix JSON serialization error
      const serializedResult = JSON.parse(JSON.stringify(result));
      return NextResponse.json(serializedResult);
    }
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function  PUT(req) {
  const {completedChapter, courseId} = await req.json();
  const user = await currentUser();
  const result = await db.update(enrollCourseTable).set({
    completedChapters: completedChapter
  }).where(and(eq(enrollCourseTable.cid, courseId),
  eq( enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress)))
  .returning(enrollCourseTable);
  
  // Serialize the result to fix JSON serialization error
  const serializedResult = JSON.parse(JSON.stringify(result));
  return NextResponse.json(serializedResult);
}