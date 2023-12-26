'use client';

import supabase from '@/api/createClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            throw new Error(`Error signing up: ${error.message}`);
        }

        router.push('/');
    };

    return (
        <div>
            <h1>Log In</h1>
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
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    );
}
