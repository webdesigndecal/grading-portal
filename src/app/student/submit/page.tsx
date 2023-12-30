'use client';

import { AssignmentType } from '@/types/schema';
import { useState } from 'react';
import { submitAssignment } from '@/api/submissions';

export default function SubmitAssignment() {
    const [file, setFile] = useState<File>();

    const handleChange = (fileList: FileList | null) => {
        if (!fileList) {
            setFile(undefined);
            return;
        }
        setFile(fileList[0]);
    };

    const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        await submitAssignment(
            {
                id: '582ff807-1b79-4a3d-b43a-86369abb39b1',
                type: AssignmentType.HOMEWORK,
                due_date: new Date('2023-12-28T07:59:00.000Z'),
                number: 1,
                title: 'First homework',
                starter_file_url: '',
            },
            file,
            '1'
        );
    };

    return (
        <div>
            <h1>Submit Assignment</h1>
            <form method="post" onSubmit={(e) => handleSubmission(e)}>
                <label htmlFor="file">File</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => handleChange(e.target.files)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
