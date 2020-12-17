// require and set up express
const express = require("express")
const app = express();

// set an initial port
let PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static("public"));

// set up routes
require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

// set up listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT)
});
