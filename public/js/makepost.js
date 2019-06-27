$(document).ready(function() {
  var titleInput = $("#title");
  var partyInput = $("#party");
  var eventInput = $("#event");
  var addressInput = $("#address");
  var zipInput = $("#zip");
  var descriptionInput = $("#description");
  var postForm = $("#main-form");

  $(postForm).on("submit", handleFormSubmit);
  var url = window.location.search;
  var postId;
  var updating = false;

  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  } else if (url.indexOf("?title_id=") !== -1) {
    titleId = url.split("=")[1];
  }

  getTitles();

  function handleFormSubmit(event) {
    event.preventDefault();
    if (
      !titleInput.val().trim() ||
      !partyInput.val().trim() ||
      !eventInput.val().trim() ||
      !addressInput.val().trim() ||
      !zipInput.val().trim() ||
      !descriptionInput.val().trim()
    ) {
      return;
    }

    var newPost = {
      title: titleInput.val().trim(),
      party: partyInput.val().trim(),
      event: eventInput.val().trim(),
      address: addressInput.val().trim(),
      zip: zipInput.val().trim(),
      description: descriptionInput.val().trim()
    };
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  }

  function submitPost(post) {
    $.post("/api/posts", post, function() {
      window.location.href = "/index";
    });
  }

  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.TitleId || data.id);
        titleInput.val(data.title);
        partyInput.val(data.party);
        eventInput.val(data.event);
        addressInput.val(data.address);
        zipInput.val(data.zip);
        descriptionInput.val(data.description);
        updating = true;
      }
    });
  }
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    }).then(function() {
      window.location.href = "/index";
    });
  }
});
