
d3.json('Resources/data.json').then((webData) => {

    console.log(webData);
    console.log(webData.data['2023-07-20']);
    console.log(webData.data)

    
});



// bar chart - popular airline routes
// line graph - tickets each day of the month, drop down menu for airlines
// bubble chart on map?- destinations, bigger the bubble show popularity
