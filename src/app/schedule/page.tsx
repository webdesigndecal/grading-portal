'use client';

import ScheduleWeek from '@/components/ScheduleWeek/ScheduleWeek';
import { Assignment, AssignmentType } from '@/types/schema';
import { getAllAssignments } from '@/api/assignments';
import { useEffect, useState } from 'react';

export default function Schedule() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    useEffect(() => {
        getAllAssignments().then((assignments) => setAssignments(assignments));
    });

    return (
        <div>
            <h1>Schedule</h1>
            <ScheduleWeek
                number={1}
                week_start={new Date()}
                week_end={new Date()}
                programming_recording="asdf"
                programming_slides="asdf"
                design_recording="asdf"
                design_slides="asdf"
                assignments={assignments}
            />
        </div>
    );
}
