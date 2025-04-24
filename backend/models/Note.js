const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
    title : String,
    content : String
},
{ timestamps: true }
)

const Note = new mongoose.model("Note",notesSchema)
module.exports = Note;