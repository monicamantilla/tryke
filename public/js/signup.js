$(document).ready(function() {
  $("#sign").on("click", function(event) {
    event.preventDefault();

    var userInfo = {
      userName: $("#inputUsername")
        .val()
        .trim(),
      userPassword: $("#inputPassword4")
        .val()
        .trim(),
      userEmail: $("#inputEmail4")
        .val()
        .trim(),
      userZip: $("#inputZip")
        .val()
        .trim()
    };

    if (
      !userInfo.userName ||
      !userInfo.userPassword ||
      !userInfo.userEmail ||
      !userInfo.userZip
    ) {
      return;
    }
    signUpUser(
      userInfo.userName,
      userInfo.userPassword,
      userInfo.userEmail,
      userInfo.userZip
    );
    // userName.val("");
    // userPassword.val("");
    // userEmail.val("");
    // userZip.val("");

    function signUpUser(userName, userPassword, userEmail, userZip) {
      $.post("/api/signup", {
        userName: userName,
        userPassword: userPassword,
        userEmail: userEmail,
        userZip: userZip
      })
        .done(function() {
          window.location.replace("/home");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .fail(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
});
