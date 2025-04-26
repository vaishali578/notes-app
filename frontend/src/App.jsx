import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import NoteForm from './components/NoteForm';
import NoteCard from './components/NoteCard';
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';
import AuthForm from './components/AuthForm'; // 💥 New AuthForm Component

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [editNote, setEditNote] = useState({ _id: '', title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');

  // 🔥 Authentication states
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [token, setToken] = useState('');

  useEffect(() => {
    if (token) {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = () => {
    fetch('http://localhost:8080/api/notes', {
      headers: {
        Authorization: `Bearer ${token}`, // send token if needed
      },
    })
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fetch error:', err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('You must be logged in!');
    if (isEditing) {
      const res = await fetch(`http://localhost:8080/api/notes/${editNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editNote),
      });
      const updated = await res.json();
      setNotes(notes.map(n => n._id === updated._id ? updated : n));
      setIsEditing(false);
      setEditNote({ _id: '', title: '', content: '' });
    } else {
      const res = await fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotes([...notes, data]);
      setForm({ title: '', content: '' });
    }
  };

  const deleteNote = async (id) => {
    if (!token) return alert('You must be logged in!');
    await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotes(notes.filter(note => note._id !== id));
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MM/dd/yyyy HH:mm:ss');
    } catch {
      return 'Invalid Date';
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    const url = authMode === 'login' ? 'http://localhost:8080/api/login' : 'http://localhost:8080/api/signup';

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });
      const data = await res.json();

      if (data.token) {
        setToken(data.token);
        setAuthData({ email: '', password: '' });
      } else {
        alert(data.message || 'Authentication failed.');
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleLogout = () => {
    setToken('');
    setNotes([]);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'} min-h-screen p-6 transition-all duration-300`}>
      <div className="max-w-2xl mx-auto">

        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <h1 className="text-4xl font-bold text-center mb-6">📝 Notes App</h1>

        {!token ? (
          <AuthForm
            authMode={authMode}
            authData={authData}
            setAuthData={setAuthData}
            handleAuthSubmit={handleAuthSubmit}
            setAuthMode={setAuthMode}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <SearchBar search={search} setSearch={setSearch} />
              <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full">
                Logout
              </button>
            </div>

            <NoteForm
              isEditing={isEditing}
              editNote={editNote}
              setEditNote={setEditNote}
              form={form}
              setForm={setForm}
              handleSubmit={handleSubmit}
            />

            <div className="grid gap-4">
              {notes
                .filter(note =>
                  note.title.toLowerCase().includes(search.toLowerCase()) ||
                  note.content.toLowerCase().includes(search.toLowerCase())
                )
                .map(note => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    handleEdit={handleEdit}
                    deleteNote={deleteNote}
                    formatDate={formatDate}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
