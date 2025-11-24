import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, setView }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar setView={setView} />
            <main style={{ flex: 1, padding: '2rem 0' }}>
                <div className="container">
                    {children}
                </div>
            </main>
            <footer style={{ backgroundColor: 'white', borderTop: '1px solid var(--border-color)', padding: '1.5rem 0', marginTop: 'auto' }}>
                <div className="container text-center" style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
                    &copy; 2023 CampusConnect. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Layout;
