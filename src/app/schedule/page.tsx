import ScheduleWeek from '@/components/ScheduleWeek';
import { Assignment, AssignmentType } from '@/types/schema';

export default function Schedule() {
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
                assignments={[
                    {
                        id: '582ff807-1b79-4a3d-b43a-86369abb39b1',
                        type: AssignmentType.HOMEWORK,
                        due_date: new Date('2023-12-28T07:59:00.000Z'),
                        number: 1,
                        title: 'First homework',
                        starter_file_url: '',
                    } as Assignment,
                ]}
            />
        </div>
    );
}
