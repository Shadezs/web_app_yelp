require('dotenv').config();
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZGVzeiIsImEiOiJja2NiNXd0bHEwMTNyMnJtenRybnoxZjRyIn0.4lceMjYIVlaaIT9E8FoSyw'
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11'
});