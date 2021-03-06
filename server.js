// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var profileData = {
   name: "Auston Wilkinson",
   gihubLink: "http://github.com/wilkdasilk",
   githubProfileImage: "https://avatars2.githubusercontent.com/u/23746921?v=3&amp;s=460",
   personalSiteLink: "http://wilkdasilk.github.io",
   currentCity: "San Francisco",
   friends: [{name: "Jayce", source: "college", type: "goober"}, {name: "Michelle", source: "high school", type: "adventurer"}]
 }

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//GET profile
app.get('/api/profile', function profile(req,res){
  res.json(profileData);
});

//Get all Shows
app.get('/api/shows', function showAll(req,res){
  db.Show.find(function(err,shows){
    if (err) {return console.log("Error: ",err);}
    res.json(shows);
  });
});

//Get one Show by ID
app.get('/api/shows/:id', function showById(req, res){
  db.Show.findById(req.params.id, function(err,show){
    if (err){return console.log("error: ", err);}
    else if (!show){return console.log("I'm not planning to watch that show");}
    else {
      res.json(show);
    }
  });
});

//add a show
app.post('/api/shows', function recommendShow(req, res){
  db.Show.create(req.body, function(err, newShow){
    if(err){return console.log("error: ",err);}
    res.json(newShow);
  });
});

//update one show by ID
app.put('/api/shows/:id', function updateShowById(req,res){
  db.Show.update({_id : req.params.id}, req.body, { new: true }, function(err, confirmation){
    if (err){return console.log("Error: ", err);}
    //
    //BROKEN: need to catch if no shows match the id. How?
    //
    res.json(confirmation);
  });
});

//remove one show by id
app.delete('/api/shows/:id', function removeShowById(req,res){
  db.Show.remove({_id: req.params.id}, function(err, confirmation){
    if (err){return console.log("Error: ",err);}
    res.json(confirmation);
  });
});

//get API documentation 
app.get('/api', function apiIndex(req, res) {

  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/wilkdasilk/express-personal-api/README.md",
    baseUrl: "https://aqueous-peak-19600.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Facts on my human experience"},
      {method: "GET", path: "/api/shows", description: "Index of all the shows I should watch"},
      {method: "GET", path: "/api/shows/:id", description: "Find a specific show I should watch"},
      {method: "POST", path: "/api/shows", description: "Recommend a show I should watch"},
      {method: "PUT", path: "/api/shows/:id", description: "Edit info about a specific show I should watch"},
      {method: "DELETE", path: "/api/shows/:id", description: "Remove a show from my list"}
    ]
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
