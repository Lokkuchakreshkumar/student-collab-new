import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CalendarView = () => {
    const { events } = useAppContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredEvent, setHoveredEvent] = useState(null);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const { days, firstDay } = getDaysInMonth(currentDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const changeMonth = (offset) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    };

    const getEventsForDay = (day) => {
        const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return events.filter(e => e.date === dateStr);
    };

    const handleMouseEnter = (event) => {
        setHoveredEvent(event);
    };

    const handleMouseLeave = () => {
        setHoveredEvent(null);
    };

    return (
        <div className="card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `}</style>
            <div className="flex justify-between items-center mb-6">
                <button className="btn btn-secondary btn-sm" onClick={() => changeMonth(-1)}>&lt;</button>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <button className="btn btn-secondary btn-sm" onClick={() => changeMonth(1)}>&gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-xs" style={{ textAlign: 'center', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                    <div key={d} style={{ padding: '0.25rem' }}>{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-px" style={{ backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'visible', position: 'relative' }}>
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ aspectRatio: '1/1', backgroundColor: 'var(--surface-color)' }}></div>
                ))}

                {Array.from({ length: days }).map((_, i) => {
                    const day = i + 1;
                    const dayEvents = getEventsForDay(day);
                    const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                    return (
                        <div key={day} style={{
                            aspectRatio: '1/1',
                            backgroundColor: isToday ? '#f0f9ff' : 'var(--surface-color)',
                            padding: '0.25rem',
                            overflow: 'visible',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'background-color 0.2s'
                        }}
                            className="calendar-cell"
                        >
                            <div style={{
                                fontWeight: isToday ? 700 : 500,
                                fontSize: '0.75rem',
                                marginBottom: '0.125rem',
                                textAlign: 'center',
                                color: isToday ? 'var(--primary-color)' : 'inherit'
                            }}>{day}</div>
                            <div className="flex flex-col gap-px" style={{ flex: 1, overflowY: 'hidden', alignItems: 'center', justifyContent: 'center' }}>
                                {dayEvents.map(event => (
                                    <div
                                        key={event.id}
                                        onMouseEnter={() => handleMouseEnter(event)}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                                            margin: '1px 0',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                ))}
                            </div>

                            {hoveredEvent && dayEvents.some(e => e.id === hoveredEvent.id) && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    marginTop: '12px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                    backdropFilter: 'blur(12px)',
                                    padding: '1.25rem',
                                    borderRadius: 'var(--radius-lg)',
                                    boxShadow: '0 20px 60px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.1)',
                                    border: '2px solid rgba(139, 92, 246, 0.2)',
                                    zIndex: 1000,
                                    minWidth: '280px',
                                    maxWidth: '320px',
                                    pointerEvents: 'none',
                                    animation: 'fadeIn 0.2s ease-in-out'
                                }}>
                                    {/* Arrow */}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        left: '50%',
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                        border: '2px solid rgba(139, 92, 246, 0.2)',
                                        borderRight: 'none',
                                        borderBottom: 'none',
                                        transform: 'translateX(-50%) rotate(45deg)'
                                    }}></div>

                                    <h4 style={{
                                        margin: '0 0 0.75rem 0',
                                        background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        letterSpacing: '-0.02em'
                                    }}>{hoveredEvent.title}</h4>

                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                        {hoveredEvent.category && (
                                            <div style={{ marginBottom: '0.75rem' }}>
                                                <span className="badge" style={{
                                                    background: 'linear-gradient(135deg, var(--accent-color), var(--secondary-color))',
                                                    color: 'white',
                                                    fontSize: '0.7rem',
                                                    padding: '4px 10px',
                                                    fontWeight: 600
                                                }}>
                                                    {hoveredEvent.category}
                                                </span>
                                            </div>
                                        )}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '1rem' }}>📅</span>
                                                <span style={{ fontWeight: 500 }}>{hoveredEvent.date}</span>
                                            </p>
                                            {hoveredEvent.startTime && (
                                                <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <span style={{ fontSize: '1rem' }}>⏰</span>
                                                    <span style={{ fontWeight: 500 }}>{hoveredEvent.startTime} - {hoveredEvent.endTime}</span>
                                                </p>
                                            )}
                                            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '1rem' }}>📍</span>
                                                <span style={{ fontWeight: 500 }}>{hoveredEvent.location}</span>
                                            </p>
                                        </div>
                                        <div style={{
                                            marginTop: '0.75rem',
                                            paddingTop: '0.75rem',
                                            borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                                            color: 'var(--text-primary)',
                                            lineHeight: 1.5
                                        }}>
                                            {hoveredEvent.description}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CalendarView;
