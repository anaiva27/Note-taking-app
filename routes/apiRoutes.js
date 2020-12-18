// require dependencies
const path = require("path");
const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid/v1");

const readAsync = util.promisify(fs.readFile);
const writeAsync = util.promisify(fs.writeFile);

const getNotes = () => {
  return readAsync(path.join(__dirname,"../db/db.json"), "utf8").then((notes) => {
    return JSON.parse(notes);
  });
};

const addNote = (note) => {
  const newNote = note;
  newNote.id = uuidv1();

  return getNotes().then((notes) => {
    const oldNotes = notes;
    oldNotes.push(newNote);
    writeAsync(path.join(__dirname,"../db/db.json"), JSON.stringify(oldNotes));
    return newNote;
  });
};

const destroyNote = (id) => {
  return getNotes().then((oldNotes) => {
    const filteredNotes = oldNotes.filter((note) => note.id !== id);
    writeAsync(path.join(__dirname,"../db/db.json"), JSON.stringify(filteredNotes));
    return id;
  });
}

module.exports = function (app) {
  // return saved notes as JSON
  app.get("/api/notes", async function (req, res) {
    
    //.then((notes) => {
      res.json(await getNotes());
    //})
  });
  // create a new note
  app.post("/api/notes", function (req, res) {
    addNote(req.body).then((note) => {
      res.json(note);
    });
    // let addNote = req.body;
    // addNote.id = uuidv1();
    //dbJson[dbJson.length - 1].id + 1;
    // dbJson.push(addNote);
    // fs.writeFile("./db/db.json", JSON.stringify(dbJson), (err) => {
    //   if (err) throw err;
    // });
    // res.json(dbJson);
    //get the notes by reading
    // readAsync("../db/db.json", "utf8").then((notes) => {
    //   //modify the notes to have id
    //   let newNote = req.body;
    //   newNote.id = uuidv1();
    //   //dbJson.push(newNote);
    //   let allNotes = notes;
    //   allNotes.push(newNote);

    //   writeAsync("../db/db.json", JSON.stringify(allNotes)).then(() => {
    //     res.json()
    //   });
      // fs.writeFile("../db/db.json", JSON.stringify(dbJson), (err) => {
      //     if (err) throw err;
      //   });
      //   res.json(dbJson);
    //})
  });

  // delete a note


  app.delete("/api/notes/:id", function (req, res) {
    destroyNote(req.params.id).then((id) => {
      res.json({
        success: true,
        message: `note ${id} has been destroyed`
      });
    });
    // let jsonData = dbJson;

    // let filterJsonData = jsonData.filter(
    //   (addNote) => addNote.id !== req.params.id
    // );
    // console.log(filterJsonData);
    // fs.writeFile("./db/db.json", JSON.stringify(filterJsonData), (err) => {
    //   if (err) throw err;
    // });
    // res.json(
    //   {id: req.params.id}
    // );
  });
};


//get the data reading

//modifiy the data if you need to

//write the dat to db.db.json