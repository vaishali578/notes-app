const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note.js");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors()); // <--- Enable CORS
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/dist")));

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(8080, () => console.log("Backend running on http://localhost:8080")))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes...

app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const newNote = new Note(req.body);
  const savedNote = await newNote.save();
  res.json(savedNote);
});

app.put("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
  res.json(updatedNote);
});

app.delete("/api/notes/:id", async (req, res) => {
  const { id } = req.params;
  await Note.findByIdAndDelete(id);
  res.json({ message: "Note deleted" });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
