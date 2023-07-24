// Creating Map
let myMap = L.map('map', {
    center: [38.7339, -27.0647],
    zoom: 2.5
});

// Adding tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Executing json data
d3.json('Resources/DataFiles/final_data.json').then((data) => {

    console.log(data); 
   
    for (let i = 0; i < Object.keys(data.coordinates).length; i++) {
                        // Since coordinates section is an object 
                        // not an array, must use this method for .length

        let latitude = data.coordinates[i][0];
        let longtitude = data.coordinates[i][1];

        // Displaying marker
        let marker = L.marker([latitude, longtitude]).addTo(myMap);

        // Displaying marker information
        marker.bindPopup(
        `City: ${data.city[i]} <br>
        Airline: ${data.airline_name[i]} <br>
        Price (USD): $${data.price[i]} <br>
        Number of layovers: ${data.transfers[i]}`
        ).addTo(myMap);

        
    }
      
    
    
});




// bar chart - popular airline routes
// line graph - tickets each day of the month, drop down menu for airlines
// bubble chart on map?- destinations, bigger the bubble show popularity
    // Create df only using city counter?
    // Somehow seperate markers or use coordinates only df?
    // Inlcude numer of flights? Avg price?
