var GENRES = []
var SUBGENRES = {}

Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
}

$(document).ready(function(){
  localStorage.clear();
  $("#home-user-name").text(readCookie("CronosName"));
	populateMainGenreDropDwon();
	createHomeMainView();
  setupSearchMovies();
});

////////////////////////////////////////////////////////////////////////////////
// FILL AUTO COMPLETE OPTIONS
////////////////////////////////////////////////////////////////////////////////
function setupSearchMovies() {
  var options = [];
  
  // Get movie-year info
	$.ajax({
	url: "http://localhost:8080/movies",
	type: "GET",
	dataType: "json",
	contentType: "application/json; charset=utf-8",
    async: false,
	success: function(response) {
		  var length = response.length;
		  for (var i = 0; i < length; i++) {
        options.push({label: response[i].name, value: "MOVIE:" + response[i].id});
        options.push({label: response[i].year.split("-")[0], value: "YEAR:" + response[i].year.split("-")[0]});
		  }
		},
		error: function(response) {
		  var jsonResponse = response.responseJSON;
		  console.log(jsonResponse.msg)
		  showError(jsonResponse.msg)
		}
	});
  
  // Get director info
	$.ajax({
	url: "http://localhost:8080/directors",
	type: "GET",
	dataType: "json",
	contentType: "application/json; charset=utf-8",
    async: false,
	success: function(response) {
		  var length = response.length;
		  for (var i = 0; i < length; i++) {
        options.push({label: response[i].name, value: "DIRECTOR:" + response[i].name});
		  }
		},
		error: function(response) {
		  var jsonResponse = response.responseJSON;
		  console.log(jsonResponse.msg)
		  showError(jsonResponse.msg)
		}
	});
  
   // Get actor info
	$.ajax({
	url: "http://localhost:8080/actors",
	type: "GET",
	dataType: "json",
	contentType: "application/json; charset=utf-8",
    async: false,
	success: function(response) {
		  var length = response.length;
		  for (var i = 0; i < length; i++) {
        options.push({label: response[i].name, value: "ACTOR:" + response[i].name});
		  }
		},
		error: function(response) {
		  var jsonResponse = response.responseJSON;
		  console.log(jsonResponse.msg)
		  showError(jsonResponse.msg)
		}
	});

  $("#srch-movie").autocomplete({source: options, setFocus: true, change: autocompleteHandler})
}

function autocompleteHandler(e, ui) {
  var movieID = this.value;
  var values = movieID.split(":");
  
  if (values.length < 2 ) {
    console.log("Tried to apply search selection, but value is not complete")
  } else if (values[0] == "MOVIE"){
    autoCompleteCreateMovieView(values[1]);
  } else if (values[0] == "DIRECTOR") {
    autoCompleteCreateMoviesByDirector(values[1]);
  } else if (values[0] == "ACTOR") {
    autoCompleteCreateMoviesByActor(values[1]);
  } else if (values[0] == "YEAR") {
    autoCompleteCreateMoviesByYear(values[1]);
  } else {
    console.log("Tried to apply search selection, but not enough information about the category")
  }
}

