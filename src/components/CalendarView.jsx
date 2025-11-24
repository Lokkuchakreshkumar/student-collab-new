import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const CalendarView = () => {
    const { events } = useAppContext();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

    const handleMouseEnter = (e, event) => {
        setHoveredEvent(event);
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => {
        setHoveredEvent(null);
    };

    return (
        <div className="card" style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
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

            <div className="grid grid-cols-7 gap-px" style={{ backgroundColor: 'var(--border-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
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
                            overflow: 'hidden',
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
                                        onMouseEnter={(e) => handleMouseEnter(e, event)}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={handleMouseLeave}
                                        style={{
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                                            margin: '1px 0',
                                            cursor: 'pointer',
                                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {hoveredEvent && (
                <div style={{
                    position: 'fixed',
                    top: mousePos.y + 15,
                    left: mousePos.x + 15,
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid rgba(255,255,255,0.5)',
                    zIndex: 1000,
                    maxWidth: '280px',
                    pointerEvents: 'none'
                }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)', fontSize: '1rem' }}>{hoveredEvent.title}</h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        <p style={{ margin: '0 0 0.25rem 0' }}>📅 {hoveredEvent.date}</p>
                        {hoveredEvent.startTime && (
                            <p style={{ margin: '0 0 0.25rem 0' }}>⏰ {hoveredEvent.startTime} - {hoveredEvent.endTime}</p>
                        )}
                        <p style={{ margin: '0 0 0.5rem 0' }}>📍 {hoveredEvent.location}</p>
                        <p style={{ margin: 0, lineHeight: 1.4 }}>{hoveredEvent.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CalendarView;
