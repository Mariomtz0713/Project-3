// Creating Map
let myMap = L.map('map', {
    center: [38.7339, -27.0647],
    zoom: 2
});

// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// fetching data from python flask
fetch('http://127.0.0.1:5000/dataset')
    .then((response) => response.json()) // Have to get past CORS to get response as json data
    .then((data) => {

    console.log(data);

    query = data[0].metadata
   
    for (let i = 0; i < query.length; i++) {
    
        let latitude = query[i].coordinates[0];
        let longtitude = query[i].coordinates[1];

        // Displaying marker
        let marker = L.marker([latitude, longtitude]).addTo(myMap);

        // Displaying marker information
        marker.bindPopup(
        `City: ${query[i].city} <br> 
        Airline: ${query[i].airline_name} <br>
        Price (USD): $${query[i].price} <br>
        Number of layovers: ${query[i].transfers}`
        ).addTo(myMap);

        
    }
      
    
    
});




// bar chart - popular airline routes where x axis is name of airlines, y axis is how times that airline shows up
// line graph - tickets each day of the month, drop down menu for airlines
// bubble chart on map?- destinations, bigger the bubble show popularity
    // Create df only using city counter?
    // Somehow seperate markers or use coordinates only df?
    // Inlcude numer of flights? Avg price?
