var slider = document.getElementById("myRange");
var output = document.getElementById("demo23");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
    console.log("Cokolwiek");
}

function getData() {
    var produkty = document.getElementById("produkty");
    produkty.innerHTML = "";

    wertical = 0;
    horizontal = 0;
    title = " 1";
    text = "111111";


    for (var i = 0; i < 20; i++) {
        var table_product = document.createElement("div"); table_product.className = "col-lg-4 col-md-6 mb-4";
        var card = document.createElement("div"); card.className = "card h-100";
        var card_body = document.createElement("div"); card_body.className = "card_body";
        var card_title = document.createElement("h4"); card_title.className = "card_title";
        var card_text = document.createElement("p"); card_text.className = "card_text";
        var card_footer = document.createElement("div"); card_footer.className = "card_footer";

        table_product.append(card);
        card.innerHTML = "<img class='card-img-top' src='http://placehold.it/700x400' alt>";
        card.append(card_body, card_footer);
        card_body.append(card_title, card_text);
        card_title.innerHTML = title;
        card_text.innerHTML = text;
        produkty.append(table_product);

    }
}

var userLat;
var userLng;
var myLatLng;
var map;
var my_lat;
var my_lng;

var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
    'sandstone rock formation in the southern part of the ' +
    'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
    'south west of the nearest large town, Alice Springs; 450&#160;km ' +
    '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
    'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
    'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
    'Aboriginal people of the area. It has many springs, waterholes, ' +
    'rock caves and ancient paintings. Uluru is listed as a World ' +
    'Heritage Site.</p>' +
    '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
    'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
    '(last visited June 22, 2009).</p>' +
    '</div>' +
    '</div>';

       var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
// Try HTML5 geolocation.
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {    // pytanie do wywalenia 

        my_lat = position.coords.latitude;
        my_lng = position.coords.longitude;


        // infoWindow.setPosition(pos);
        infowindow.setContent('Location found.');
        infowindow.open(map);
        //map.setCenter(pos);
    }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
    });
} else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
}



function initMap() {
    userLat = document.getElementById("y").value;
    userLat = parseFloat(userLat % 85.05);
    userLng = document.getElementById("x").value;
    userLng = parseFloat(userLng % 180);

    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;

    myLatLng = { userLat, userLng };

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: userLat, lng: userLng }
    });
    directionsDisplay.setMap(map);



    calculateAndDisplayRoute(directionsService, directionsDisplay);
    document.getElementById('mode').addEventListener('change', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var selectedMode = document.getElementById('mode').value;
    directionsService.route({



        origin: { lat: my_lat, lng: my_lng },
        // origin: { lat: pos.lat, lng: pos.lng },
        destination: { lat: userLat, lng: userLng },

        // --> { Lat celu z bazy danych, lng celu z bazy dancyh},
        travelMode: google.maps.TravelMode[selectedMode]
    }, function (response, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            //window.alert('Directions request failed due to ' + status);
        }
    });

    //var marker = new google.maps.Marker({                               //Pinezka lokalizacji kt�ra jest juz oznaczona jako "B" przez funckcje trasy
    //position: {lat: userLat, lng: userLng},
    //map: map
    //});

}