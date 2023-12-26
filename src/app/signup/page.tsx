'use client';

import supabase from '@/api/createClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailSentCount, setEmailSentCount] = useState(0);

    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'http://localhost:3000/',
            },
        });

        console.log(data);

        if (error) {
            throw new Error(`Error signing up: ${error.message}`);
        }

        setEmailSentCount(1);
    };

    return !emailSentCount ? (
        <div>
            <h1>Sign Up</h1>
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
        </div>
    );
}
