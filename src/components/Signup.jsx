import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Signup = ({ setView }) => {
    const { signup } = useAppContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = signup(name, email, password);
        if (result.success) {
            setView('home');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
            <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-6" style={{ textAlign: 'center' }}>Create Account</h2>

                {error && (
                    <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                        <input
                            type="text"
                            className="input"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                        <input
                            type="email"
                            className="input"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <input
                            type="password"
                            className="input"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Sign Up
                    </button>
                </form>

                <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    Already have an account?{' '}
                    <button
                        onClick={() => setView('login')}
                        style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 500, padding: 0 }}
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
