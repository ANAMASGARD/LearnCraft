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

    return NextResponse.json(result);
}
  
return NextResponse.json('resp : Already enrolled in this course');

}

export async function GET(request) {

        const user = await currentUser();

    const result = await db.select().from(coursesTable)
    .innerJoin(enrollCourseTable,eq(coursesTable.cid, enrollCourseTable.cid))
    .where(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(enrollCourseTable.id));

    return NextResponse.json(result);
}