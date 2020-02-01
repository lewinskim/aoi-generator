    var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

    var geo = [
    [51.7580427, 19.4484622],
    [51.7593908, 19.4585151]
    ];
    var first_point = [51.7580427,19.4484622];
    var last_point = [51.7593908,19.4585151];

    var map = L.map('map').addLayer(osm);
    var polyline = L.polyline(geo, {color: 'red'}).addTo(map);
    L.marker(first_point, {color: 'blue'}).addTo(map);
    L.marker(last_point, {color: 'red'}).addTo(map);
    map.fitBounds(polyline.getBounds());



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
document.getElementById("centerpoint").innerHTML = map.getCenter();
}