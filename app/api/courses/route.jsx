import { NextResponse } from 'next/server';
import { coursesTable, usersTable } from '@/config/schema';
import { db } from '@/config/db';
import { desc, eq } from 'drizzle-orm';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');
    const user = await currentUser(); // Renamed to "user" to match usage below
    
    if (courseId) {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.cid, courseId));

        return NextResponse.json(result[0]);
    } else {
        const result = await db.select().from(coursesTable)
            .where(eq(coursesTable.userEmail, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(coursesTable.id)); // <-- chain orderBy here

        console.log(result);
        return NextResponse.json(result);
    }
}