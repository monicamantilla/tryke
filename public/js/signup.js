$(document).ready(function() {
  $(".submit").on("click", function(event) {
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
    userInfo.userName("");
    userInfo.userPassword("");
    userInfo.userEmail("");
    userInfo.userZip("");

    console.log(userInfo);

    function signUpUser(userName, userPassword, userEmail, userZip) {
      $.post("/api/signup", {
        userName: userName,
        userPassword: userPassword,
        userEmail: userEmail,
        userZip: userZip
      })
        .then(function(data) {
          window.location.replace("/signup");
          // If there's an error, handle it by throwing up a bootstrap alert
        })
        .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }
  });
});
