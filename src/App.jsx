import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import EventCard from './components/EventCard';
import Modal from './components/Modal';

import Login from './components/Login';
import Signup from './components/Signup';
import CalendarView from './components/CalendarView';

const Dashboard = ({ view, setView }) => {
  const { user, events, addEvent, updateEvent, registrations } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
    capacity: '',
    startTime: '',
    endTime: ''
  });

  if (view === 'login') return <Layout setView={setView}><Login setView={setView} /></Layout>;
  if (view === 'signup') return <Layout setView={setView}><Signup setView={setView} /></Layout>;

  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (editingEvent) {
      updateEvent({ ...newEvent, id: editingEvent.id });
    } else {
      addEvent(newEvent);
    }
    closeModal();
  };

  const openAddModal = () => {
    setEditingEvent(null);
    setNewEvent({ title: '', date: '', description: '', location: '', capacity: '', startTime: '', endTime: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setNewEvent({ ...event });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    setNewEvent({ title: '', date: '', description: '', location: '', capacity: '', startTime: '', endTime: '' });
  };

  const filteredEvents = view === 'my-activities' && user
    ? events.filter(e => registrations.some(r => r.eventId === e.id && r.studentId === user.id))
    : events;

  return (
    <Layout setView={setView}>
      <div className="flex justify-between items-center mb-8">
        <h1>
          {view === 'my-activities' ? 'My Activities' : view === 'calendar' ? 'Event Calendar' : 'Upcoming Events'}
        </h1>
        <div className="flex gap-sm">
          {view !== 'calendar' && (
            <button className="btn btn-secondary" onClick={() => setView('calendar')}>
              View Calendar
            </button>
          )}
          {view === 'calendar' && (
            <button className="btn btn-secondary" onClick={() => setView('home')}>
              List View
            </button>
          )}
          {user?.role === 'admin' && view !== 'my-activities' && (
            <button className="btn btn-primary" onClick={openAddModal}>
              + Add New Event
            </button>
          )}
        </div>
      </div>

      {view === 'calendar' ? (
        <CalendarView />
      ) : filteredEvents.length === 0 ? (
        <div className="text-center py-12" style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--text-secondary)' }}>
          <p>No events found.</p>
          {view === 'my-activities' && (
            <button className="btn btn-secondary mt-4" onClick={() => setView('home')}>
              Browse Events
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onEdit={() => openEditModal(event)} />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingEvent ? "Edit Event" : "Add New Event"}>
        <form onSubmit={handleSaveEvent} className="flex flex-col gap-md">
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Event Title</label>
            <input
              className="input"
              required
              value={newEvent.title}
              onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
              placeholder="e.g. Annual Science Fair"
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Date</label>
              <input
                type="date"
                className="input"
                required
                value={newEvent.date}
                onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Capacity</label>
              <input
                type="number"
                className="input"
                required
                min="1"
                value={newEvent.capacity}
                onChange={e => setNewEvent({ ...newEvent, capacity: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Location</label>
            <input
              className="input"
              required
              value={newEvent.location}
              onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
              placeholder="e.g. Main Auditorium"
            />
          </div>

          <div className="grid grid-cols-2 gap-md">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Start Time</label>
              <input
                type="time"
                className="input"
                required
                value={newEvent.startTime || ''}
                onChange={e => setNewEvent({ ...newEvent, startTime: e.target.value })}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>End Time</label>
              <input
                type="time"
                className="input"
                required
                value={newEvent.endTime || ''}
                onChange={e => setNewEvent({ ...newEvent, endTime: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category</label>
            <select
              name="category"
              value={newEvent.category || 'General'}
              onChange={e => setNewEvent({ ...newEvent, category: e.target.value })}
              className="input"
              required
            >
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Sports">Sports</option>
              <option value="Arts">Arts</option>
              <option value="Social">Social</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description</label>
            <textarea
              className="input"
              required
              rows="4"
              value={newEvent.description}
              onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
              placeholder="Event details..."
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="flex justify-end gap-sm mt-4">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingEvent ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

function App() {
  const [view, setView] = useState('home'); // 'home' | 'my-activities'

  return (
    <AppProvider>
      <Dashboard view={view} setView={setView} />
    </AppProvider>
  );
}

export default App;
