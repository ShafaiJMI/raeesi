'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
    
        try {
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.message || 'Login failed');
          }
    
          // Login successful - redirect or handle token
          router.push('/');
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };

    return (
<div>
    <h4>Login</h4>
    <div>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="email" required/>
            <input type="password" required/>
            <button type="submit">Login</button>
        </form>
    </div>
</div>
    )
}