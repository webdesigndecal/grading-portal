
export enum AssignmentType {
    HOMEWORK, 
    LAB, 
    PROJECT,
}

export type Assignment = {
    id: string,
    type: AssignmentType,
    due_date: Date,
    starter_file_url: string,
    number: number,
    title: string,
}

export type Student = {
    id: string,
    assigned_ta_db_id: string | null,
    student_id: string,
    name: string,
    email: string,
}

export type Submission = {
    id: string,
    student_db_id: string, // database student id
    assignment_db_id: string, // database assignment id
    submitted_at: Date,
    file_url: string,
    grade: number,
}

export type TeachingAssistant = {
    id: string,
    name: string,
    email: string,
}