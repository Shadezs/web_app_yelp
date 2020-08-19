mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZGVzeiIsImEiOiJja2NiNXd0bHEwMTNyMnJtenRybnoxZjRyIn0.4lceMjYIVlaaIT9E8FoSyw' //// use API KEY HERE
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/shadesz/ckdxii11i16sy19phd8a7sdp6',
    center: [-120.111, 35.144],
    zoom: 9

});
let geolocationjson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: []
            },
            properties: {
                title: 'Mapbox',
                discription: 'User A'
            }
        }]
    }
    //console.log(bussniseobj[1].name)
map.on('load', function() {
    map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        // Add an image to use as a custom marker
        function(error, image) {
            if (error) throw error;
            map.addImage('custom-marker', image);

            map.addSource('places', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [{
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[0].name}</strong><p>
                            
                            
                            address : ${arrayBussines[0].display_address}
                            
                            </p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[0].longitude, arrayBussines[0].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[1].name}</strong><p>address : ${arrayBussines[1].display_address}.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[1].longitude, arrayBussines[1].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[2].name}</strong><p>address : ${arrayBussines[2].display_address}</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[2].longitude, arrayBussines[2].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[3].name}</strong><p>address : ${arrayBussines[3].display_address}</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[3].longitude, arrayBussines[3].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[4].name}</strong><p>
                            
                            address : ${arrayBussines[4].display_address}.</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[4].longitude, arrayBussines[4].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[5].name}</strong><p>address : ${arrayBussines[5].display_address}</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[5].longitude, arrayBussines[5].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[6].name}</strong><p>address : ${arrayBussines[6].display_address}</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[6].longitude, arrayBussines[6].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[7].name}</strong><p>address : ${arrayBussines[7].display_address}</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[7].longitude, arrayBussines[7].latitude]
                        }
                    }, {
                        'type': 'Feature',
                        'properties': {
                            'description': `<strong>${arrayBussines[8].name}</strong><p>address : ${arrayBussines[8].display_address}</p>`
                        },
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [arrayBussines[8].longitude, arrayBussines[8].latitude]
                        }
                    }]
                }
            });

            // Add a layer showing the places.
            map.addLayer({
                'id': 'places',
                'type': 'symbol',
                'source': 'places',
                'layout': {
                    'icon-image': 'custom-marker',
                    'icon-allow-overlap': true
                }
            });
        }
    );
    var marker = new mapboxgl.Marker({
            draggable: true
        })
        .setLngLat([0, 0])
        .addTo(map);
    let userLocation = new mapboxgl.Marker({ draggable: false }).setLngLat([-120.111, 35.144]).addTo(map);

    function onDragEnd() {
        var lngLat = marker.getLngLat();
        coordinates.style.display = 'block';
        coordinates.innerHTML =
            'Longitude: ' + lngLat.lng + '<br />Latitude: ' + lngLat.lat;
    }

    marker.on('dragend', onDragEnd);
    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        })
    );
    map.addControl(new mapboxgl.NavigationControl());
    map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    map.on('mouseleave', 'places', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
    map.flyTo({
        center: [arrayBussines[0].longitude, arrayBussines[0].latitude],
        essential: true
    });
});