'use client';

import { getAllAssignments } from '@/api/assignments';
import { Assignment } from '@/types/schema';
import { useEffect, useState } from 'react';

export default function Assignments() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        getAllAssignments().then((assignments) => setAssignments(assignments));
    }, []);

    return (
        <div>
            <h1>Assignments</h1>
            {assignments.map((assignment) => (
                <div key={assignment.id}>
                    <h2>{`${assignment.type} ${assignment.number}`}</h2>
                    <h3>{assignment.title}</h3>
                    <p>
                        {assignment.due_date.toLocaleString('en-US', {
                            dateStyle: 'full',
                            timeStyle: 'short',
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
}
