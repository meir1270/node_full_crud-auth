const express = require("express");
const dbConfig = require("./database.config");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  }); 
 
// create express app
const app = express();
app.use(express.json());  

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.",
  });
});

// listen for requests
require("./routes/note.routes")(app);
require("./routes/student.routes")(app);
require("./routes/animal.routes")(app);
require("./routes/user.routes")(app);

app.listen(3005, () => {
  console.log("Server is listening on port 3005");
});
    