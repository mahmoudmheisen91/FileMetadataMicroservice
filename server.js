"use strict";

let express = require("express");
let cors = require("cors");

// require and use "multer"...
let multer = require("multer");
let storage = multer.memoryStorage();
let upload = multer({ storage: storage });

let app = express();
app.use(cors());

app.use(express.static("public"));
//app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function(req, res) {
  // res.sendFile(__dirname + "/views/index.html");
  res.sendFile(process.cwd() + "/views/index.html");
});

// Greeting endpoint...
app.get("/hello", function(req, res) {
  res.json({ greetings: "Hello, API" });
});

// File Analyze:
app.post("/api/fileanalyse", upload.single("file"), (req, res, next) => {
  let obj = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(obj);
  next();
});

// Listen for requests :)
let listener = app.listen(3000 || process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
