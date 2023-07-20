url = 'https://api.travelpayouts.com/v1/prices/calendar?currency=usd&depart_date=2016-11&origin=MOW&destination=BCN&calendar_type=departure_date&token=' + API_KEY

d3.json('calendar.json').then((webData) => {

    console.log(webData);
    console.log(webData.data);
    


    
});



// bar chart - popular airline routes
// line graph - tickets each day of the month, drop down menu for airlines
// bubble chart on map?- destinations, bigger the bubble show popularity
