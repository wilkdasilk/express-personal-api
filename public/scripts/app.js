console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  //grab profile data
  $.ajax({
    method: "GET",
    url: "/api/profile",
    success: loadProfile,
    error: logError
  });

  $.ajax({
    method: "GET",
    url: "/api/shows",
    success: loadShows,
    error: logError
  });

  function logError(jqXHR, textStatus, errorThrown){
    console.log("Error data: ", jqXHR);
    console.log("Error status: ", textStatus);
    console.log("Error thrown: ", errorThrown);
  };


  function loadProfile(responseData){

    //fill profile data
    var profileHTML = `
      <img src='${responseData.githubProfileImage}'>
      <h1>${responseData.name}'s profile</h1>
      <a href='${responseData.personalSiteLink}'>Portfolio</a>
      <p>Living in ${responseData.currentCity} || ${responseData.friends.length} friends</p>
      `;
    $(".profile-top").append(profileHTML);
  };

  function loadShows(showData){

    //empty show data
    $('.import-shows').html("");
    if (showData.length){
      //fill show data
      showData.forEach(function(show){

        var showHTML = `
          <div class='show-wrapper'>
            <h5>${show.title}</h5>
            <p>${show.seasons} Season(s)</p>
            <p>Starring: ${show.cast}</p>
            <p>Created by ${show.creators}</p>
            <p class="description">"${show.description}"</p>
          </div>
        `;
        $(".import-shows").append(showHTML);
      });
    } else {
      //fill single show data

        var showHTML = `
          <div class='show-wrapper'>
            <h5>${showData.title}</h5>
            <p>${showData.seasons} Season(s)</p>
            <p>Starring: ${showData.cast}</p>
            <p>Created by ${showData.creators}</p>
            <p class="description">"${showData.description}"</p>
          </div>
        `;
        $(".import-shows").append(showHTML);
      };
  };

  //RESTful routes

  $('form').on('submit', function(event){
    event.preventDefault();
    $.ajax({
      method: $('.method').val(),
      url: "/api/shows/" + $('.inputID').val() || "/api/shows/",
      error: logError,
      success: loadShows
    });
  });

});
