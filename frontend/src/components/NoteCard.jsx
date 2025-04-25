import React from 'react';

function NoteCard({ note, handleEdit, deleteNote, formatDate }) {
  return (
    <div className="bg-white/10 p-6 rounded-xl shadow-md backdrop-blur hover:scale-[1.03] transition relative flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">{note.title}</h2>
        <p className="text-white/80">{note.content}</p>
        <p className="text-white/60 text-sm mt-2">{`Created: ${formatDate(note.createdAt)}`}</p>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handleEdit(note)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-1 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => deleteNote(note._id)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
