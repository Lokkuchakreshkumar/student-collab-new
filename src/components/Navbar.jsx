import React from 'react';
import { useAppContext } from '../context/AppContext';

const Navbar = ({ setView }) => {
    const { user, logout } = useAppContext();

    return (
        <nav style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
            <div className="container flex justify-between items-center">
                <div className="flex items-center gap-md" style={{ cursor: 'pointer' }} onClick={() => setView('home')}>
                    <span style={{
                        fontSize: '1.75rem',
                        fontWeight: '800',
                        background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.03em'
                    }}>
                        CampusConnect
                    </span>
                </div>

                <div className="flex items-center gap-lg">
                    {user ? (
                        <>
                            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.95rem' }}>
                                Welcome, <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{user.name}</span>
                                <span className="badge badge-gray" style={{ marginLeft: '0.5rem', fontSize: '0.7rem' }}>{user.role}</span>
                            </span>
                            <div className="flex gap-sm">
                                {user.role === 'student' && (
                                    <button className="btn btn-secondary" onClick={() => setView('my-activities')}>
                                        My Activities
                                    </button>
                                )}
                                <button className="btn btn-secondary" onClick={logout} style={{ borderColor: 'var(--border-color)' }}>
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-sm">
                            <button className="btn btn-secondary" onClick={() => setView('login')}>
                                Login
                            </button>
                            <button className="btn btn-primary" onClick={() => setView('signup')}>
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
