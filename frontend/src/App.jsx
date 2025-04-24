import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [editNote, setEditNote] = useState({ _id: '', title: '', content: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');

  // Fetch notes from server
  useEffect(() => {
    fetch('http://localhost:8080/api/notes')
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  // Add or Edit a note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update Note
      const res = await fetch(`http://localhost:8080/api/notes/${editNote._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editNote),
      });
      const updated = await res.json();
      setNotes(notes.map(n => n._id === updated._id ? updated : n));
      setIsEditing(false);
      setEditNote({ _id: '', title: '', content: '' });
    } else {
      // Add Note
      const res = await fetch('http://localhost:8080/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setNotes([...notes, data]);
      setForm({ title: '', content: '' });
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`http://localhost:8080/api/notes/${id}`, {
      method: 'DELETE',
    });
    setNotes(notes.filter(note => note._id !== id));
  };

  // Set note to edit
  const handleEdit = (note) => {
    setEditNote(note);
    setIsEditing(true);
  };

  // Function to format date using date-fns
  const formatDate = (dateString) => {
    try {
      const date = parseISO(dateString);
      return format(date, 'MM/dd/yyyy HH:mm:ss'); // Format as MM/DD/YYYY HH:mm:ss
    } catch (error) {
      console.error('Invalid date:', dateString);
      return 'Invalid Date';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'} min-h-screen p-6 transition-all duration-300`}>
      <div className="max-w-2xl mx-auto">

        {/* Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-center w-full">📝 Notes App</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-6 px-4 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-200 transition"
          >
            {darkMode ? '🌞 Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
        />

        {/* Add/Edit Note Form */}
        <form onSubmit={handleSubmit} className={`p-6 rounded-2xl mb-8 shadow-lg ${darkMode ? 'bg-white/10 backdrop-blur' : 'bg-white/10 backdrop-blur'}`}>
          <input
            className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
            placeholder="Note Title"
            value={isEditing ? editNote.title : form.title}
            onChange={(e) => {
              const value = e.target.value;
              isEditing
                ? setEditNote({ ...editNote, title: value })
                : setForm({ ...form, title: value });
            }}
            required
          />
          <textarea
            className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
            placeholder="Note Content"
            value={isEditing ? editNote.content : form.content}
            onChange={(e) => {
              const value = e.target.value;
              isEditing
                ? setEditNote({ ...editNote, content: value })
                : setForm({ ...form, content: value });
            }}
            required
          />
          <button
            type="submit"
            className="w-full bg-white text-indigo-700 font-bold py-2 px-4 rounded-lg hover:bg-indigo-200 transition"
          >
            {isEditing ? '✏️ Update Note' : '➕ Add Note'}
          </button>
        </form>

        {/* Display Notes */}
        <div className="grid gap-4">
          {notes
            .filter(note =>
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.content.toLowerCase().includes(search.toLowerCase())
            )
            .map(note => (
              <div
                key={note._id}
                className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur hover:scale-[1.03] transition relative flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{note.title}</h2>
                  <p className="text-white/80">{note.content}</p>
                  {/* Display Created Date and Time */}
                  <p className="text-white/60 text-sm mt-2">{`Created: ${formatDate(note.createdAt)}`}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEdit(note)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                    title="Edit Note"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                    title="Delete Note"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
