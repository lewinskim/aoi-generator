    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

    var geo = [
    [51.7580427, 19.4484622],
    [51.7593908, 19.4585151]
    ];
    var first_point = [51.7580427,19.4484622];
    var last_point = [51.7593908,19.4585151];

    var myIcon = L.icon({
            iconUrl: 'images/endicon.png',
            iconSize: [33, 45],
            iconAnchor: [18, 44],
        });

    var blackIcon = L.icon({
            iconUrl: 'images/black.png',
            iconSize: [40, 45],
            iconAnchor: [18, 44],
        });

    var map = L.map('map').addLayer(osm);
    var polyline = L.polyline(geo, {color: 'red'}).addTo(map);
    L.marker(first_point, {color: 'blue'}).addTo(map).bindPopup("Start");
    L.marker(last_point, {icon: myIcon}).addTo(map);
    map.fitBounds(polyline.getBounds());
    var cent = map.getCenter();
    var centr = L.marker(cent, {icon: myIcon}).addTo(map);

    map.on('dragend', function onDragEnd(){
    var width = map.getBounds().getEast() - map.getBounds().getWest();
    var height = map.getBounds().getNorth() - map.getBounds().getSouth();
    var east = map.getBounds().getEast();
    var west = map.getBounds().getWest();
    var north = map.getBounds().getNorth();
    var south = map.getBounds().getSouth();


    alert (
        'center:' + map.getCenter() +'\n'+
        'width:' + width +'\n'+
        'height:' + height +'\n'+
        'size in pixels:' + map.getSize()+
        '\neast: ' + east+
        '\nwest: ' + west+
        '\nnorth: ' + north+
        '\nsouth: ' + south+ '\n\n'+
        httpGet('https://api.openstreetmap.org/api/0.6/map?bbox='+west+','+south+','+east+','+north)
    )});

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    center();
    return xmlHttp.responseText;
}

function center(){
cent = map.getCenter();
centr.setLatLng(cent);
document.getElementById("centerpoint").innerHTML = cent;
}

var temppoint = L.marker(cent, {icon: blackIcon}).addTo(map);

map.on('click', function(e){
temppoint.setLatLng(e.latlng);
document.getElementById("mouse").innerHTML = e.latlng;
});



