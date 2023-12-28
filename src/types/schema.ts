
enum AssignmentType {
    'HOMEWORK', 
    'LAB', 
    'PROJECT',
}

type Assignment = {
    id: string,
    type: AssignmentType,
    due_date: Date,
    starter_file_url: string,
    number: number,
    title: string,
}

type Student = {
    id: string,
    assigned_ta_db_id: string,
    student_id: string,
    email: string,
}

type Submission = {
    id: string,
    student_db_id: string, // database student id
    assignment_db_id: string, // database assignment id
    submitted_at: Date,
    file_url: string,
    grade: number,
}

type TeachingAssistant = {
    id: string,
    name: string,
    email: string,
}

export type { Assignment, Student, Submission, TeachingAssistant };