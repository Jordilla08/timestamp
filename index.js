// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const isInvalidDate = (date) => isNaN(date.getTime());

// API endpoint to handle dates
app.get("/api/:date?", function (req, res) {
  let dateInput = req.params.date;

  // If no date is provided, use the current date
  if (!dateInput) {
    const currentDate = new Date();
    return res.json({
      unix: currentDate.getTime(),
      utc: currentDate.toUTCString(),
    });
  }

  // Check if dateInput is a valid number (timestamp)
  if (!isNaN(dateInput)) {
    dateInput = parseInt(dateInput); // Convert to number for timestamps
  }

  // Create a Date object from the dateInput
  const date = new Date(dateInput);

  // Check if the date is invalid
  if (isInvalidDate(date)) {
    return res.json({ error: "Invalid Date" });
  }

  // Respond with Unix and UTC format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
