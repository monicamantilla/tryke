<script src="https://code.jquery.com/jquery-2.1.4.min.js"> </script>

//URL to test
var queryURL = "https://www.eventbriteapi.com/v3/events/search?location.address=vancovuer&location.within=10km&expand=venue"

axios
.get({
    queryURL,
    headers: {
        "Authorization": "Bearer HTMTIRATD5XNZKK4YQBZAGCMBL45S4SHMP5GBZSRFAQKWDSOYW"
    }
}).then(function(response){
    console.log(response.data);
    return response.data;
}).catch(function(err){
    console.log(er.message, "You have an error")
})

app.get("/index", function(req, res){
res.send("Hello")
})


// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });


// $(document).ready(function () {

//     var token = 'HTMTIRATD5XNZKK4YQBZAGCMBL45S4SHMP5GBZSRFAQKWDSOYW';
//     var events = $("#events");

//     $.get('https://www.eventbriteapi.com/v3/events/search/' + token + function (res) {
//         if (res.events.length) {

//             console.log(res);
//             var s = "<ul class='eventList'>";
//             for (var i = 0; i < res.events.length; i++) {
//                 var event = res.events[i];
//                 console.dir(event);
//                 s += "<li><a href='" + event.url + "'>" + event.name.text + "</a> - " + event.description.text + "</li>";
//             }
//             s += "</ul>";
//             $events.html(s);
//         } else {
//             $events.html("<p>Sorry, there are no upcoming events.</p>");
//         }
//     });

   


// });


  //Use GET to pull data