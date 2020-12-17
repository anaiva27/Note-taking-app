// require dependencies
const path = require("path")
const fs = require("fs")

// routes for html files when user makes a request to the server
module.exports = function (app) {
    app.get("/notes", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))
    });

    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });
};