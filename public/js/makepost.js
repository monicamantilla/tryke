/* eslint-disable indent */
$(document).ready(function() {
  // we grab the input from the webpage
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var addressInput = $("#address");
  var zipInput = $("#zip");
  var partyInput = $("#party");
  var makepostForm = $("#makepost");
  var userSelect = $("#confirm");
  $(makepostForm).on("submit", handleFormSubmit);

  var url = window.location.search;
  var postId;
  var userId;

  var updating = false;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  } else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }
  // running the function get the users
  getUsers();
  // on submit we are sending the data off
  function handleFormSubmit(event) {
    event.preventDefault();

    if (
      !titleInput.val().trim() ||
      !bodyInput.val().trim() ||
      !userSelect.val()
    ) {
      return;
    }
    // this is the object of our new posts
    var newPost = {
      title: titleInput.val().trim(),
      address: addressInput.val().trim(),
      zip: zipInput.val().trim(),
      party: partyInput.val().trim(),
      body: bodyInput.val().trim(),
      confirm: userSelect.val()
    };

    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  }
  // when we submit, check if the password matches one within the database
  function submitPost(post) {
    $.post("/api/posts", post, function(data) {
      console.log(data);
      if (data === "password") {
        alert("incorrect password");
      } else {
        window.location.href = "/home";
      }
    });
  }
  // this grabs the data from our api
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        titleInput.val(data.title);
        addressInput.val(data.address);
        zipInput.val(data.zip);
        partyInput.val(data.party);
        bodyInput.val(data.body);
        userId = data.UserId || data.id;
        updating = true;
      }
    });
  }
  // getting the users from the sign up
  function getUsers() {
    $.get("/api/users", function(data) {
      renderUserList(data);
    });
  }
  // storing the users, in a page we used before hand to see what users existed in the database, a good thing to have
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.name);
    return listOption;
  }

  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    }).then(function() {
      window.location.href = "/home";
    });
  }
});
