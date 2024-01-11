import { Assignment, Student, Submission } from "@/types/schema";
import { supabase, s3 } from "@/api/createClient";
import { toShorthand } from "./assignments";
import { timestamptzToDate } from "@/utils/helper";
import { PutObjectCommand, S3ServiceException } from "@aws-sdk/client-s3";

function parseSubmission(submission: any): Submission {
    const submitted_at = timestamptzToDate(submission.submitted_at);
    return {
        id: submission.id,
        student_db_id: submission.student_db_id,
        assignment_db_id: submission.assignment_db_id,
        submitted_at,
        file_url: submission.file_url,
        grade: submission.grade,
    } as Submission;
}

async function storeSubmissionToS3(file_url: string, file: File) {
    const command = new PutObjectCommand({
        Bucket: 'wdd-submissions',
        Key: file_url,
        Body: file,
        ContentType: file.type,
    });
    try {
        return await s3.send(command);
    } catch (e: any) {
        throw new Error(`Error uploading file: ${e.message}`);
    }
}

export async function submitAssignment(assignment: Assignment, file: File, student: Student): Promise<Submission> {
    const file_url = `${student.student_id}/${toShorthand(assignment)}/${file.name}`;
    const response = await storeSubmissionToS3(file_url, file);

    const submission = {
        student_db_id: student.id,
        assignment_db_id: assignment.id,
        submitted_at: new Date(),
        file_url,
        grade: -1,
    } as Submission;

    const { error: db_error } = await supabase.from('submissions').insert([submission]).single();
    if (db_error) {
        throw new Error(`Error creating submission: ${db_error.message}`);
    }

    return submission;
}

export async function getAllStudentSubmissions(student_id: string): Promise<Submission[]> {
    const { data, error } = await supabase.from('submissions').select().eq('student_db_id', student_id);
    if (error) {
        throw new Error(`Error getting submissions: ${error.message}`);
    }

    return data.map(parseSubmission);
}

export async function getSubmissionFileFromPath(file_path: string): Promise<string> {
    const { data: public_url_data } = supabase.storage.from('submissions').getPublicUrl(file_path);
    const full_url = public_url_data.publicUrl;
    const response = await fetch(full_url);
    console.log(response.statusText, full_url);
    return await response.text();
}
