$(document).ready(function(){
  $('#login-button').click(function(){
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
        alert("SUCCESS");
      },
      error: function(response) {
        var jsonResponse = response.responseJSON;
        console.log(jsonResponse.msg)
        showError(jsonResponse.msg)
      }
    });
  });
});

function showError(msg) {
  $('#error').text(msg);
  $('#error').css("visibility", "visible");
}
