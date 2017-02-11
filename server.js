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
   personalSiteLink: "wilkdasilk.github.io",
   currentCity: "San Francisco",
   friends: [{name: "Jayce", source: "college", type: "goober"}, {name: "Michelle", source: "High School", type: "adventurer"}]
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


app.get('/api/profile', function profile(req,res){
  res.json(profileData)
});

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false,
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
  })
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
