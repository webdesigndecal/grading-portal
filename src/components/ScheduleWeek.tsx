import { Assignment } from '@/types/schema';
import Link from 'next/link';

type SchduleWeekProps = {
    number: number;
    week_start: Date;
    week_end: Date;
    programming_recording: string;
    programming_slides: string;
    design_recording: string;
    design_slides: string;
    assignments: Assignment[];
};

export default function ScheduleWeek({
    number,
    week_start,
    week_end,
    programming_recording,
    programming_slides,
    design_recording,
    design_slides,
    assignments,
}: SchduleWeekProps) {
    const week_start_string = week_start.toLocaleDateString();
    const week_end_string = week_end.toLocaleDateString();

    return (
        <div>
            <h1>
                Week {number}: {week_start_string} - {week_end_string}
            </h1>
            <div>
                <h2>Programming</h2>
                <Link href={programming_recording}>Recording</Link>
                <Link href={programming_slides}>Slides</Link>
            </div>
            <div>
                <h2>Design</h2>
                <Link href={design_recording}>Recording</Link>
                <Link href={design_slides}>Slides</Link>
            </div>
            {assignments.map((assignment) => (
                <div key={assignment.id}>
                    <h2>{assignment.type}</h2>
                    <Link href={assignment.starter_file_url}>
                        Starter Files
                    </Link>
                </div>
            ))}
        </div>
    );
}
