$(document).ready(function(){
  setupAdmin();
  $('#users').click(createUserView);
  $('#actors').click(createActorView);
  $('#directors').click(createDirectorView);
  $('#genres').click(createGenreView);
  $('#studios').click(createStudioView);
  $('#awards').click(createAwardView);
  $('#nomination-categories').click(createNCView);
  $('#nominations').click(createNominationView);
  $('#movies').click(createMovieView);
  $('#movies-transactions').click(createTransView);
});

////////////////////////////////////////////////////////////////////////////////
//  Enable Admin Tabs
////////////////////////////////////////////////////////////////////////////////
function setupAdmin() {
  console.log("Setting Admin Account");
  admin = readCookie("CronosAdmin");
  if (admin == 1) {
    $('#AdminTab').css("visibility", "visibile");
    console.log("Welcome Admin");
  } else {
    $('#AdminTab').css("visibility", "hidden");
    console.log("You are not admin, so m... welcome");
  }
}

////////////////////////////////////////////////////////////////////////////////
// USER MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createUserView() {
  $('#home-body').html(users);

  $('#edit-table > thead').append("<tr><th># ID</th><th>Name</th><th>Password</th><th>Email</th><th>Admin</th></tr>");

  $.ajax({
    url: "http://localhost:8080/users",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current users!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].password + "</td><td>" + response[i].email+ "</td><td>" + response[i].admin + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");

      }
      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#userid').val(resultArray[0]);
        $('#username').val(resultArray[1]);
        $('#password').val(resultArray[2]);
        $('#email').val(resultArray[3]);
        $('#admin').val(resultArray[4]);
      });
      $('#post-button').click(post_user);
      $('#put-button').click(update_user);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_user() {
  var userName = $('#username').val();
  var userPassword = $('#password').val();
  var userEmail = $('#email').val();
  var userAdmin = $('#admin').val();

  var user = {
    name: userName,
    password: userPassword,
    email: userEmail,
    admin: userAdmin,
  }

  $.ajax({
    url: "http://localhost:8080/users",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(user),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====User Created!!!====");
      alert("User Created!");
      createUserView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_user() {
  var userid = $('#userid').val();
  var userName = $('#username').val();
  var userPassword = $('#password').val();
  var userEmail = $('#email').val();
  var userAdmin = $('#admin').val();

  var user = {
    name: userName,
    password: userPassword,
    email: userEmail,
    admin: userAdmin,
  }

  $.ajax({
    url: "http://localhost:8080/users/" + userid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(user),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====User Updated!!!====");
      alert("User Updated!");
      createUserView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var users = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Users</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>User ID:</label>
        <input type="text" class="form-control" value="" placeholder="UserID" id="userid"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>User Name:</label>
        <input type="text" class="form-control" value="" placeholder="UserName" id="username"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>User Password:</label>
        <input type="password" class="form-control" value="" placeholder="Password" id="password"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>User Email:</label>
        <input type="text" class="form-control" value="" placeholder="Email" id="email"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>User Admin Rights:</label>
        <input type="text" class="form-control" value="" placeholder="0" id="admin"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
// ACTOR MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createActorView() {
  $('#home-body').html(actors);

  $('#edit-table > thead').append("<tr><th># ID</th><th>Name</th><th>Nationality</th><th>Birthday</th>></tr>");

  $.ajax({
    url: "http://localhost:8080/actors",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current actors!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].nationality+ "</td><td>" + response[i].birth_date + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }

      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#actor-id').val(resultArray[0]);
        $('#actor-name').val(resultArray[1]);
        $('#actor-nationality').val(resultArray[2]);
        $('#actor-birthday').val(resultArray[3]);
      });
      $('#post-button').click(post_actor);
      $('#put-button').click(update_actor);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_actor() {
  var actorName = $('#actor-name').val();
  var actorNationality = $('#actor-nationality').val();
  var actorBirthday = $('#actor-birthday').val();

  var actor = {
    name: actorName,
    nationality: actorNationality,
    birth_date: actorBirthday,
  }

  $.ajax({
    url: "http://localhost:8080/actors",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(actor),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Actor Created!!!====");
      alert("Actor Created!");
      createActorView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_actor() {
  var actorid = $('#actor-id').val();
  var actorName = $('#actor-name').val();
  var actorNationality = $('#actor-nationality').val();
  var actorBirthday = $('#actor-birthday').val();

  var actor = {
    name: actorName,
    nationality: actorNationality,
    birth_date: actorBirthday,
  }

  $.ajax({
    url: "http://localhost:8080/actors/" + actorid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(actor),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Actor Updated!!!====");
      alert("Actor Updated!");
      createActorView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var actors = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Actors</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Actor ID:</label>
        <input type="text" class="form-control" value="" placeholder="Actor ID" id="actor-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Actor Name:</label>
        <input type="text" class="form-control" value="" placeholder="Name" id="actor-name"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Actor Nationality:</label>
        <input type="text" class="form-control" value="" placeholder="Nationality" id="actor-nationality"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Actor Birthday:</label>
        <input type="text" class="form-control" value="" placeholder="Birthday" id="actor-birthday"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
// DIRECTOR MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createDirectorView() {
  $('#home-body').html(directors);

  $('#edit-table > thead').append("<tr><th># ID</th><th>Name</th><th>Nationality</th><th>Birthday</th>></tr>");

  $.ajax({
    url: "http://localhost:8080/directors",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current directors!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].nationality+ "</td><td>" + response[i].birth_date + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }

      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#dir-id').val(resultArray[0]);
        $('#dir-name').val(resultArray[1]);
        $('#dir-nationality').val(resultArray[2]);
        $('#dir-birthday').val(resultArray[3]);
      });
      $('#post-button').click(post_director);
      $('#put-button').click(update_director);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_director() {
  var directorName = $('#dir-name').val();
  var directorNationality = $('#dir-nationality').val();
  var directorBirthday = $('#dir-birthday').val();

  var director = {
    name: directorName,
    nationality: directorNationality,
    birth_date: directorBirthday,
  }

  $.ajax({
    url: "http://localhost:8080/directors",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(director),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Director Created!!!====");
      alert("Director Created!");
      createDirectorView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_director() {
  var directorid = $('#dir-id').val();
  var directorName = $('#dir-name').val();
  var directorNationality = $('#dir-nationality').val();
  var directorBirthday = $('#dir-birthday').val();

  var director = {
    name: directorName,
    nationality: directorNationality,
    birth_date: directorBirthday,
  }

  $.ajax({
    url: "http://localhost:8080/directors/" + directorid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(director),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Director Updated!!!====");
      alert("Director Updated!");
      createDirectorView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var directors = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Directors</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Director ID:</label>
        <input type="text" class="form-control" value="" placeholder="Actor ID" id="dir-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Director Name:</label>
        <input type="text" class="form-control" value="" placeholder="Name" id="dir-name"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Director Nationality:</label>
        <input type="text" class="form-control" value="" placeholder="Nationality" id="dir-nationality"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Director Birthday:</label>
        <input type="text" class="form-control" value="" placeholder="Birthday" id="dir-birthday"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  GENRES MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createGenreView() {
  $('#home-body').html(genres);

  $('#edit-table > thead').append("<tr><th># ID</th><th>Genre</th><th>Subgenre</th></tr>");

  $.ajax({
    url: "http://localhost:8080/genres",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current genres!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].genre + "</td><td>" + response[i].sub_genre + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }

      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#genre-id').val(resultArray[0]);
        $('#genre-name').val(resultArray[1]);
        $('#genre-subgenre-name').val(resultArray[2]);
      });
      $('#post-button').click(post_genre);
      $('#put-button').click(update_genre);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_genre() {
  var genreName = $('#genre-name').val();
  var subGenreName = $('#genre-subgenre-name').val();

  var genre = {
    genre: genreName,
    sub_genre: subGenreName
  }

  $.ajax({
    url: "http://localhost:8080/genres",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(genre),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Genre Created!!!====");
      alert("Genre Created!");
      createGenreView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_genre() {
  var genreid = $('#genre-id').val();
  var genreName= $('#genre-name').val();
  var subGenreName = $('#genre-subgenre-name').val();

  var genre = {
    genre: genreName,
    sub_genre: subGenreName
  }

  $.ajax({
    url: "http://localhost:8080/genres/" + genreid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(genre),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Genre Updated!!!====");
      alert("Genre Updated!");
      createGenreView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var genres= `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Genres</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Genre ID:</label>
        <input type="text" class="form-control" value="" placeholder="Genre ID" id="genre-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Genre Name:</label>
        <input type="text" class="form-control" value="" placeholder="Genre" id="genre-name"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>SubGenre Name:</label>
        <input type="text" class="form-control" value="" placeholder="SubGenre" id="genre-subgenre-name"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  FILM STUDIOS MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createStudioView() {
  $('#home-body').html(studios);

  $('#edit-table > thead').append("<tr><th># ID</th><th>Name</th><th>Country</th></tr>");

  $.ajax({
    url: "http://localhost:8080/studios",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current studios!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].country + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }

      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#studio-id').val(resultArray[0]);
        $('#studio-name').val(resultArray[1]);
        $('#studio-country').val(resultArray[2]);
      });
      $('#post-button').click(post_studio);
      $('#put-button').click(update_studio);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_studio() {
  var studioName = $('#studio-name').val();
  var studioCountry = $('#studio-country').val();

  var filmStudio= {
    name: studioName,
    country: studioCountry
  }

  $.ajax({
    url: "http://localhost:8080/studios",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(filmStudio),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Film Studio Created!!!====");
      alert("Film Studio Created!");
      createStudioView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_studio() {
  var studioid = $('#studio-id').val();
  var studioName = $('#studio-name').val();
  var studioCountry = $('#studio-country').val();

  var filmStudio= {
    name: studioName,
    country: studioCountry
  }

  $.ajax({
    url: "http://localhost:8080/studios/" + studioid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(filmStudio),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Film Studio Updated!!!====");
      alert("Film Studio Updated!");
      createStudioView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var studios= `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Film Studios</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Film Studio ID:</label>
        <input type="text" class="form-control" value="" placeholder="Film Studio ID" id="studio-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Film Studio Name:</label>
        <input type="text" class="form-control" value="" placeholder="Film Studio Name" id="studio-name"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Film Studio Country:</label>
        <input type="text" class="form-control" value="" placeholder="Film Studio Country" id="studio-country"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  Awards MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createAwardView() {
  $('#home-body').html(awards);

  $('#edit-table > thead').append("<tr><th># ID</th><th>Name</th><th>Country</th></tr>");

  $.ajax({
    url: "http://localhost:8080/awards",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current awards!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].country + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }

      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#award-id').val(resultArray[0]);
        $('#award-name').val(resultArray[1]);
        $('#award-country').val(resultArray[2]);
      });
      $('#post-button').click(post_award);
      $('#put-button').click(update_award);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_award() {
  var awardName = $('#award-name').val();
  var awardCountry = $('#award-country').val();

  var award = {
    name: awardName,
    country: awardCountry
  }

  $.ajax({
    url: "http://localhost:8080/awards",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(award),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Award Created!!!====");
      alert("Award Created!");
      createAwardView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_award() {
  var awardid = $('#award-id').val();
  var awardName = $('#award-name').val();
  var awardCountry = $('#award-country').val();

  var award = {
    name: awardName,
    country: awardCountry
  }

  $.ajax({
    url: "http://localhost:8080/awards/" + awardid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(award),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Award Updated!!!====");
      alert("Award Updated!");
      createAwardView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var awards = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Awards</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Award ID:</label>
        <input type="text" class="form-control" value="" placeholder="Award ID" id="award-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Award Name:</label>
        <input type="text" class="form-control" value="" placeholder="Award Name" id="award-name"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Award Country:</label>
        <input type="text" class="form-control" value="" placeholder="Award Country" id="award-country"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  NOMINATION CATEGORIES MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createNCView() {
  $('#home-body').html(nCategories);

  $('#edit-table > thead').append("<tr><th># Award ID</th><th>Nomination Category ID</th><th>Name</th></tr>");

  $.ajax({
    url: "http://localhost:8080/awards",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current awards!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#nc-dropdown').append("<option value='" + response[i].id + "'>" + response[i].name + "</option>");
      }
      $('#nc-dropdown').change(createNCSubView);
      $('#nc-dropdown').change();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function createNCSubView() {
  var awardid = this.value;

  $.ajax({
    url: "http://localhost:8080/awards/" + awardid + "/categories",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current nomination categories for " + awardid);
      $('#edit-table > tbody').empty();
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].award_id + "</td><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }

      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#nc-award-id').val(resultArray[0]);
        $('#nc-id').val(resultArray[1]);
        $('#nc-name').val(resultArray[2]);
      });
      $('#post-button').click(post_nc);
      $('#put-button').click(update_nc);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_nc() {
  var ncAwardId= $('#nc-award-id').val();
  var ncName = $('#nc-name').val();

  var nc = {
    award_id: ncAwardId,
    name: ncName
  }

  $.ajax({
    url: "http://localhost:8080/awards/" + ncAwardId + "/categories",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(nc),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Nomination Category Created!!!====");
      alert("Nomination Category Created!");
      createNCView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_nc() {
  var ncAwardId= $('#nc-award-id').val();
  var ncid = $('#nc-id').val();
  var ncName = $('#nc-name').val();

  var nc = {
    award_id: ncAwardId,
    name: ncName
  }

  $.ajax({
    url: "http://localhost:8080/awards/" + ncAwardId + "/categories/" + ncid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(nc),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Nomination Category Updated!!!====");
      alert("Nomination Category Updated!");
      createNCView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var nCategories = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Nomination Categories</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Award ID:</label>
        <input type="text" class="form-control" value="" placeholder="Award ID" id="nc-award-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Nomination Category ID:</label>
        <input type="text" class="form-control" value="" placeholder="Nomination Category ID" id="nc-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Nomination Category Name:</label>
        <input type="text" class="form-control" value="" placeholder="Nomination Category Name" id="nc-name"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <div class="input-group" style="margin-bottom: 20px">
        <label>Select An Award:</label>
        <select id="nc-dropdown">
        </select>
       </div>
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  NOMINATIONS MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////
function createNominationView() {
  $('#home-body').html(nominations);

  $('#edit-table > thead').append("<tr><th># Nomination ID</th><th># Award ID</th><th>Award Name</th><th># Nom Category ID</th><th>Category Name</th><th># Actor ID</th><th>Actor Name</th><th>Actor Nationality</th><th>Actor Birthday</th><th>Year</th><th>Won</th></tr>");

  fillAwardsDropdown();
  fillActorsDropdown();

  $.ajax({
    url: "http://localhost:8080/awards",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current awards!");
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#awards-dropdown').append("<option value='" + response[i].id + "'>" + response[i].name + "</option>");
      }
      $('#awards-dropdown').change(createNomSubView);
      $('#awards-dropdown').change();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function fillAwardsDropdown() {
  $.ajax({
    url: "http://localhost:8080/awards",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the awards!");
      var length = response.length;
      for (var j = 0; j < length; j++) {
        $('#nom-award-id').append("<option value='" + response[j].id + "'>" + response[j].name + "</option>");
      }
      $('#nom-award-id').change(fillNCDropdown);
      $('#nom-award-id').change();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function fillNCDropdown() {
   var award = this.value;
   $('#nom-nc-id').empty();
  $.ajax({
    url: "http://localhost:8080/awards/" + award + "/categories",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the nominatios categories!");
      var length = response.length;
      console.log(length);
      for (var j = 0; j < length; j++) {
        $('#nom-nc-id').append("<option value='" + response[j].id + "'>" + response[j].name + "</option>");
      }
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function fillActorsDropdown() {
  $.ajax({
    url: "http://localhost:8080/actors",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the actors!");
      var length = response.length;
      for (var j = 0; j < length; j++) {
        $('#nom-actor-id').append("<option value='" + response[j].id + "'>" + response[j].name + "</option>");
      }
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function createNomSubView(award) {
  var award = this.value;

  $.ajax({
    url: "http://localhost:8080/awards/" + award + "/nominations",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current nominations for award id " + award );
      $('#edit-table > tbody').empty();
      var length = response.length;
      for (var i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].award_id + "</td><td>" + response[i].award_name + "</td><td>" + response[i].nc_id + "</td><td>" + response[i].category_name + "</td><td>" + response[i].actor_id + "</td><td>" + response[i].actor_name +"</td><td>" + response[i].actor_nationality + "</td><td>" + response[i].actor_birth_date + "</td><td>" + response[i].year + "</td><td>" + response[i].won + "</td><<td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td></tr>");
      }
      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#nom-id').val(resultArray[0]);
        $('#nom-nc-id').val(resultArray[3]);
        $('#nom-actor-id').val(resultArray[5]);
        $('#nom-year').val(resultArray[9]);
        $('#nom-won').val(resultArray[10]);
      });
      $('#post-button').click(post_nom);
      $('#put-button').click(update_nom);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_nom() {
  var nomAwardid = $('#nom-award-id').val();
  var nomNCid = $('#nom-nc-id').val();
  var nomActorid = $('#nom-actor-id').val();
  var nomYear = $('#nom-year').val();
  var nomWon = $('#nom-won').val();

  var nom = {
    category_id : nomNCid,
    actor_id: nomActorid,
    year: nomYear,
    won: nomWon
  }

  $.ajax({
    url: "http://localhost:8080/awards/" + nomAwardid + "/nominations",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(nom),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Nomination Created!!!====");
      alert("Nomination Created!");
      createNominationView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_nom() {
  var nomid= $('#nom-id').val();
  var nomAwardid = $('#nom-award-id').val();
  var nomNCid = $('#nom-nc-id').val();
  var nomActorid = $('#nom-actor-id').val();
  var nomYear = $('#nom-year').val();
  var nomWon = $('#nom-won').val();

  var nom = {
    category_id : nomNCid,
    actor_id: nomActorid,
    year: nomYear,
    won: nomWon
  }

  $.ajax({
    url: "http://localhost:8080/awards/" + nomAwardid + "/nominations/" + nomid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(nom),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Nomination Updated!!!====");
      alert("Nomination Updated!");
      createNominationView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var nominations = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Nominations</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Nomination ID:</label>
        <input type="text" class="form-control" value="" placeholder="Nomination ID" id="nom-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Award:</label>
        <select id="nom-award-id">
        </select>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Nomination Category:</label>
        <select id="nom-nc-id">
        </select>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Actor ID:</label>
        <select id="nom-actor-id">
        </select>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Year:</label>
        <input type="text" class="form-control" value="" placeholder="Year" id="nom-year"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Won:</label>
        <input type="text" class="form-control" value="" placeholder="Won" id="nom-won"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <div class="input-group" style="margin-bottom: 20px">
        <label>Select An Award:</label>
        <select id="awards-dropdown">
        </select>
       </div>
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  MOVIE MANAGE VIEW
////////////////////////////////////////////////////////////////////////////////

function createMovieView() {
  $('#home-body').html(movies);

  $('#edit-table > thead').append("<tr><th># Movie ID</th><th>Name</th><th>Year</th><th>Synopsis</th><th>Country</th><th>URL</th></tr>");

  $.ajax({
    url: "http://localhost:8080/movies",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the current Movies" );
      $('#edit-table > tbody').empty();
      var length = response.length;
      for( i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].id + "</td><td>" + response[i].name + "</td><td>" + response[i].year + "</td><td>" + response[i].synopsis + "</td><td>" + response[i].country + "</td><td>" + response[i].url + "</td><td><button class='edit-button btn btn-warning btn-sm'>Edit</button></td><tr>");
      }
      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#movie-id').val(resultArray[0]);
        $('#movie-name').val(resultArray[1]);
        $('#movie-year').val(resultArray[2]);
        $('#movie-synopsis').val(resultArray[3]);
        $('#movie-country').val(resultArray[4]);
        $('#movie-url').val(resultArray[5]);
      });
      $('#post-button').click(post_movie);
      $('#put-button').click(update_movie);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_movie() {
  var movieid = $('#movie-id').val();
  var movieName = $('#movie-name').val();
  var movieYear = $('#movie-year').val();
  var movieSynopsis = $('#movie-synopsis').val();
  var movieCountry = $('#movie-country').val();
  var movieURL = $('#movie-url').val();

  var movie = {
    name: movieName,
    year: movieYear,
    synopsis: movieSynopsis,
    country: movieCountry,
    url: movieURL
  }

  $.ajax({
    url: "http://localhost:8080/movies",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(movie),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Movie Created!!!====");
      alert("Movie Created!");
      createMovieView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function update_movie() {
  var movieid = $('#movie-id').val();
  var movieName = $('#movie-name').val();
  var movieYear = $('#movie-year').val();
  var movieSynopsis = $('#movie-synopsis').val();
  var movieCountry = $('#movie-country').val();
  var movieURL = $('#movie-url').val();

  var movie = {
    id: movieid,
    name: movieName,
    year: movieYear,
    synopsis: movieSynopsis,
    country: movieCountry,
    url: movieURL
  }

  $.ajax({
    url: "http://localhost:8080/movies/" + movieid,
    type: "PUT",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(movie),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Movie Updated!!!====");
      alert("Movie Updated!");
      createMovieView();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var movies = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Movies</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Movie ID:</label>
        <input type="text" class="form-control" value="" placeholder="Movie ID" id="movie-id"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Movie Name:</label>
        <input type="text" class="form-control" value="" placeholder="Movie Name" id="movie-name"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Movie Year:</label>
        <input type="text" class="form-control" value="" placeholder="Movie Year" id="movie-year"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Movie Synopsis:</label>
        <input type="text" class="form-control" value="" placeholder="Movie Synopsis" id="movie-synopsis"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Movie Country:</label>
        <input type="text" class="form-control" value="" placeholder="Movie Country" id="movie-country"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Movie URL:</label>
        <input type="text" class="form-control" value="" placeholder="Movie URL" id="movie-url"/>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="put-button" class="btn btn-info">Update</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;

////////////////////////////////////////////////////////////////////////////////
//  MOVIE TRANSACTIONS
////////////////////////////////////////////////////////////////////////////////
function createTransView() {
  $('#home-body').html(transactions);
  $('#trans-dropdown').change(createSubTransView);
  $('#trans-dropdown').change();
  fillMovieDropdown();
}

function createSubTransView() {
  var transactionName = this.value;

  $('#edit-table > thead').empty();
  $('#edit-table > thead').append("<tr><th># Movide ID</th><th> Movie Name</th><th>" + transactionName + "-ID</th><<th>" + transactionName + "-Name</th>/tr>");

  fillOtherDropdown(transactionName);

  $.ajax({
    url: "http://localhost:8080/movies/transaction/" + transactionName,
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the transaction: " + transactionName);
      $('#edit-table > tbody').empty();
      var length = response.length;
      for( i = 0; i < length; i++) {
        $('#edit-table > tbody').append("<tr><td>" + response[i].movie_id + "</td><td>" + response[i].movie_name + "</td><td>" + response[i].other_id + "</td><td>" + response[i].other_name+ "</td><td><button class='edit-button btn btn-warning btn-sm'>Select</button></td><tr>");
      }
      $('.edit-button').click(function() {
        resultArray = [];
        $(this).closest("td").siblings().each(function () {
          resultArray.push($(this).text());
        });
        $('#trans-movie-id').val(resultArray[0]);
        $('#trans-other-id').val(resultArray[2]);
      });
      $('#post-button').click(post_trans);
      $('#del-button').click(del_trans);
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function fillOtherDropdown(transaction) {
  var transHash = {"cast": "actors", "directed": "directors", "movie_genre": "genres", "filmed_by": "studios"}
  $('#trans-other-id').empty();

  $.ajax({
    url: "http://localhost:8080/" + transHash[transaction],
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the catalog: " + transHash[transaction]);
      var length = response.length;
      for (var j = 0; j < length; j++) {
        if (transHash[transaction] == "genres") {
          $('#trans-other-id').append("<option value='" + response[j].id + "'>" + response[j].genre + "-" + response[j].sub_genre + "</option>");
        } else {
          $('#trans-other-id').append("<option value='" + response[j].id + "'>" + response[j].name + "</option>");
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

function fillMovieDropdown() {
  $('#trans-movie-id').empty();
  $.ajax({
    url: "http://localhost:8080/movies",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      console.log("I got the actors!");
      var length = response.length;
      for (var j = 0; j < length; j++) {
        $('#trans-movie-id').append("<option value='" + response[j].id + "'>" + response[j].name + "</option>");
      }
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function post_trans() {
  var movieid = $('#trans-movie-id').val();
  var otherid = $('#trans-other-id').val();
  var transName = $('#trans-dropdown').val();

  var transaction = {
    movie_id: movieid,
    other_id: otherid,
    trans_name: transName
  }

  $.ajax({
    url: "http://localhost:8080/movies/transaction",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(transaction),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Transaction Created!!!====");
      $('#trans-dropdown').change();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

function del_trans() {
  var movieid = $('#trans-movie-id').val();
  var otherid = $('#trans-other-id').val();
  var transName = $('#trans-dropdown').val();

  var transaction = {
    movie_id: movieid,
    other_id: otherid,
    trans_name: transName
  }

  $.ajax({
    url: "http://localhost:8080/movies/transaction/delete",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(transaction),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====Transaction DELETED!!!====");
      $('#trans-dropdown').change();
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      alert(jsonResponse.msg)
    }
  });
}

var transactions = `
  <h1 style="text-align: center; text-decoration: underline"><b>Manage Movie Transactions:</b></h1>
  <div style="margin-top: 100px">
    <div style="float: left; width: 50%; height: 100%;">
      <div class="input-group">
        <label>Transaction Movie ID:</label>
        <select id="trans-movie-id"></select>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Other Transaction ID:</label>
        <select id="trans-other-id"></select>
      </div>
      <button id="post-button" class="btn btn-success" style="margin-right: 30px">POST/Create</button>
      <button id="del-button" class="btn btn-info">Delete</button>
    </div>
    <div style="float: right; width: 50%" class="table-responsive">
      <div class="input-group" style="margin-bottom: 20px">
        <label>Select A Movie Transaction:</label>
        <select id="trans-dropdown">
          <option val='cast'>cast</option>
          <option val='directed'>directed</option>
          <option val='filmed_by'>filmed_by</option>
          <option val='movie_genre'>movie_genre</option>
        </select>
       </div>
       <table id="edit-table" style="width: 100%" class="table table-hover">
        <thead>
        </thead>
        <tbody>
        </tbody>
       </table>
    </div>
  </div>
`;
