import React from 'react';

function NoteForm({ isEditing, editNote, setEditNote, form, setForm, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl mb-8 shadow-lg bg-white/10 backdrop-blur">
      <input
        className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
        placeholder="Note Title"
        value={isEditing ? editNote.title : form.title}
        onChange={(e) => {
          const value = e.target.value;
          isEditing ? setEditNote({ ...editNote, title: value }) : setForm({ ...form, title: value });
        }}
        required
      />
      <textarea
        className="w-full mb-4 p-3 rounded-lg bg-white/20 placeholder-white text-white focus:outline-none"
        placeholder="Note Content"
        value={isEditing ? editNote.content : form.content}
        onChange={(e) => {
          const value = e.target.value;
          isEditing ? setEditNote({ ...editNote, content: value }) : setForm({ ...form, content: value });
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
  );
}

export default NoteForm;
