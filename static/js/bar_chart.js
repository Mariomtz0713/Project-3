// Initial page load
 function init() {
    fetch('http://127.0.0.1:5000/dataset')
    .then((response) => response.json()) // Have to get past CORS to get response as json data
    .then((data) => {
    
    //Drop down menu
    let city = data[0].cities;
    city.forEach((name) => {d3.select('#selDataset').append('option').text(name)});
 
    // create initial charts
     charts(city[0])

    })

};

//Charts
function charts(searchCity) {
    fetch('http://127.0.0.1:5000/dataset')
    .then((response) => response.json()) // Have to get past CORS to get response as json data
    .then((data) => {

    let searchData = data[0].metadata.filter(place => place.city == searchCity);


    // Creating list of only airline names of selected city
    let airlineList = [];
    for (let i = 0; i < searchData.length; i++) {
        airlineList.push(searchData[i].airline_name)
    };
    // Counting how many times each airline is in list
    let airlineCounter = {};
    airlineList.forEach(airline => {
        if (airlineCounter[airline]) {
            airlineCounter[airline] += 1
        }
        else {
            airlineCounter[airline] = 1
        }
    });
    // Data Values for bar chart
    let airlineName = Object.keys(airlineCounter);
    let airlineAmount = Object.values(airlineCounter);

    let filghtSum = 0;
    for (let i = 0; i < airlineAmount.length; i++) {
        filghtSum += airlineAmount[i]
    }

    let averagePrice = 0;
    for (let i = 0; i < searchData.length; i++) {
        averagePrice += searchData[i].price
    }
    averagePrice /= searchData.length;
    averagePrice = averagePrice.toFixed(2);

    let averageTransfer = 0;
    for (let i = 0; i < searchData.length; i++) {
        averageTransfer += searchData[i].transfers
    };
    averageTransfer /= searchData.length
    averageTransfer = averageTransfer.toFixed(2)

    let cleanBoxData = {
        'City': searchData[0].city,
        'Coordinates': searchData[0].coordinates,
        'Average price': `$${averagePrice}`,
        'Currency':  searchData[0].currency,
        'Airlines available': airlineName,
        'Total flights available': filghtSum,
        'Average number of layovers': averageTransfer
    };
    
    // Destination info box
    let boxInfo = d3.select('#sample-metadata').html("");
    for (key in cleanBoxData) {
        boxInfo.append('h5').text(`${key}: ${cleanBoxData[key]}`)
    };


    // Creating list of all destinations
    allDestinations = [];
    for (let i = 0; i < data[0].metadata.length; i++) {
        allDestinations.push(data[0].metadata[i].destination);
    };
    // Counting each destination
    let destinationCounter = {};
    allDestinations.forEach(destination => {
        if (destinationCounter[destination]) {
            destinationCounter[destination] += 1
        }
        else {
            destinationCounter[destination] = 1
        }
    });
    // Data values for bubble chart
    let destinationNames = Object.keys(destinationCounter);
    let destinationValues = Object.values(destinationCounter);
    
    let numbers = [];
    for (let i = 0; i < 63; i++) {
        numbers.push(i)
    };


    // Creating Bar Chart
    let barChart = [{
        x: airlineName,
        y: airlineAmount,
        text: Object.keys(airlineCounter),
        type: 'bar',
        orientation: 'v'
    }];
    let bar_layout = {
        height: 800,
        width: 860,
        title: 'Flight Availability by Location',
        xaxis: {title: 'Airline'},
        yaxis: {title: 'Number of flights'},
    };
    Plotly.newPlot('bar', barChart, bar_layout);

     // Creating Bubble Chart
     let bubbleChart = [{
        x: destinationNames,
        y: destinationValues,
        text: data[0].cities,
        mode: 'markers',
        marker: {
            size: destinationValues,
            color: numbers,
            colorscale: 'Bluered'
        }
    }];
    let bubbleLayout = {
        height: 600,
        width: 950,
        xaxis: {
            title: 'Destinations'
        }
    };
    Plotly.newPlot('bubble', bubbleChart, bubbleLayout);

    // End of block
    })

};


// Updating plot
function optionChanged(city) {
    charts(city);
};


init();