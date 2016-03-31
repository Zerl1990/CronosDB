$(document).ready(function(){
  setupAdmin();
  $('#users').click(createUserView);
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
  <div>
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
        <label>Password:</label>
        <input type="password" class="form-control" value="" placeholder="Password" id="password"/>
      </div>
      <div class="input-group" style="margin-top: 20px">
        <label>Email:</label>
        <input type="text" class="form-control" value="" placeholder="Email" id="email"/>
      </div>
      <div class="input-group" style="margin-top: 20px; margin-bottom: 20px">
        <label>Admin:</label>
        <input type="text" class="form-control" value="" placeholder="Admin" id="admin"/>
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
