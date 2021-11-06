require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const Database = require("./database");
const {
  MyError,
  NotFoundPath,
  PathAlreadyExist,
  UserAlreadyExist,
  ServerError,
  UserDoesNotExist,
} = require("./errors/errors");
const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("./middleware/errorHandler");


//#region 
let db = new Database();

app.use(cors());
app.use(express.urlencoded({
  extended: true
}))
app.use("/public", express.static(`../public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../views/index.html");
});

app.get("/redirect/:newURL", (req, res, next) => {
  const { newURL } = req.params;
  let found = false;
  db.urls.urls.forEach(obj => {
    if(obj.newURL === newURL){
      found = true;
      console.log(obj.originalURL);
      db.addRedirection(obj.newURL);
      res.redirect(obj.originalURL);
    }
  });
  try{
    if(found === false){
      throw new NotFoundPath();
    }
  }
  catch(err){
    next(err);
  }
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
  let exist = false;
  db.users.users.forEach(e => {
    try{
      if(e.username === req.get("username")){
        exist = true;
        throw new UserAlreadyExist();
      }
    }
    catch(err){
      res.send(err.type);
    }
  })
  if(exist === false){
    db.addUser(req.get("username"), req.get("password"), req.get("pro"));
    console.log(db);
    res.send("User Added");
  }
  else{
    res.send("User Already Exist");
  }
});

app.post("/shorten", (req, res) => {
  db.urls.urls.forEach(urlObj => {
    try{
      if(urlObj.originalURL === req.get("url")){
        throw new PathAlreadyExist();
      }
    }
    catch(err){
      res.send(urlObj.newURL);
    }
  });
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
app.get("/statistics/:newUrl", (req, res, next) => {
  const { newUrl } = req.params;
  let found = false;
  db.urls.urls.forEach(urlObj => {
    if(urlObj.newURL === newUrl){
      found = true;
      res.send("Number Of Redirections : " + urlObj.redirections);
    }
  });
  try{
    if(found === false){
      throw new NotFoundPath();
    }
  }
  catch(err){
    res.send(err.type);
  }
});

app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

//#endregion
module.exports = app;
