import { UUID } from "crypto"

export enum AssignmentType {
    HOMEWORK = "HOMEWORK", 
    LAB = "LAB", 
    PROJECT = "PROJECT",
}

/* Takes lowercase name (homework, lab, project) and converts to assignmentType. */
export function stringToType(type: string) {
    switch (type) {
        case 'homework':
            return AssignmentType.HOMEWORK;
        case 'lab':
            return AssignmentType.LAB;
        case 'project':
            return AssignmentType.PROJECT;
        default:
            throw new Error(`Invalid assignment type: ${type}`);
    }

}

export type Assignment = {
    id: UUID,
    type: AssignmentType,
    due_date: Date,
    starter_file_url: string,
    number: number,
    title: string,
}

export type Student = {
    id: UUID,
    assigned_ta_db_id: UUID | null,
    student_id: string,
    name: string,
    email: string,
}

export type Submission = {
    id: UUID,
    student_db_id: UUID, // database student id
    assignment_db_id: UUID, // database assignment id
    submitted_at: Date,
    file_url: string,
    grade: number,
}

export type TeachingAssistant = {
    id: UUID,
    name: string,
    email: string,
}