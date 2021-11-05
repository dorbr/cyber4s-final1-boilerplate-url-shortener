require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Database = require("./database");


//#region 
let db = new Database();

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
  db.urls.urls.forEach(obj => {
    if(obj.newURL === newURL){
      console.log(obj.originalURL);
      db.addRedirection(obj.newURL);
      res.redirect(obj.originalURL);
    }
  });
});



app.post("/createUser", (req, res) => {
  
  // db.urls.urls.forEach(obj => {
  //   if(obj.originalURL === req.get("url")){
  //     res.send(obj.newURL);
  //   }
  // });
  // db.urls.urls.push({
  //   originalURL: req.get("url"),
  //   newURL: newURL,
  //   creationDate : Date.now(),
  //   redirections : 0,
  // });
  db.addUser(req.get("username"), req.get("password"), req.get("pro"));
  console.log(db);
  res.send("User Added");
});

app.post("/shorten", (req, res) => {
  console.log(req.get("url"));
  // db.urls.urls.forEach(obj => {
  //   if(obj.originalURL === req.get("url")){
  //     res.send(obj.newURL);
  //   }
  // });
  let newURL = (new Date()).getTime().toString(36);
  // db.urls.urls.push({
  //   originalURL: req.get("url"),
  //   newURL: newURL,
  //   creationDate : Date.now(),
  //   redirections : 0,
  // });
  db.addUrl(newURL, req.get("url"));
  console.log(db);
  res.send(newURL);
});
//#endregion
module.exports = app;
