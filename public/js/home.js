$(document).ready(function() {
  // Home container will contain all of our user posts
  var homeContainer = $(".home-container");
  var posts;

  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
  } else {
    getPosts();
  }
  // here we get all of our posts
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/posts" + userId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }
  // We create the rows for how many posts that are in the database
  function initializeRows() {
    homeContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    homeContainer.append(postsToAdd);
  }
  // this creates then new rows and posts for all of the user posts
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var newPostTitle = $("<h2>");
    var newPostAddress = $("<h5>");
    var newPostZip = $("<h5>");
    var newPostParty = $("<h5>");
    var newPostDate = $("<small>");
    var newPostUser = $("<h5>");
    newPostUser.text("Post Made By: " + post.User.name);
    newPostUser.css({
      float: "right",
      color: "blue",
      "margin-top": "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    newPostAddress.text(post.address);
    newPostZip.text("Zip Code: " + post.zip);
    newPostParty.text("Party Size: " + post.party);
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostUser);
    newPostCardHeading.append(newPostAddress);
    newPostCardHeading.append(newPostZip);
    newPostCardHeading.append(newPostParty);
    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }
  // this is going to display a message of there is nothing to display
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    homeContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No posts yet" +
        partial +
        ", get the party started <a href='/makepost" +
        query +
        "'>here</a> to get the show on the road!"
    );
    homeContainer.append(messageH2);
  }
});
