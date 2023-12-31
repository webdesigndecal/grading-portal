import { Assignment } from '@/types/schema';
import Link from 'next/link';
import styles from './ScheduleWeek.module.css';
import { toShorthand } from '@/api/assignments';

type SchduleWeekProps = {
    number: number;
    week_start: Date;
    week_end: Date;
    programming_recording: string | null;
    programming_slides: string | null;
    design_recording: string | null;
    design_slides: string | null;
    assignments: Assignment[];
};

type ChipProps = {
    backgroundColor: string;
    href: string;
    text: string;
};

function Chip({
    link_type,
    href,
    children,
}: {
    link_type: string;
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link href={href} className={`${styles.chip} ${styles[link_type]}`}>
            {children}
        </Link>
    );
}

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
        <div className={styles.container}>
            <h1>
                Week {number}: {week_start_string} - {week_end_string}
            </h1>
            <table>
                <tbody>
                    <tr className={styles.row}>
                        <td>
                            <h2>Programming</h2>
                        </td>
                        <td>
                            {programming_recording && (
                                <Chip
                                    href={programming_recording}
                                    link_type="recording"
                                >
                                    Recording
                                </Chip>
                            )}
                            {programming_slides && (
                                <Chip
                                    href={programming_slides}
                                    link_type="slides"
                                >
                                    Slides
                                </Chip>
                            )}
                        </td>
                    </tr>
                    <tr className={styles.row}>
                        <td>
                            <h2>Design</h2>
                        </td>
                        <td>
                            {design_recording && (
                                <Chip
                                    href={design_recording}
                                    link_type="recording"
                                >
                                    Recording
                                </Chip>
                            )}
                            {design_slides && (
                                <Chip href={design_slides} link_type="slides">
                                    slides
                                </Chip>
                            )}
                        </td>
                    </tr>
                    {assignments.map((assignment) => {
                        const formattedType =
                            assignment.type.charAt(0) +
                            assignment.type.slice(1).toLowerCase();
                        const formattedDueDate =
                            assignment.due_date.toLocaleDateString('en', {
                                month: 'numeric',
                                day: 'numeric',
                            });
                        return (
                            <tr className={styles.row} key={assignment.id}>
                                <td>
                                    <h2>{formattedType}</h2>
                                </td>
                                <td>
                                    <Chip
                                        href={assignment.starter_file_url}
                                        link_type={assignment.type}
                                    >
                                        {formattedType} {assignment.number}:{' '}
                                        {assignment.title}{' '}
                                        <strong>due {formattedDueDate}</strong>
                                    </Chip>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
