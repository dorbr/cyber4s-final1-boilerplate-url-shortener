require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//Genrate New URL Button Clicked Event Handler

//Signup Basic Users

//Signup Pro Users



//Download CV Button Clicked Event Handler

//Contact Button Clicked Event Handler

//#region 
let db = [];

app.use(cors());
app.use(express.urlencoded({
  extended: true
}))
app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/redirect/:newURL", (req, res) => {
  const { newURL } = req.params;
  db.forEach(obj => {
    if(obj.newURL === newURL){
      console.log(obj.originalURL);
      obj.redirections++;
      res.redirect(obj.originalURL);
    }
  });
});
app.post("/shorten", (req, res) => {
  let newURL = (new Date()).getTime().toString(36);
  db.push({
    originalURL: req.body.url,
    newURL: newURL,
    creationDate : Date.now(),
    redirections : 0,
  });
  console.log(db);
  res.end();
});
//#endregion
module.exports = app;
