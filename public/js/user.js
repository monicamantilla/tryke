$(document).ready(function() {
  // we are going to create a user given the data from the sign up
  var nameInput = $("#user-name");
  var userList = $("tbody");
  var userContainer = $(".user-container");
  $(document).on("submit", "#user-form", handleUserFormSubmit);
  getUsers();

  function handleUserFormSubmit(event) {
    event.preventDefault();
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }
    upsertUser({
      name: nameInput.val().trim()
    });
  }

  function upsertUser(userData) {
    $.post("/api/users", userData).then(getUsers);
  }

  function createUserRow(userData) {
    var newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.name + "</td>");
    if (userData.Posts) {
      newTr.append("<td> " + userData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append(
      "<td><a href='/home?user_id=" + userData.id + "'>Go to Posts</a></td>"
    );
    newTr.append(
      "<td><a href='/makepost?user_id=" +
        userData.id +
        "'>Create a Post</a></td>"
    );
    return newTr;
  }

  function getUsers() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderUserList(rowsToAdd);
      nameInput.val("");
    });
  }

  function renderUserList(rows) {
    userList
      .children()
      .not(":last")
      .remove();
    userContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      userList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must sign in before you can create a Post.");
    userContainer.append(alertDiv);
  }
});
