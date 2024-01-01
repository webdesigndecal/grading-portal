'use client';

import Link from 'next/link';

export default function StudentIndex() {
    return (
        <div>
            <h1>Student Index</h1>
            <Link href="/student/submit">Submit Assignment</Link>
            <Link href="/student/assignments">Assignments</Link>
            {/* Example of usage for aws s3 service
            
            <Link
                href="https://wdd-submissions.s3.us-west-1.amazonaws.com/hw2/index.html"
                rel="noopener noreferrer"
                target="_blank"
            >
                Homework2
            </Link> */}
        </div>
    );
}
