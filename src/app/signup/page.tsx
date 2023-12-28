'use client';

import supabase from '@/api/createClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Student } from '@/types/schema';
import Link from 'next/link';

export default function Login() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [sid, setSID] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailSentCount, setEmailSentCount] = useState(0);

    const handleSignUp = async () => {
        const { data: auth_data, error: auth_error } =
            await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: 'http://localhost:3000/',
                },
            });
        if (auth_error) {
            throw new Error(`Error signing up: ${auth_error.message}`);
        }

        const new_student = {
            id: auth_data.user!.id,
            email: email,
            name: '',
            student_id: '',
            assigned_ta_db_id: null,
        } as Student;

        const { data: db_data, error: db_error } = await supabase
            .from('students')
            .insert([new_student])
            .single();
        if (db_error) {
            throw new Error(`Error signing up: ${db_error.message}`);
        }

        setEmailSentCount(1);
    };

    const handleResend = async () => {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: 'http://localhost:3000/',
            },
        });
        if (error) {
            throw new Error(`Error resending email: ${error.message}`);
        }

        setEmailSentCount(emailSentCount + 1);
    };

    return !emailSentCount ? (
        <div>
            <h1>Sign Up</h1>
            <input
                type="text"
                placeholder="Your Name"
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="number"
                placeholder="1234567890"
                onChange={(e) => setSID(e.target.value.toString())}
            />
            <input
                type="text"
                placeholder="email@example.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => handleSignUp()}>Sign Up</button>
        </div>
    ) : (
        <div>
            <h1>Check your email</h1>
            <p>
                We sent a magic link to <strong>{email}</strong>. Click the link
                to sign in.
            </p>
            <button onClick={() => handleResend()}>
                <p>Resend the email</p>
            </button>
        </div>
    );
}
