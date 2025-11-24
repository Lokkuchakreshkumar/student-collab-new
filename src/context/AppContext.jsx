import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const MOCK_EVENTS = [
  { id: '1', title: 'Coding Club Workshop', date: '2023-11-15', startTime: '15:00', endTime: '17:00', location: 'Room 304', description: 'Learn React basics.', capacity: 30, category: 'Academic' },
  { id: '2', title: 'Basketball Tryouts', date: '2023-11-20', startTime: '16:00', endTime: '18:00', location: 'Gymnasium', description: 'Join the team!', capacity: 50, category: 'Sports' },
  { id: '3', title: 'Science Fair', date: '2023-12-05', startTime: '09:00', endTime: '14:00', location: 'Auditorium', description: 'Showcase your projects.', capacity: 100, category: 'Academic' },
];

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { role: 'admin' | 'student', id: string, name: string }
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]); // { eventId, studentId }

  const [users, setUsers] = useState([]); // Array of user objects

  // Load data from LocalStorage on mount
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    const storedRegistrations = localStorage.getItem('registrations');
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');

    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      setEvents(MOCK_EVENTS);
      localStorage.setItem('events', JSON.stringify(MOCK_EVENTS));
    }

    if (storedRegistrations) {
      setRegistrations(JSON.parse(storedRegistrations));
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with default admin
      const defaultAdmin = { id: 'admin-1', name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' };
      setUsers([defaultAdmin]);
      localStorage.setItem('users', JSON.stringify([defaultAdmin]));
    }
  }, []);

  // Save data to LocalStorage whenever it changes
  useEffect(() => {
    if (events.length > 0) localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  useEffect(() => {
    if (users.length > 0) localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const signup = (name, email, password, role = 'student') => {
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already exists' };
    }
    const newUser = { id: Date.now().toString(), name, email, password, role };
    setUsers([...users, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const login = (email, password) => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
  };

  const addEvent = (event) => {
    const newEvent = { ...event, id: Date.now().toString() };
    setEvents([...events, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const registerForEvent = (eventId) => {
    if (!user || user.role !== 'student') return;
    if (registrations.some(r => r.eventId === eventId && r.studentId === user.id)) return;

    setRegistrations([...registrations, { eventId, studentId: user.id }]);
  };

  const unregisterFromEvent = (eventId) => {
    if (!user || user.role !== 'student') return;
    setRegistrations(registrations.filter(r => !(r.eventId === eventId && r.studentId === user.id)));
  };

  const isRegistered = (eventId) => {
    if (!user) return false;
    return registrations.some(r => r.eventId === eventId && r.studentId === user.id);
  };

  const getRegisteredStudents = (eventId) => {
    const studentIds = registrations.filter(r => r.eventId === eventId).map(r => r.studentId);
    return users.filter(u => studentIds.includes(u.id));
  };

  const [attendance, setAttendance] = useState({}); // { eventId: [userId1, userId2] }

  useEffect(() => {
    const storedAttendance = localStorage.getItem('attendance');
    if (storedAttendance) {
      setAttendance(JSON.parse(storedAttendance));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  const markAttendance = (eventId, userIds) => {
    setAttendance(prev => ({
      ...prev,
      [eventId]: userIds
    }));
  };

  const getAttendance = (eventId) => {
    return attendance[eventId] || [];
  };

  return (
    <AppContext.Provider value={{
      user,
      events,
      registrations,
      login,
      signup,
      logout,
      addEvent,
      updateEvent,
      deleteEvent,
      registerForEvent,
      unregisterFromEvent,
      isRegistered,
      getRegisteredStudents,
      markAttendance,
      getAttendance
    }}>
      {children}
    </AppContext.Provider>
  );
};
