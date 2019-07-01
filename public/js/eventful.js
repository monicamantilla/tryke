 const axios = require('axios');

      // Make a request for a user with a given ID
      axios.get("http://eventful.com/events?q=music&l=Orlando&app_key=jMgXTBXqCM9tPCNb")
        .then(function (response) {
      
          let results = JSON.parse(response);
         console.log(results)
           
        });

// $.getJSON("http://api.eventful.com/json/events/search?q=jonas+brothers&app_key=jMgXTBXqCM9tPCNb", function(data){
// console.log(data);
// })
//         //http://api.eventful.com/json/events/search?l=Orlando&app_key=jMgXTBXqCM9tPCNb