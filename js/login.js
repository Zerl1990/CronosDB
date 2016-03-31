$(document).ready(function(){
  $('#login-button').click(login);
  $('#login-recover').click(recover);
  $('#login-create').click(create);
});

function showError(msg) {
  $('#error').text(msg);
  $('#error').css("visibility", "visible");
}

function login() {
  var loginUser = $('#username').val();
  var loginPassword = $('#password').val();
  var loginInfo = {
    name: loginUser,
    password: loginPassword,
  }

  $.ajax({
    url: "http://localhost:8080/users/login",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(loginInfo),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====LOGIN SUCCESSFULLY====");
      console.log("Name:" + response.name);
      console.log("Email:" + response.email);
      console.log("Admin:" + response.admin);
      console.log("============================");
      createCookie("CronosName", response.name);
      createCookie("CronosEmail", response.email);
      createCookie("CronosAdmin", response.admin);
      document.location = "html/home.html";
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}

function recover() {
  var loginUser = $('#username').val();
  var loginEmail = $('#email').val();
  $.ajax({
    url: "http://localhost:8080/users",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      var length = response.length;
      for (var i = 0; i < length; i++) {
        if (response[i].email == loginEmail && response[i].name == loginUser) {
          alert("Your Password Is: " + response[i].password);
          return;
        }
      }
      alert("Wrnong user or email...");
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse)
    }
  });
}

function create() {
  console.log("CALLING");
  var loginUser = $('#username').val();
  var loginPassword = $('#password').val();
  var loginEmail = $('#email').val();

  var loginInfo = {
    name: loginUser,
    password: loginPassword,
    email: loginEmail,
  }

  $.ajax({
    url: "http://localhost:8080/users",
    type: "POST",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(loginInfo),
    success: function(response) {
      var jsonResponse = response.responseJSON;
      console.log("====LOGIN SUCCESSFULLY====");
      console.log("Name:" + response.name);
      console.log("Email:" + response.email);
      console.log("Admin:" + response.admin);
      console.log("============================");
      createCookie("CronosName", response.name);
      createCookie("CronosEmail", response.email);
      createCookie("CronosAdmin", response.admin);
      document.location = "home.html";
    },
    error: function(response) {
      var jsonResponse = response.responseJSON;
      console.log(jsonResponse.msg)
      showError(jsonResponse.msg)
    }
  });
}
