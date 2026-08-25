const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    text: "My first note"
  }
];

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Create note
app.post("/notes", (req, res) => {
  const note = {
    id: Date.now(),
    text: req.body.text
  };

  notes.push(note);

  res.status(201).json(note);
});

// Delete note
app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  notes = notes.filter(note => note.id !== id);

  res.json({
    message: "Note deleted"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});