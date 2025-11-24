import React from 'react';

const LandingPage = ({ onNavigate }) => {
    const features = [
        {
            icon: '📅',
            title: 'Event Management',
            description: 'Browse and register for extracurricular activities with ease. Never miss an opportunity!'
        },
        {
            icon: '🎯',
            title: 'Smart Calendar',
            description: 'Visualize all events in an interactive calendar with hover previews and easy navigation.'
        },
        {
            icon: '✅',
            title: 'Attendance Tracking',
            description: 'Admins can mark attendance digitally, making event management seamless and efficient.'
        },
        {
            icon: '🏷️',
            title: 'Categorized Events',
            description: 'Events organized by categories: Academic, Sports, Arts, Social, and more.'
        },
        {
            icon: '👥',
            title: 'Student Dashboard',
            description: 'Track your registered activities and manage your extracurricular involvement.'
        },
        {
            icon: '🔐',
            title: 'Secure & Simple',
            description: 'Easy sign-up process with secure authentication. Your data is safe with us.'
        }
    ];

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
                padding: '4rem 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h1 style={{
                            fontSize: '3rem',
                            fontWeight: 800,
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.03em',
                            lineHeight: 1.2
                        }}>
                            Connect, Engage, Excel
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: 'var(--text-secondary)',
                            marginBottom: '2.5rem',
                            lineHeight: 1.6
                        }}>
                            Your all-in-one platform for managing student extracurricular activities.
                            Discover events, track attendance, and build your campus experience.
                        </p>
                        <div className="flex gap-md justify-center">
                            <button
                                className="btn btn-primary"
                                onClick={() => onNavigate('signup')}
                                style={{ fontSize: '1.1rem', padding: '0.875rem 2rem' }}
                            >
                                Get Started Free
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => onNavigate('login')}
                                style={{ fontSize: '1.1rem', padding: '0.875rem 2rem' }}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div style={{ padding: '4rem 0', backgroundColor: 'var(--surface-color)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{
                            fontSize: '2.5rem',
                            fontWeight: 700,
                            marginBottom: '1rem',
                            color: 'var(--text-primary)'
                        }}>
                            Why Choose CampusConnect?
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                            Everything you need to manage and participate in campus activities
                        </p>
                    </div>

                    <div className="grid" style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginTop: '3rem'
                    }}>
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="card"
                                style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-8px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                }}
                            >
                                <div style={{
                                    fontSize: '3rem',
                                    marginBottom: '1rem',
                                    filter: 'drop-shadow(0 4px 8px rgba(139, 92, 246, 0.2))'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    marginBottom: '0.75rem',
                                    color: 'var(--primary-color)'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    color: 'var(--text-secondary)',
                                    lineHeight: 1.6,
                                    fontSize: '0.95rem'
                                }}>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))' }}>
                <div className="container">
                    <div className="grid" style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '3rem',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>500+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Active Students</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>100+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Events Monthly</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>50+</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Active Clubs</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '0.5rem' }}>98%</div>
                            <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--surface-color)' }}>
                <div className="container">
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        marginBottom: '1rem',
                        color: 'var(--text-primary)'
                    }}>
                        Ready to Get Started?
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2rem',
                        maxWidth: '600px',
                        margin: '0 auto 2rem'
                    }}>
                        Join hundreds of students already using CampusConnect to enhance their campus experience.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => onNavigate('signup')}
                        style={{ fontSize: '1.1rem', padding: '0.875rem 2.5rem' }}
                    >
                        Create Your Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
