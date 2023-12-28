import { Assignment, AssignmentType } from '@/types/schema';
import supabase from '@/api/createClient';
import { timestamptzToDate } from '@/utils/helper';

function parseAssignment(assignment: any): Assignment {
    const due_date = timestamptzToDate(assignment.due_date);
    return {
        id: assignment.id,
        type: assignment.type,
        due_date,
        starter_file_url: assignment.starter_file_url,
        number: assignment.number,
        title: assignment.title,
    } as Assignment;
}

export function toShorthand(assignment: Assignment): string {
    switch (assignment.type) {
        case AssignmentType.HOMEWORK:
            return `hw${assignment.number}`;
        case AssignmentType.LAB:
            return `lab${assignment.number}`;
        case AssignmentType.PROJECT:
            return assignment.number == 0 ? 'midterm' : 'final';
        default:
            throw new Error(`Invalid assignment type: ${assignment.type}`);
    }
}

export async function getAllAssignments(): Promise<Assignment[]> {
    const { data, error } = await supabase.from('assignments').select();

    if (error) {
      throw new Error(`Error reading assignments: ${error.message}`);
    }

    return data.map(parseAssignment);
}

export async function getAssignmentById(id: string): Promise<Assignment> {
    const { data, error } = await supabase.from('assignments').select().eq('id', id).single();
    if (error) {
        throw new Error(`Error getting assignment by id: ${error.message}`);
    }
    return parseAssignment(data);
}

/* Returns the created assignment. */
export async function createAssignment(assignment: Assignment, starter_file: File): Promise<void> {
    const { data: storage_data, error: storage_error } = await supabase.storage.from('assignment-starters')
        .upload(`${toShorthand(assignment)}/${starter_file.name}`, starter_file);
    if (storage_error) {
        throw new Error(`Error uploading starter file: ${storage_error.message}`);
    }
    assignment.starter_file_url = storage_data.path;
    console.log(assignment);
    const { data, error } = await supabase.from('assignments').insert([assignment]).single();
    if (error) {
        throw new Error(`Error creating assignment: ${error.message}`);
    }
}

export async function removeAssignment(id: string): Promise<void> {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (error) {
        throw new Error(`Error removing assignment: ${error.message}`);
    }
}