function autoCompleteCreateMovieView(movieID) {
  $.ajax({
  url: "http://localhost:8080/movies/view/" + movieID,
  type: "GET",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
      localStorage.setItem("CurrentMovieID", movieID);
      populateWithMovie(response)
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function autoCompleteCreateMoviesByDirector(directorName) {
  var directorQuery = directorName.replace(" ", ":");
  $("#home-body").empty();
  
  $.ajax({
  url: "http://localhost:8080/movies/director/" + directorQuery,
  type: "GET",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
    createDynamicMovieView(directorName.replace(" ", "-"), response);
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function autoCompleteCreateMoviesByActor(actorName) {
  var actorQuery = actorName.replace(" ", ":");
  $("#home-body").empty();
  
  $.ajax({
  url: "http://localhost:8080/movies/actor/" + actorQuery,
  type: "GET",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
    createDynamicMovieView(actorName.replace(" ", "-"), response);
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function autoCompleteCreateMoviesByYear(year) {
  $("#home-body").empty();
  
  $.ajax({
  url: "http://localhost:8080/movies/year/" + year,
  type: "GET",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
    createDynamicMovieView("YEAR-" + year, response);
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

////////////////////////////////////////////////////////////////////////////////
// CREATE MAIN GENRE DROPDOW
////////////////////////////////////////////////////////////////////////////////
function populateMainGenreDropDwon() {
	$.ajax({
	url: "http://localhost:8080/genres",
	type: "GET",
	dataType: "json",
	contentType: "application/json; charset=utf-8",
    async: false,
	success: function(response) {
		  var length = response.length;
		  for (var i = 0; i < length; i++) {
			  if(GENRES.indexOf(response[i].genre) > -1 ) {
                  SUBGENRES[response[i].genre].push(response[i].sub_genre);
			  } else {
				$("#main-genre-dropdown").append("<li><a id='" + response[i].id + "' href='#'>" + response[i].genre + "</a></li>");
				$("#" + response[i].id).click(createHomeGenreView)
				GENRES.push(response[i].genre)
                SUBGENRES[response[i].genre] = [response[i].sub_genre];
			  }
		  }
		},
		error: function(response) {
		  var jsonResponse = response.responseJSON;
		  console.log(jsonResponse.msg)
		  showError(jsonResponse.msg)
		}
	});
}

////////////////////////////////////////////////////////////////////////////////
// CREATE VIEW BY GENRE
////////////////////////////////////////////////////////////////////////////////
function createHomeGenreView() {
	var genre = this.text;
    $("#home-body").empty();
    var length = SUBGENRES[genre].length;
    for (var i = 0; i < length; i++) {
        var subgenre = SUBGENRES[genre][i];
        $.ajax({
            url: "http://localhost:8080/movies/genre/" + genre + "/" + subgenre,
            type: "GET",
            dataType: "json",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function(response) {
                    console.log(genre + "-" + subgenre);
                    if (response.length > 0) {
                        createDynamicMovieView(genre + "-" + subgenre, response);
                    }
                },
                error: function(response) {
                  var jsonResponse = response.responseJSON;
                  console.log(jsonResponse.msg)
                  showError(jsonResponse.msg)
                }
        });
    }
}

////////////////////////////////////////////////////////////////////////////////
// CREATE MAIN VIEW
////////////////////////////////////////////////////////////////////////////////
function createHomeMainView() {
  var length = GENRES.length;
  $("#home-body").empty();
  
  $.ajax({
		url: "http://localhost:8080/smart/movies/suggestion/" + readCookie("CronosUserID"),
		type: "GET",
		dataType: "json",
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(response) {
      createDynamicMovieView("Smart-Suggestion", response, 5);
    },
		error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
		}
	});
  
  $.ajax({
		url: "http://localhost:8080/smart/movies/top",
		type: "GET",
		dataType: "json",
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(response) {
      createDynamicMovieView("Popular-Now", response, 5);
    },
		error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
		}
	});
  
  
	for( var i = 0; i < length; i++ ) {
		$.ajax({
		url: "http://localhost:8080/movies/genre/" + GENRES[i],
		type: "GET",
		dataType: "json",
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function(response) {
                if (response.length > 0) {
                    // Always limit to five
                    createDynamicMovieView(GENRES[i], response, 5);
                }
			},
			error: function(response) {
			  var jsonResponse = response.responseJSON;
			  console.log(jsonResponse.msg)
			  showError(jsonResponse.msg)
			}
		});
	}
}

////////////////////////////////////////////////////////////////////////////////
// CREATE MOVIE VIEW
////////////////////////////////////////////////////////////////////////////////
function createHomeMovieView() {
  var movieName = this.text;
  var movieID = localStorage.getItem(this.text);
  $.ajax({
  url: "http://localhost:8080/movies/view/" + movieID,
  type: "GET",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
      localStorage.setItem("CurrentMovieID", movieID);
      populateWithMovie(response);
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function populateWithMovie(info) {
  var titleID = "movie-view-title";
  var displayID = "movie-view-display";
  var infoID = "movie-view-info";
  var userID = readCookie("CronosUserID");
  var tmpID = ''
  
  $("#home-body").empty();
  $("#home-body").append("<div style='margin-bottom: 40px' id='" + titleID + "'></div>")

  $("#home-body").append("<div style='float: left; width: 50%; text-align: center' id='" + displayID + "'></div>")
  $("#home-body").append("<div style='float: left; width: 40%; margin-left: 30px' id='" + infoID + "'></div>");

  $("#" + titleID).append("<h1><label class='label label-default center-block'>" + info["movie"].name + "</label></h1>");
  $("#" + displayID).append("<iframe width='420' height='315' align='middle' src='http://www.youtube.com/embed/" + info["movie"].youtube_id + "'></iframe>");

  $("#" + displayID).append("<div id='stars-default'><input type=hidden name='rating'/></div>")
  $("#stars-default").rating();
  
  tmpID = 'currentMovieSynpsis'
  $("#" + displayID).append("<div class='list-groupt' style='margin-bottom: 40px' id='" + tmpID + "'></div>")
  $("#" + tmpID).append("<a href='#' class='list-group-item active' style='position: relative;  z-index: -1;font-weight: bold; background: rgb(141, 182, 212); font-size: 16px'>Synopsis:</a>")
  $("#" + tmpID).append("<a href='#' class='list-group-item'>" + info['movie'].synopsis + "</a>")
  
  
  //////////////////////////////////////////////////////////////////////// ACTORS
  tmpID = 'currentMovieActors'
  var length = info["actor"].length;
  var actors = " ";
  for (var i = 0; i < length; i++) {
    actors += "<a href='#' class='list-group-item'>" + info["actor"][i].name + "</a>";
  }
  $("#" + infoID).append("<div class='list-groupt' style='margin-bottom: 40px' id='" + tmpID + "'></div>");
  $("#" + tmpID).append("<a href='#' class='list-group-item active' style='position: relative;  z-index: -1;font-weight: bold; background: rgb(141, 182, 212); font-size: 16px'>Actors:</a>")
  $("#" + tmpID).append(actors)
  
  //////////////////////////////////////////////////////////////////////// DIRECTORS
  tmpID = 'currentMovieDirectors'
  var length = info["director"].length;
  var directors = "";
  for (var i = 0; i < length; i++) {
    directors += "<a href='#' class='list-group-item'>" + info["director"][i].name + "</a>";
  }  
  $("#" + infoID).append("<div class='list-groupt' style='margin-bottom: 40px' id='" + tmpID + "'></div>");
  $("#" + tmpID).append("<a href='#' class='list-group-item active' style='position: relative;  z-index: -1;font-weight: bold; background: rgb(141, 182, 212); font-size: 16px'>Directors:</a>")
  $("#" + tmpID).append(directors)
  
  //////////////////////////////////////////////////////////////////////// DIRECTORS
  tmpID = 'currentMovieStudios'
  var length = info["studio"].length;
  var studios = "";
  for (var i = 0; i < length; i++) {
    studios += "<a  href='#' class='list-group-item'>" + info["studio"][i].name + "</a>";
  }
  $("#" + infoID).append("<div class='list-groupt' style='margin-bottom: 30px' id='" + tmpID + "'></div>");
  $("#" + tmpID).append("<a href='#' class='list-group-item active' style='position: relative;  z-index: -1;font-weight: bold; background: rgb(141, 182, 212); font-size: 16px'>Studios:</a>")
  $("#" + tmpID).append(studios)

  //////////////////////////////////////////////////////////////////////// GENRE
  tmpID = 'currentMovieGenres'
  var length = info["genre"].length;
  var genres = "";
  for (var i = 0; i < length; i++) {
    genres += "<a href='#' class='list-group-item'>" + info["genre"][i].genre + " - " + info["genre"][i].sub_genre + "</a>";
  }
  $("#" + infoID).append("<div class='list-groupt' style='margin-bottom: 40px' id='" + tmpID + "'></div>");
  $("#" + tmpID).append("<a href='#' class='list-group-item active' style='position: relative;  z-index: -1;font-weight: bold; background: rgb(141, 182, 212); font-size: 16px'>Genres:</a>")
  $("#" + tmpID).append(genres)
  
  //////////////////////////////////////////////////////////////////////// Nominations
  tmpID = 'currentMovieNominations' 
  var length = info["nominations"].length;
  var nominations = "";
  for (var i = 0; i < length; i++) {
    nominations += "<a href='#' class='list-group-item'>" + info["nominations"][i].actor_name + "-" + info["nominations"][i].award_name + " - " + info["nominations"][i].category_name + "-" + info["nominations"][i].year + "</a>";
  }
  $("#" + infoID).append("<div class='list-groupt' style='margin-bottom: 40px' id='" + tmpID + "'></div>");
  $("#" + tmpID).append("<a href='#' class='list-group-item active' style='position: relative; z-index: -1; font-weight: bold; background: rgb(141, 182, 212); font-size: 16px'>Nominations:</a>")
  $("#" + tmpID).append(nominations)
  
  $.ajax({
  url: "http://localhost:8080/smart/displays/" + userID + "/" +  info["movie"].id,
  type: "POST",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
      var length = response.length;
      for (var i = 0; i < length; i ++) {
        console.log("Displays updated for: " + info["movie"].name + "-" + response[i].play_count  + "-" + userID)
      }
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}



////////////////////////////////////////////////////////////////////////////////
// COMMON CODE
////////////////////////////////////////////////////////////////////////////////
function createDynamicMovieView(title, movies, limit = -1) {
    var divContID = "container-movie-" + title;
    var divID = "movie-" + title;
    $("#home-body").append("<div style='margin-bottom: 30px' class='container' id='" + divContID + "'></div>");
    $("#" + divContID).append("<label style='width: 100%' ><h2 style='color:#800080; font-weight: bold'><u>" + title + "</u></h2></label>");
    $("#" + divContID).append("<div style='margin-top: -15px' class='panel panel-default' id='" + divID + "'></div>");
    var length = movies.length;
    if (limit < 0) {
        limit = length;
    }
    for (var i = 0; i < length && i < limit; i ++){
      createMoviePreview(divID, movies[i].id, movies[i].name, movies[i].youtube_id, title);
    }
}

function createMoviePreview(htmlID, movieID, movieName, movieYoutubeID, genre) {
    var tmpID = "preview-id-" + movieID + "-" + genre;
    var labelID = tmpID + "-label";
    var imgLink = "http://img.youtube.com/vi/" + movieYoutubeID + "/1.jpg";
    $("#" + htmlID).append("<span style='display: inline-block; width: 20%; margin-top: 15px' id='" + tmpID + "'></span>");
    $("#" + tmpID).append("<img  style='display: block; width: 150px; margin: 0 auto' src='" + imgLink+ "'></img>")
    $("#" + tmpID).append("<div style='text-align: center'><a style='color: black; display: inline-block; cursor: pointer' href='#' val='" + movieID + "' id='" + labelID + "'>" + movieName + "</a></div>")
    $("#" + labelID).click(createHomeMovieView);
    localStorage.setItem(movieName, movieID);
}

function getRating(userID, movieID) {
  var rating = 0;
  $.ajax({
  url: "http://localhost:8080/smart/rating/" + userID + "/" + movieID,
  type: "GET",
  dataType: "json",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(response) {
    if (response.length > 0) {
      rating = response[0].rate;
    }
  },
  error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
  
  if (rating == 0) {
     $.ajax({
    url: "http://localhost:8080/smart/movies/rating/" + movieID,
    type: "GET",
    dataType: "json",
    async: false,
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      if (response.length > 0) {
        rating = response[0].rate;
      }
    },
    error: function(response) {
        var jsonResponse = response.responseJSON;
        console.log(jsonResponse.msg)
        showError(jsonResponse.msg)
      }
    });
  }
  return rating;
}