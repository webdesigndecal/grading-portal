import { Assignment } from '@/types/schema';
import supabase from '@/api/createClient';

function parseAssignment(assignment: any): Assignment {
    const due_date = new Date(assignment.due_date);
    return {
        id: assignment.id,
        type: assignment.type,
        due_date,
        starter_file_url: assignment.starter_file_url,
        number: assignment.number,
        title: assignment.title,
    } as Assignment;
}

async function getAllAssignments(): Promise<Assignment[]> {
    const { data, error } = await supabase.from('assignments').select();

    if (error) {
      throw new Error(`Error reading assignments: ${error.message}`);
    }

    return data.map(parseAssignment);
}

async function getAssignmentById(id: string): Promise<Assignment> {
    const { data, error } = await supabase.from('assignments').select().eq('id', id).single();
    if (error) {
        throw new Error(`Error getting assignment by id: ${error.message}`);
    }
    return parseAssignment(data);
}

/* Returns the created assignment. */
async function createAssignment(assignment: Assignment): Promise<Assignment> {
    const { data, error } = await supabase.from('assignments').insert([assignment]).single();
    if (error) {
        throw new Error(`Error creating assignment: ${error.message}`);
    }
    return parseAssignment(data);
}

async function removeAssignment(id: string): Promise<void> {
    const { error } = await supabase.from('assignments').delete().eq('id', id);
    if (error) {
        throw new Error(`Error removing assignment: ${error.message}`);
    }
}

export { getAllAssignments, getAssignmentById, createAssignment, removeAssignment };