// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5000;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// GET route that returns the projectData object.
app.get("/api/serverData", (req, res) => {
  res.send(projectData);
});

// POST route that adds incoming data to the projectData Object.
app.post("/api/weatherInfo", (req, res) => {
  projectData.temp = req.body.temperature;
  projectData.date = req.body.date;
  projectData.userResponse = req.body.userInput;
  console.log(projectData);
  res.send(projectData);
});
