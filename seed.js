// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var newShow1 = {
  title: "Mad Men",
  cast: "Jon Hamm, Elisabeth Moss, Vincent Kartheiser",
  creators: "Matthew Weiner",
  description: "In 1960s New York City, in the ego-driven Golden Age of advertising, everyone is selling something and nothing is what it seems.",
  seasons: 7
};

var newShow2 = {
  title: "The Walking Dead",
  cast: "Andrew Lincoln, Steven Yeun, Chandler Riggs",
  creators: "Frank Darabont, Robert Kirkman",
  description: "In the wake of a zombie apocalypse, survivors hold on to the hope of humanity by banding together to wage a fight for their own survival.",
  seasons: 6
};

var newShow3 = {
  title: "Game of Thrones",
  cast: "Emelia Clarke, Sophie Turner, Kit Harlington, Maisie Williams, Lena Headey, Peter Dinklage",
  creators: "George R. R. Martin, David Benioff, D.B. Weiss",
  description: "In the North, after thousands of years of disappearance, the Others, commonly called 'White Walkers' are back. The War of Five Kings is raging. In the East, Dany is using her dragons and amassing an army to return to Westeros and reclaim her throne.",
  seasons: 6
};

var newShow4 = {
  title: "Orange is the New Black",
  cast: "Taylor, Schilling, Kate Mulgrew, Laura Prepon",
  creators: "Jenji Kohan",
  description: "A privileged New Yorker ends up in a women's prison when a past crime catches up with her in this Emmy-winning series from the creator of 'Weeds.'",
  seasons: 4
};

var newShow5 = {
  title: "The OA",
  cast: "Brit Marling, Jason Isaacs, Emory Cohen",
  creators: "Brit Marling, Zal Batmanglij",
  description: "Seven years after vanishing from her home, a young woman returns with mysterious new abilities and recruits five strangers for a secret mission.",
  seasons: 1
};


db.Show.remove(function(err){
  if (err){return console.log("Error:", err);}
  db.Show.create([newShow1, newShow2, newShow3, newShow4, newShow5], function(err, show){
     if (err){
       return console.log("Error:", err);
     }
     console.log("Created new shows to watch");
     process.exit(); // we're all done! Exit the program.
   })
});
