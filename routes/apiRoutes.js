// require dependencies
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

// function that gets the notes from json database file
const getNotes = () => {
  return readAsync(path.join(__dirname, "../db/db.json"), "utf8").then(
    (notes) => {
      return JSON.parse(notes);
    }
  );
};

// function that creates a new note and assigns unique ID
const addNote = (note) => {
  const newNote = note;
  newNote.id = uuidv1();
// push the new note to the database file
  return getNotes().then((notes) => {
    const oldNotes = notes;
    oldNotes.push(newNote);
    writeAsync(path.join(__dirname, "../db/db.json"), JSON.stringify(oldNotes));
    return newNote;
  });
};

// function that deletes notes
const destroyNote = (id) => {
  return getNotes().then((oldNotes) => {
    const filteredNotes = oldNotes.filter((note) => note.id !== id);
    writeAsync(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(filteredNotes)
    );
    return id;
  });
};

// exporting express function that creates and deletes notes
module.exports = function (app) {
  app.get("/api/notes", async function (req, res) {
    getNotes().then((notes) => {
      res.json(notes);
    });
  });

  // create a new note
  app.post("/api/notes", function (req, res) {
    addNote(req.body).then((note) => {
      res.json(note);
    });
  });

  // delete a note
  app.delete("/api/notes/:id", function (req, res) {
    destroyNote(req.params.id).then((id) => {
      res.json({
        success: true,
        message: `note ${id} has been destroyed`,
      });
    });
  });
};
