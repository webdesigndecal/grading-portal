'use client';

import { createAssignment } from '@/api/assignments';
import { Assignment, AssignmentType, stringToType } from '@/types/schema';
import { useState } from 'react';
import styles from './page.module.css';

export default function UploadAssignment() {
    const [type, setType] = useState<AssignmentType>();
    const [number, setNumber] = useState<number>();
    const [dueDate, setDueDate] = useState<Date>();
    const [title, setTitle] = useState<string>();
    const [file, setFile] = useState<File>();

    const handleFileChange = (fileList: FileList | null) => {
        if (!fileList) {
            setFile(undefined);
            return;
        }
        setFile(fileList[0]);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        switch (e.target.name) {
            case 'type':
                setType(stringToType(e.target.value));
                break;
            case 'number':
                setNumber(parseInt(e.target.value));
                break;
            case 'due_date':
                setDueDate(new Date(e.target.value));
                break;
            case 'title':
                setTitle(e.target.value);
                break;
            case 'file':
                const input = e.target as HTMLInputElement;
                handleFileChange(input.files);
                break;
        }
    };

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('uploading');
        const isFormComplete = type && number && dueDate && title && file;
        if (!isFormComplete) {
            return; // TODO: Add error that you didn't fill out the form
        }

        // TODO: Not necessarily needed, find a way around this
        const assignment = {
            type,
            number,
            due_date: dueDate,
            title,
            starter_file_url: '',
        } as Assignment;
        const createdAssignment = await createAssignment(assignment, file);
        console.log(createdAssignment);
    };

    return (
        <div>
            <h1>Upload Assignment</h1>
            <form
                method="post"
                onSubmit={(e) => handleUpload(e)}
                className={styles.form}
            >
                <label htmlFor="type">Assignment Type</label>
                <select name="type" id="type" onChange={(e) => handleChange(e)}>
                    <option value="homework">Homework</option>
                    <option value="lab">Lab</option>
                    <option value="project">Project</option>
                </select>
                <label htmlFor="number">Number</label>
                <input
                    type="number"
                    name="number"
                    id="number"
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="due_date">Due Date</label>
                <input
                    type="datetime-local"
                    name="due_date"
                    id="due_date"
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    onChange={(e) => handleChange(e)}
                />
                <label htmlFor="file">File</label>
                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => handleChange(e)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
