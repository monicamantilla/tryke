const axios = require('axios');


module.exports = {

  searchEvent: function () {
    return new Promise((req, res) => {

      let query = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?location=Orlando&app_key=jMgXTBXqCM9tPCNb"
      console.log("hello");

      axios.get(query).then(function (response) {

        var response = response.data.events.event
        var allEvents = [];
        console.log(response)

        for (var i = 0; i < 10; i++) {
          let events = {
            title: response[i].title,
            description: response[i].description,
            image: response.image
          }
          allEvents.push(events)
        }
        req(allEvents);
      })

    })
  }
};




