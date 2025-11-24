import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import Modal from './Modal';

const EventCard = ({ event, onEdit }) => {
    const { user, registerForEvent, unregisterFromEvent, isRegistered, deleteEvent, getRegisteredStudents } = useAppContext();
    const registered = isRegistered(event.id);
    const registeredStudents = getRegisteredStudents(event.id);
    const [showStudentsModal, setShowStudentsModal] = useState(false);

    // SVG Icons
    const CalendarIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
    );
    const ClockIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
    );
    const MapPinIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
    );
    const UsersIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
    );

    return (
        <>
            <div className="card flex flex-col" style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                {/* Decorative top bar */}
                <div style={{ height: '6px', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))', position: 'absolute', top: 0, left: 0, right: 0 }}></div>

                <div className="flex justify-between items-start mb-4 mt-2">
                    <div>
                        <span className="badge" style={{
                            backgroundColor: 'var(--accent-color)',
                            color: 'white',
                            fontSize: '0.65rem',
                            marginBottom: '0.5rem',
                            display: 'inline-block'
                        }}>
                            {event.category || 'General'}
                        </span>
                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: 700 }}>{event.title}</h3>
                    </div>
                    <span className="badge badge-blue flex items-center gap-xs">
                        <CalendarIcon /> {event.date}
                    </span>
                </div>

                <p style={{ flex: 1, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{event.description}</p>

                <div style={{ marginTop: '1.5rem', display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {event.startTime && (
                        <div className="flex items-center gap-sm">
                            <span style={{ color: 'var(--primary-color)' }}><ClockIcon /></span>
                            <span>{event.startTime} - {event.endTime}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-sm">
                        <span style={{ color: 'var(--primary-color)' }}><MapPinIcon /></span>
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-sm justify-between">
                        <div className="flex items-center gap-sm">
                            <span style={{ color: 'var(--primary-color)' }}><UsersIcon /></span>
                            <span>Capacity: {event.capacity}</span>
                        </div>
                        <span style={{ color: 'var(--success-color)', fontWeight: 600, fontSize: '0.8rem', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '12px' }}>
                            {registeredStudents.length} Registered
                        </span>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                    {user?.role === 'student' && (
                        registered ? (
                            <button className="btn btn-secondary" style={{ width: '100%', borderColor: 'var(--danger-color)', color: 'var(--danger-color)' }} onClick={() => unregisterFromEvent(event.id)}>
                                Unregister
                            </button>
                        ) : (
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => registerForEvent(event.id)}>
                                Register Now
                            </button>
                        )
                    )}

                    {user?.role === 'admin' && (
                        <div className="flex flex-col gap-sm">
                            <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setShowStudentsModal(true)}>
                                View Registered Students
                            </button>
                            <div className="flex gap-sm">
                                <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onEdit}>
                                    Edit
                                </button>
                                <button className="btn btn-danger" style={{ flex: 1 }} onClick={() => deleteEvent(event.id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}

                    {!user && (
                        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                            Login to register
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={showStudentsModal} onClose={() => setShowStudentsModal(false)} title={`Registered Students - ${event.title}`}>
                <AttendanceList
                    students={registeredStudents}
                    eventId={event.id}
                    onClose={() => setShowStudentsModal(false)}
                />
            </Modal>
        </>
    );
};

const AttendanceList = ({ students, eventId, onClose }) => {
    const { markAttendance, getAttendance } = useAppContext();
    const [attendedIds, setAttendedIds] = useState(getAttendance(eventId));

    const handleCheckboxChange = (studentId) => {
        setAttendedIds(prev => {
            if (prev.includes(studentId)) {
                return prev.filter(id => id !== studentId);
            } else {
                return [...prev, studentId];
            }
        });
    };

    const handleSubmit = () => {
        markAttendance(eventId, attendedIds);
        onClose();
        alert('Attendance posted successfully!');
    };

    if (students.length === 0) {
        return <p className="text-center" style={{ color: 'var(--text-secondary)' }}>No students registered yet.</p>;
    }

    return (
        <div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem 0' }}>
                {students.map(student => (
                    <li key={student.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="flex items-center gap-sm">
                            <input
                                type="checkbox"
                                checked={attendedIds.includes(student.id)}
                                onChange={() => handleCheckboxChange(student.id)}
                                style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                            />
                            <div>
                                <div style={{ fontWeight: 500 }}>{student.name}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{student.email}</div>
                            </div>
                        </div>
                        {attendedIds.includes(student.id) && (
                            <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Present</span>
                        )}
                    </li>
                ))}
            </ul>
            <div className="flex justify-end gap-sm">
                <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Post Attendance</button>
            </div>
        </div>
    );
};

export default EventCard;
