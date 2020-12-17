// require dependencies
const path = require("path")
const fs = require("fs")

const dbJson = require("../db/db.json")

module.exports = function (app) {
  // return saved notes as JSON
  app.get("/api/notes", function (req, res) {
    res.json(dbJson)
  })

  // create a new note
  app.post("/api/notes", function (req, res) {
    let addNote = req.body
    addNote.id = dbJson[dbJson.length - 1].id + 1
    dbJson.push(addNote)
    fs.writeFile("./db/db.json", JSON.stringify(dbJson), (err) => { if (err) throw err })
    res.json(addNote)

  })

  // delete a note
  app.delete("/api/notes/:id", function (req, res) {
   
  })
}