
d3.json('Resources/data.json').then((webData) => {

    console.log(webData); // Whole set
    console.log(webData.data); // Only data dictionary 
    console.log(webData.data['2023-07-20']); // First day in dataset


    
});




// bar chart - popular airline routes
// line graph - tickets each day of the month, drop down menu for airlines
// bubble chart on map?- destinations, bigger the bubble show popularity
